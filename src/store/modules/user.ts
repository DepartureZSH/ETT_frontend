import { defineStore } from 'pinia';

import { login, logout as logoutApi, register } from '@/api/user';
import { usePermissionStore } from '@/store';
import type { UserInfo } from '@/types/interface';

const InitUserInfo: UserInfo = {
  name: '', // 用户名，用于展示在页面右上角头像处
  roles: [], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '', // 默认token不走权限
    userInfo: { ...InitUserInfo },
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      try {
        const res = await login({
          username: userInfo.account as string,
          password: userInfo.password as string,
        });
        this.token = res.token;
        this.userInfo.name = res.username;
        const permissionStore = usePermissionStore();
        await permissionStore.initRoutes();
        return res;
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    },
    async register(userInfo: Record<string, unknown>) {
      try {
        const res = await register({
          username: userInfo.account as string,
          password: userInfo.password as string,
        });
        this.token = res.token;
        this.userInfo.name = res.username;
        return res;
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    },
    async getUserInfo() {
      if (this.token) {
        this.userInfo.roles = ['all'];
      }
    },
    async logout() {
      try {
        if (this.token) {
          await logoutApi();
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        this.token = '';
        this.userInfo = { ...InitUserInfo };
        localStorage.removeItem('user');
      }
    },
    setToken(token: string) {
      this.token = token;
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
    },
    key: 'user',
    paths: ['token', 'userInfo'],
  },
});
