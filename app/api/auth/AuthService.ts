import api from "../index";
import { AxiosResponse } from "axios";
import { AuthResponse } from "@/app/api/[models]/AuthResponse";

export default class AuthService {
  static async login(
    nickname: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/login", { nickname, password });
  }

  static async registration(
    nickname: string,
    password: string,
    email: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/registration", {
      nickname,
      password,
      email,
    });
  }

  static async refresh() {
    return api.get<AuthResponse>(
        '/refresh',
        {
          withCredentials: true,
        }
    )
  }

  static async logout(): Promise<void> {
    return api.post("/logout");
  }

  static async sendChangePasswordEmail(email: string): Promise<AxiosResponse> {
    return api.post("/change/sendEmail", { email });
  }

  static async changePasswordWithHash(
    email: string,
    hashedString: string,
    newPassword: string,
  ): Promise<AxiosResponse> {
    return api.patch("/change/passwordHash", {
      email,
      hashedString,
      newPassword,
    });
  }

  static async changePassword(
    nickname: string,
    previousPassword: string,
    newPassword: string,
  ): Promise<AxiosResponse> {
    return api.patch("/change/password", {
      nickname,
      previousPassword,
      newPassword,
    });
  }
}
