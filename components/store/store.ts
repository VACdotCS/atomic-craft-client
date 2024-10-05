import { IUser } from "@/app/api/[models]/User"
import { makeAutoObservable } from "mobx"
import AuthService from "@/app/api/auth/AuthService"
import MonitoringService from "@/app/api/monitoring/MonitoringService"
import axios from "axios"
import { AuthResponse } from "@/app/api/[models]/AuthResponse"
import FileService from "@/app/api/file_cntrl/FileService"
import UMoneyAuthService from "@/app/api/deposits/UMoney"

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false
  backendError = false
  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setBackendError(bool: boolean) {
    this.backendError = bool
  }

  async login(nickname: string, password: string) {
    try {
      const response = await AuthService.login(nickname, password)
      //console.log(response)
      localStorage.setItem("token", response.data.accessToken)
      this.setUser(response.data.user)
    } catch (error) {
      return error.response
    }
  }

  async registration(nickname: string, password: string, email: string) {
    try {
      const response = await AuthService.registration(nickname, password, email)
      //console.log(response)
      localStorage.setItem("token", response.data.accessToken)
      this.setUser(response.data.user)
    } catch (error) {
      return error.response
    }
  }

  async logout() {
    try {
      AuthService.logout().then((res) => {
        localStorage.removeItem("token")
        setTimeout(() => {
          this.setUser({} as IUser)
          this.setAuth(false)
        }, 1500)
      })
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(
        `${process.env.API_URL}/refresh`,
        { withCredentials: true },
      )
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error) {
      this.setBackendError(true)
      console.log(error.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }

  async getServerInfo() {
    try {
      const response = await MonitoringService.getInfo()
      return response.data
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  async uploadSkin(image: FormData) {
    try {
      return await FileService.UploadSkin(image)
    } catch (error) {
      return error.response?.data?.message
    }
  }

  async uploadCape(image: FormData) {
    try {
      await FileService.UploadCape(image)
      return "OK"
    } catch (error) {
      return error.response?.data?.message
    }
  }

  async changePasswordAuthed(
    nickname: string,
    previousPassword: string,
    newPassword: string,
  ) {
    try {
      const response = await AuthService.changePassword(
        nickname,
        previousPassword,
        newPassword,
      )
      return response.data
    } catch (error) {
      return error.response?.data?.message
    }
  }

  async sendChangePasswordEmail(email: string) {
    try {
      const response = await AuthService.sendChangePasswordEmail(email)
      return response.data
    } catch (error) {
      return error.response?.data?.message
    }
  }

  async changeEmailWithHash(
    email: string,
    hashedString: string,
    newPassword: string,
  ) {
    try {
      const response = await AuthService.changePasswordWithHash(
        email,
        hashedString,
        newPassword,
      )
      return response.data
    } catch (error) {
      return error.response?.data?.message
    }
  }

  async umoney_request_payment(sum: number) {
    try {
      const response = await UMoneyAuthService.request_payment(
        this.user,
        sum,
        this.user.email,
      )
      return response.data
    } catch (error) {
      return error.response?.data?.message
    }
  }
}
