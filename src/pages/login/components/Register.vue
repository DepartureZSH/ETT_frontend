<template>
  <t-form class="item-container register-phone" :data="formData" :rules="FORM_RULES" label-width="0" @submit="onSubmit">
    <t-form-item name="phone">
      <t-input v-model="formData.account" :maxlength="11" size="large" placeholder="请输入您的手机号">
        <template #prefix-icon>
          <t-icon name="user" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请输入登录密码"
      >
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
        <template #suffix-icon>
          <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item class="check-container" name="checked">
      <t-checkbox v-model="formData.checked">我已阅读并同意 </t-checkbox> <span>SchedAI服务协议</span> 和
      <span>SchedAI 隐私声明</span>
    </t-form-item>

    <t-form-item>
      <t-button block size="large" type="submit" :loading="submitting"> 注册 </t-button>
    </t-form-item>
  </t-form>
</template>
<script setup lang="ts">
import type { FormRule, SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { useUserStore } from '@/store';

const emit = defineEmits(['register-success']);

const userStore = useUserStore();

const INITIAL_DATA = {
  account: '',
  password: '',
  checked: false,
};

const FORM_RULES: Record<string, FormRule[]> = {
  account: [{ required: true, message: '手机号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
};

const formData = ref({ ...INITIAL_DATA });
const showPsw = ref(false);
const submitting = ref(false);

const onSubmit = async (ctx: SubmitContext) => {
  if (!submitting.value) {
    submitting.value = true;
    if (ctx.validateResult === true) {
      if (!formData.value.checked) {
        await MessagePlugin.error('请同意TDesign服务协议和TDesign 隐私声明');
        submitting.value = false;
        return;
      }
      try {
        await userStore.register(formData.value);
        await MessagePlugin.success('登录成功');
        emit('register-success');
      } catch (e) {
        console.log(e.response.data.data);
        for (const key in e.response.data.data) {
          for (const element of e.response.data.data[key]) {
            if (element === 'A user with that username already exists.') {
              await MessagePlugin.error('该手机号已注册');
              // 回到登录界面
              emit('register-success');
              break;
            } else {
              await MessagePlugin.error(element);
            }
          }
        }
      }
    }
    submitting.value = false;
  }
};
</script>
<style lang="less" scoped>
@import '../index.less';
</style>
