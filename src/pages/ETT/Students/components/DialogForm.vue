<template>
  <t-dialog v-model:visible="formVisible" :header="t('student.create')" :width="680" :footer="false">
    <template #body>
      <!-- 表单内容 -->
      <t-form :data="formData" :rules="rules" :label-width="100" @submit="onSubmit">
        <t-form-item :label="t('student.name')" name="name">
          <t-input v-model="formData.name" :style="{ width: '480px' }" />
        </t-form-item>
        <t-form-item :label="t('student.note')" name="note">
          <t-input v-model="formData.note" :style="{ width: '480px' }" />
        </t-form-item>
        <t-form-item :label="t('student.description')" name="description">
          <t-textarea v-model="formData.description" :style="{ width: '480px' }" />
        </t-form-item>
        <t-form-item style="float: right">
          <t-button variant="outline" @click="onClickCloseBtn">取消</t-button>
          <t-button theme="primary" type="submit">确定</t-button>
        </t-form-item>
      </t-form>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import type { FormRules, SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import type { PropType } from 'vue';
import { ref, watch } from 'vue';

import type { Student } from '@/api/model/schoolModel';
import { t } from '@/locales';

const { visible, data } = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as PropType<Student>,
    default: undefined,
  },
});

const emit = defineEmits(['update:visible', 'submit']);

const INITIAL_DATA: Student = {
  index: 0,
  name: '',
  title: '',
};

const formVisible = ref(false);
const formData = ref<Student>({ ...INITIAL_DATA });

const onSubmit = ({ validateResult, firstError }: SubmitContext) => {
  if (!firstError) {
    MessagePlugin.success('提交成功');
    formVisible.value = false;
    emit('submit', formData.value);
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
  }
};

const onClickCloseBtn = () => {
  formVisible.value = false;
  formData.value = { ...INITIAL_DATA };
};

watch(
  () => formVisible.value,
  (val) => {
    emit('update:visible', val);
  },
);

watch(
  () => visible,
  (val) => {
    formVisible.value = val;
  },
);

watch(
  () => data,
  (val) => {
    formData.value = val;
  },
);

const rules: FormRules<Student> = {
  name: [{ required: true, message: '请输入产品名称', type: 'error' }],
};
</script>
