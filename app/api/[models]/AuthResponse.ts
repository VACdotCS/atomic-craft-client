import { IUser } from "@/app/api/[models]/User"

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}
