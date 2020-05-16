import axios from 'axios';
import {ProfileType} from "../types/types";


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a430a652-2beb-497a-a9a6-7cb99aa0f142'}
  });

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
          return response.data});
    },
    follow(userId: number) {
      return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
      return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
      console.warn('Obsolete method. Please use profileAPI oject.')
      return profileAPI.getProfile(userId);
    }
  }

  export const profileAPI = {
    getProfile(userId: number) {
      return instance.get(`profile/` + userId);
    },
    getStatus(userId: number) {
      return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
      return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile: any) {
      const formData = new FormData();
      formData.append('image', photoFile);
      return instance.put(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    saveProfile(profile: ProfileType) {
      return instance.put(`profile`, profile);
    }
  }

  export enum ResultCodesEnum {
    Success = 0,
    Error = 1
  }

  export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
  }

  type MeResponseType = {
    data: {
      id: number
      email: string
      login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
  }

  type LoginResponseType = {
    data: {
      userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
  }

  type LogoutResponseType = {
    data: { }
    resultCode: ResultCodesEnum
    messages: Array<string>
  }

  /*type SecurityApiType = {
    url: string
  }*/

  export const authAPI = {
    me() {
      return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
      return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
          .then(res => res.data);
    },

    logout() {
      return instance.delete<LogoutResponseType>(`auth/login`).then(res => res.data);
    }
  }

  export const securityAPI = {
    getCaptchaUrl() {
      return instance.get(`security/get-captcha-url`).then(res => res.data);
    }
  }
