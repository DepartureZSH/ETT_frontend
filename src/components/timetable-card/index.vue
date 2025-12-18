<template>
  <div>
    <t-card theme="poster2" :bordered="false">
      <template #status> </template>
      <template #content>
        <p class="list-card-item_detail--name">{{ props.product.name }}</p>
        <p class="list-card-item_detail--desc">{{ props.product.description }}</p>
      </template>
      <template #footer>
        <div>使用量：{{ product.usage }}</div>
      </template>
      <template #actions>
        <t-dropdown trigger="click" :options="ProductOptions">
          <t-button theme="default" shape="square" variant="text">
            <more-icon />
          </t-button>
        </t-dropdown>
      </template>
    </t-card>
  </div>
</template>
<script setup lang="ts">
import { MoreIcon } from 'tdesign-icons-vue-next';
import type { PropType } from 'vue';

import { t } from '@/locales';

export interface CardProductType {
  type: number;
  isSetup: boolean;
  description: string;
  name: string;
  usage: number;
  isStar: boolean;
  relation: number;
}

const props = defineProps({
  product: {
    type: Object as PropType<CardProductType>,
    default: undefined,
  },
});

const emit = defineEmits(['manage-detail']);

const ProductOptions = [
  // {
  //   content: t('components.commonTable.detail'),
  //   value: 'detail',
  //   onClick: () => handleClickDetail(props.product),
  // },
];

const handleClickDetail = (product: CardProductType) => {
  emit('manage-detail', product);
};
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
