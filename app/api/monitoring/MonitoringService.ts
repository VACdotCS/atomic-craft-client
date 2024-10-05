import api from "../index"
import { AxiosResponse } from "axios"

export default class MonitoringService {
  static async getInfo(): Promise<AxiosResponse> {
    return api.get("/monitoring", {})
  }
}
