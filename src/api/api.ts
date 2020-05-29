import axios from 'axios';
import {UserType} from "../types/types";


export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a430a652-2beb-497a-a9a6-7cb99aa0f142'}
  });

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
  }

  export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
  }

  export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
  }

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}