import type { LoginParams, LoginResult } from '@/api/model/userModel';
import { request } from '@/utils/request';

const Api = {
  Login: '/user/login',
  Register: '/user/register',
  Logout: '/user/logout',
};

export function login(data: LoginParams) {
  return request.post<LoginResult | any>({
    url: Api.Login,
    data,
  });
}

export function register(data: LoginParams) {
  return request.post<LoginResult | any>({
    url: Api.Register,
    data,
  });
}

export function logout() {
  return request.post({
    url: Api.Logout,
  });
}
