<template>
  <div class="card-container">
    <div class="list-card-operation">
      <t-button @click="formDialogVisible = true"> {{ t('lesson.create') }} </t-button>
      <div class="search-input">
        <t-input v-model="searchValue" :placeholder="t('lesson.placeholder')" clearable>
          <template #suffix-icon>
            <search-icon v-if="searchValue === ''" size="var(--td-comp-size-xxxs)" />
          </template>
        </t-input>
      </div>
    </div>

    <dialog-form v-model:visible="formDialogVisible" :data="formData" @submit="onSubmit" />

    <template v-if="pagination.total > 0 && !dataLoading">
      <div class="list-card-items">
        <t-row :gutter="[16, 16]">
          <t-col
            v-for="product in productList.slice(
              pagination.pageSize * (pagination.current - 1),
              pagination.pageSize * pagination.current,
            )"
            :key="product.index"
            :lg="4"
            :xs="6"
            :xl="3"
          >
            <product-card
              class="list-card-item"
              :product="product"
              @delete-item="handleDeleteItem"
              @manage-product="handleManageProduct"
            />
          </t-col>
        </t-row>
      </div>
      <div class="list-card-pagination">
        <t-pagination
          v-model="pagination.current"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-size-options="[12, 24, 36]"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </template>

    <div v-else-if="dataLoading" class="list-card-loading">
      <t-loading size="large" text="加载数据中..." />
    </div>

    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除所选产品？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
  </div>
</template>
<script setup lang="ts">
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import type { Lesson } from '@/api/model/schoolModel';
import { getClasses } from '@/api/school';
import ProductCard from '@/components/class-card/index.vue';
import { t } from '@/locales';

import DialogForm from './components/DialogForm.vue';

defineOptions({
  name: 'ListClasses',
});

const INITIAL_DATA: Lesson = {
  index: 0,
  name: '',
  status: '',
  description: '',
  note: '',
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });
const deleteProduct = ref(undefined);

const productList = ref<Lesson[]>();
const dataLoading = ref(true);

const fetchData = async () => {
  try {
    productList.value = await getClasses();
    pagination.value = {
      ...pagination.value,
      total: productList.value.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const confirmBody = computed(() =>
  deleteProduct.value ? `确认删除后${deleteProduct.value.name}的所有产品信息将被清空, 且无法恢复` : '',
);

onMounted(() => {
  fetchData();
});

const formDialogVisible = ref(false);
const searchValue = ref('');
const confirmVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};
const handleDeleteItem = (product: Lesson) => {
  confirmVisible.value = true;
  deleteProduct.value = product;
};
const onConfirmDelete = () => {
  const { index } = deleteProduct.value;
  productList.value.splice(index - 1, 1);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
};
const onCancel = () => {
  deleteProduct.value = undefined;
  formData.value = { ...INITIAL_DATA };
};
const handleManageProduct = (product: Lesson) => {
  formDialogVisible.value = true;
  formData.value = {
    index: product.index,
    name: product.name,
    description: product.description,
    note: product.note,
  };
};
const onSubmit = (product: Lesson) => {
  console.log(product);
  for (const item of productList.value) {
    if (item.index === product.index) {
      item.name = product.name;
      item.description = product.description;
      item.note = product.note;
    }
  }
};
</script>
<style lang="less" scoped>
.card-container {
  padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingLR-xl);
  background: var(--td-bg-color-container);
}
.list-card {
  height: 100%;

  &-operation {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--td-comp-margin-xxl);

    .search-input {
      width: 360px;
    }
  }

  &-item {
    padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingTB-xl);

    :deep(.t-card__header) {
      padding: 0;
    }

    :deep(.t-card__body) {
      padding: 0;
      margin-top: var(--td-comp-margin-xxl);
      margin-bottom: var(--td-comp-margin-xxl);
    }

    :deep(.t-card__footer) {
      padding: 0;
    }
  }

  &-pagination {
    padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingTB-xl);
  }

  &-loading {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
