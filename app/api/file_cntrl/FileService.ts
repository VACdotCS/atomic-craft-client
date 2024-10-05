import api from "../index"
import { AxiosResponse } from "axios"

export default class FileService {
  static UploadSkin(image: FormData | null): Promise<AxiosResponse> {
    return api.post("/upload", image)
  }

  static UploadCape(image: FormData | null): Promise<AxiosResponse> {
    return api.post("upload/cape", image)
  }
}
