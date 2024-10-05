import api from "../index"
import { AxiosResponse } from "axios"
import { IUser } from "@/app/api/[models]/User"

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>("/users")
  }
}
