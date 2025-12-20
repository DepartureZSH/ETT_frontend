<template>
  <t-card theme="poster2" :bordered="false">
    <template #avatar>
      <t-avatar size="56px">
        <template #icon>
          <user1-icon />
        </template>
      </t-avatar>
    </template>
    <template #status>
      <t-tag>{{ props.product.title }}</t-tag>
    </template>
    <template #content>
      <p class="list-card-item_detail--name">{{ `${t('staff.name')}: ${props.product.name}` }}</p>
      <p class="list-card-item_detail--desc">
        {{ `${t('staff.description')}: ${props.product.description || '...'}` }}
      </p>
    </template>
    <template #footer> </template>
    <template #actions></template>
  </t-card>
</template>
<script setup lang="ts">
import { User1Icon } from 'tdesign-icons-vue-next';
import type { PropType } from 'vue';

import type { Staff } from '@/api/model/schoolModel';
import { t } from '@/locales';

const props = defineProps({
  product: {
    type: Object as PropType<Staff>,
    default: undefined,
  },
});
</script>
<style lang="less" scoped>
.list-card-item {
  border: 0.5px solid;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &_detail {
    min-height: 140px;

    &--name {
      margin-bottom: var(--td-comp-margin-s);
      font: var(--td-font-title-medium);
      color: var(--td-text-color-primary);
    }

    &--desc {
      color: var(--td-text-color-secondary);
      font: var(--td-font-body-small);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
