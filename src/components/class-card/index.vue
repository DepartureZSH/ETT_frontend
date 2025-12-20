<template>
  <t-card theme="poster2" :bordered="false">
    <template #content>
      <p class="list-card-item_detail--name">{{ props.product.name }}</p>
      <p class="list-card-item_detail--desc">{{ props.product.description }}</p>
    </template>
    <template #footer>
      <t-tag>{{ props.product.note }}</t-tag>
    </template>
    <template #actions>
      <t-dropdown
        trigger="click"
        :options="[
          {
            content: t('components.manage'),
            value: 'manage',
            onClick: () => handleClickManage(props.product),
          },
          {
            content: t('components.delete'),
            value: 'delete',
            onClick: () => handleClickDelete(props.product),
          },
        ]"
      >
        <t-button theme="default" shape="square" variant="text">
          <more-icon />
        </t-button>
      </t-dropdown>
    </template>
  </t-card>
</template>
<script setup lang="ts">
import { MoreIcon } from 'tdesign-icons-vue-next';
import type { PropType } from 'vue';

import type { Lesson } from '@/api/model/schoolModel';
import { t } from '@/locales';

const props = defineProps({
  product: {
    type: Object as PropType<Lesson>,
    default: undefined,
  },
});

const emit = defineEmits(['manage-product', 'delete-item']);

const handleClickManage = (product: Lesson) => {
  emit('manage-product', product);
};

const handleClickDelete = (product: Lesson) => {
  emit('delete-item', product);
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
