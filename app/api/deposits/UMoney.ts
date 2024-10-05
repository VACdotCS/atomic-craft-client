import axios, { AxiosResponse } from "axios";
import api from "../index";
import { IUser } from "@/app/api/[models]/User";

interface UmoneyResponse {
  error: string;
  status_code: number;
}

export default class UMoneyAuthService {
  static async request_payment(
    user: IUser,
    sum: number,
    email_of_payer: string,
  ): Promise<AxiosResponse> {
    return api.post("/umoney/requestPayment", {
      user: user,
      sum: sum,
    });
  }
}
