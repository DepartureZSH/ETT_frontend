<template>
  <t-collapse>
    <t-row :gutter="[24, 16]">
      <t-col
        v-for="(Column_Item, Column_Index) in tableColumns"
        :key="Column_Index"
        :xs="size[0]"
        :sm="size[1]"
        :md="size[2]"
        :lg="size[3]"
        :xl="size[4]"
      >
        <t-collapse-panel :value="Column_Index" :header="Column_Item.title">
          <t-row :gutter="[16, 16]" style="margin-bottom: 8px">
            <t-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6">
              <t-form-item :label="`${t('timetable.form.columns')}${prefix}${Column_Index + 1}`" name="columns">
                <t-input v-model="Column_Item.title" class="form-input" :placeholder="t('timetable.placeholder')" />
              </t-form-item>
            </t-col>
            <t-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6">
              <t-button class="form-button" size="medium" variant="outline" @click="addChild(Column_Index)">
                <template #icon> <add-icon /></template>
                {{ t('timetable.form.children') }}
              </t-button>
              <!--              TODO -->
              <t-button class="form-button" size="medium" variant="outline" @click="deleteCol(Column_Index)">
                {{ t('timetable.form.delete') }}
              </t-button>
            </t-col>
          </t-row>
          <div v-if="Column_Item.children">
            <table-title-editor
              :table-columns="Column_Item.children"
              :size="[12, 12, 12, 12, 12]"
              :prefix="`${prefix}${Column_Index + 1}-`"
              @delete-col="deleteCol_($event, Column_Index)"
            />
          </div>
        </t-collapse-panel>
      </t-col>
    </t-row>
  </t-collapse>
</template>
<script setup lang="ts">
import { AddIcon } from 'tdesign-icons-vue-next';
import { ref, watch } from 'vue';

import type { TableColumn } from '@/api/model/schoolModel';
import TableTitleEditor from '@/components/table-title-editor/index.vue';
import { t } from '@/locales';

// 接收 props 数据
const props = defineProps({
  // 数据：表格的数据
  tableColumns: {
    type: Array as () => TableColumn[],
    required: true,
  },
  prefix: {
    type: String,
    required: false,
  },
  size: {
    type: Array as () => number[],
    required: false,
  },
});

const emit = defineEmits(['delete-col']);

const tableColumns = ref(props.tableColumns);
const size = ref(props.size || [12, 12, 12, 12, 6]);
const prefix = ref(props.prefix || '');

watch(
  () => props.tableColumns,
  (newCols) => {
    tableColumns.value = [...newCols]; // 解构新数组，强制触发更新
  },
  { deep: true }, // 深度监听列数组的元素变化
);

const addChild = (Index: number) => {
  const col = props.tableColumns;
  const new_col: TableColumn = {
    colKey: `key${prefix.value}${Index}-${tableColumns.value.length}`,
    title: t('timetable.form.default_column'),
    width: '15',
  };
  if (!('children' in col[Index])) {
    col[Index].children = [new_col];
  } else {
    col[Index].children.push(new_col);
    // col[Index].children = [...col[Index].children, new_col];
  }
};

const deleteCol_ = (Event: TableColumn[], Index: number) => {
  if (Event.length === 0) {
    delete tableColumns.value[Index].children;
  } else {
    tableColumns.value[Index].children = Event;
  }
};

const deleteCol = (Index: number) => {
  tableColumns.value.splice(Index, 1);
  emit('delete-col', tableColumns.value);
};
</script>
<style scoped lang="less"></style>
