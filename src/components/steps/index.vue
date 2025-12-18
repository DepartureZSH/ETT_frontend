<template>
  <div>
    <t-steps :default-current="props.current" readonly>
      <t-step-item :title="`${t('steps.name')}1`" :content="`${t('steps.step1')}`" />
      <t-step-item :title="`${t('steps.name')}2`" :content="`${t('steps.step2')}`" />
      <t-step-item :title="`${t('steps.name')}3`" :content="`${t('steps.step3')}`" />
      <t-step-item :title="`${t('steps.name')}4`" :content="`${t('steps.step4')}`" />
      <t-step-item :title="`${t('steps.name')}5`" :content="`${t('steps.step5')}`" />
      <t-step-item :title="`${t('steps.name')}6`" :content="`${t('steps.step6')}`" />
      <t-step-item :title="`${t('steps.name')}7`" :content="`${t('steps.step7')}`" />
      <t-step-item :title="`${t('steps.name')}8`" :content="`${t('steps.step8')}`" />
    </t-steps>
  </div>
</template>
<script setup lang="ts">
import { t } from '@/locales';

const props = defineProps({
  current: {
    type: Number,
    required: true,
  },
});
</script>
<style scoped lang="less"></style>
