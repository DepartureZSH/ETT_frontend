<template>
  <div>
    <step :current="1" />
    <div>
      <t-space style="width: 100%; margin-top: 20px">
        <t-tabs v-model="value" theme="card" :addable="true" @add="addTab" @remove="removeTab" @change="onFill">
          <t-tab-panel :value="1" :label="t('form.panel1')" :destroy-on-hide="false" :removable="false">
            <div v-if="!DetailsLoading" class="form-basic-container">
              <div class="form-basic-item">
                <t-descriptions :title="t('form.basic_title')" bordered table-layout="auto">
                  <t-descriptions-item :label="BASE_FORM_DATA[0].name">{{ formData.name }}</t-descriptions-item>
                  <t-descriptions-item :label="BASE_FORM_DATA[1].name">{{ formData.type }}</t-descriptions-item>
                  <t-descriptions-item :label="BASE_FORM_DATA[2].name">{{ formData.owner }}</t-descriptions-item>
                  <t-descriptions-item :label="BASE_FORM_DATA[3].name">{{ publishDate }}</t-descriptions-item>
                  <t-descriptions-item :label="BASE_FORM_DATA[4].name">{{ updateDate }}</t-descriptions-item>
                  <t-descriptions-item :label="BASE_FORM_DATA[5].name">{{ createDate }}</t-descriptions-item>
                </t-descriptions>
                <t-divider />
                <t-descriptions :title="t('form.otherInfo')" layout="vertical" table-layout="auto">
                  <t-descriptions-item v-if="formData.attachment[0]" :label="BASE_FORM_DATA[6].name">
                    <t-link theme="primary" underline :href="formData.attachment[0].url">
                      <template #prefix-icon>
                        <link-icon />
                      </template>
                      {{ formData.attachment[0].name }}
                    </t-link>
                  </t-descriptions-item>
                  <t-descriptions-item :label="BASE_FORM_DATA[7].name">{{ formData.description }}</t-descriptions-item>
                </t-descriptions>
              </div>
            </div>
            <div v-else-if="DetailsLoading">
              <t-loading />
            </div>
            <div v-else-if="formData === undefined || productList.length === 0" class="list-card-empty">
              <t-space direction="vertical" align="center">
                <t-empty />
              </t-space>
            </div>
          </t-tab-panel>
          <t-tab-panel :value="2" :label="formData.DefaultTable.name" :destroy-on-hide="false" :removable="false">
            <t-form
              class="base-form"
              :data="formData.TableConfig"
              :rules="FORM_RULES"
              label-align="top"
              :label-width="100"
              @reset="onReset"
              @submit="onSubmit"
            >
              <div class="table-section">
                <t-card v-if="!DetailsLoading" :title="formData.DefaultTable.name">
                  <week-table
                    :data="formData.DefaultTable.tableData"
                    :columns="formData.DefaultTable.tableColumns"
                    :rowspan-and-colspan="formData.DefaultTable.rowspanAndColspan"
                    @cell-click="cell_click_merge"
                  />
                </t-card>
                <div v-else>
                  <t-loading />
                </div>
              </div>
            </t-form>
          </t-tab-panel>
          <t-tab-panel
            v-for="(item, index) in formData.Tables"
            :key="index"
            :value="index + 3"
            :label="item.name"
            :destroy-on-hide="false"
            :removable="true"
          >
            <div class="timetable-tab-panel">
              <div class="form-section">
                <t-form class="base-form" :data="formData" :rules="FORM_RULES" label-align="left">
                  <!-- 表单行容器：增加间距，响应式适配 -->
                  <t-row class="form-row" :gutter="[24, 16]">
                    <t-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <t-form-item :label="t('timetable.form.title')" name="name">
                        <t-input
                          v-model="item.name"
                          class="form-input"
                          :placeholder="t('timetable.placeholder')"
                          autofocus
                        />
                        <t-button class="form-button" size="medium" variant="outline" @click="addTitle">
                          <template #icon> <add-icon /></template>
                          {{ t('timetable.form.columns') }}
                        </t-button>
                      </t-form-item>
                    </t-col>
                  </t-row>
                  <t-row class="form-row" :gutter="[24, 16]">
                    <!-- 表格列配置项：自适应换行，最多3列一行，小屏堆叠 -->
                    <t-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                      <table-title-editor :table-columns="item.tableColumns" />
                    </t-col>
                  </t-row>
                </t-form>
              </div>
              <!--              TODO -->
              <div class="form-section">
                <t-card :title="`${item.name}`" :subtitle="t('timetable.form.card_tip2')">
                  <div class="form-section">
                    <t-row :gutter="[24, 16]" justify="space-between">
                      <t-col :span="6">
                        <t-button size="medium" variant="outline" @click="AddCustomTableRow">
                          <template #icon> <add-icon /></template>
                          {{ t('timetable.form.add') }}
                        </t-button>
                        <t-button size="medium" variant="outline" @click="onCustomTableMerge">
                          <template #icon>
                            <merge-cells-icon fill-color="transparent" stroke-color="currentColor" :stroke-width="2" />
                          </template>
                          {{ t('timetable.form.merge') }}
                        </t-button>
                      </t-col>
                      <t-col>
                        <t-button size="medium" variant="outline" @click="onCustomTableDelete">
                          <template #icon>
                            <delete-icon fill-color="transparent" stroke-color="currentColor" :stroke-width="2" />
                          </template>
                          {{ t('timetable.form.delete') }}
                        </t-button>
                      </t-col>
                    </t-row>
                  </div>
                  <week-table
                    :data="item.tableData"
                    :columns="item.tableColumns"
                    :rowspan-and-colspan="item.rowspanAndColspan"
                    :editable-cell-state="editableCellState"
                    @cell-click="cell_click_paste"
                  />
                </t-card>
              </div>
              <div class="form-section">
                <t-card :title="formData.DefaultTable.name" :subtitle="t('timetable.form.card_tip1')">
                  <week-table
                    :data="formData.DefaultTable.tableData"
                    :columns="formData.DefaultTable.tableColumns"
                    :rowspan-and-colspan="formData.DefaultTable.rowspanAndColspan"
                    :editable-cell-state="editableCellState"
                    @cell-click="cell_click_copy"
                  />
                </t-card>
              </div>
            </div>
          </t-tab-panel>
        </t-tabs>
      </t-space>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AddIcon, DeleteIcon, LinkIcon, MergeCellsIcon } from "tdesign-icons-vue-next";
import type {
  BaseTableCellEventContext,
  InputNumberProps,
  SubmitContext,
  TableProps,
  TabValue,
  UploadFailContext,
  UploadFile,
} from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import type { RowspanAndColspan, TableColumn, TableData, Timetable, WEEKTABLE } from '@/api/model/schoolModel';
import { getTable } from '@/api/school';
import Step from '@/components/steps/index.vue';
import TableTitleEditor from '@/components/table-title-editor/index.vue';
import WeekTable from '@/components/week-table/index.vue';
import { t } from '@/locales';
import type { RowsDataItem, TABLE_CONFIG_Item } from '@/pages/ETT/TimeTable/constants';
import {
  BASE_FORM_DATA,
  Default_FORM,
  Default_Table_config,
  FORM_RULES,
  FullWeekTable,
} from '@/pages/ETT/TimeTable/constants';

defineOptions({
  name: 'ListResults',
});

/* --------------------------------Menu-------------------------------------- */
const value = ref(1);
/* -----------------------------Main Form------------------------------------ */
const formData = ref<Timetable>(Default_FORM);
const DetailsLoading = ref(true);
const publishDate = ref<string>('');
const updateDate = ref<string>('');
const createDate = ref<string>('');
/* -----------------------------Default Table-------------------------------- */
// const time_steps = ref([1, 5, 1]);
// const default_config = ref<TABLE_CONFIG_Item[]>(Default_Table_config);
const config_tip_week = ref(Default_Table_config[0].description);
const config_tip_day = ref(Default_Table_config[1].description);
const Cells = ref<RowspanAndColspan>({});
const RowsData = ref<RowsDataItem[]>([]);
/* -----------------------------Custom Table-------------------------------- */
const copyData = ref<string | number>('');

/* --------------------------------Menu-------------------------------------- */
const fetchDetailsData = async (detailId: string) => {
  try {
    const baseInfo = await getTable(detailId);
    formData.value = { ...baseInfo };
    formData.value.parentId = baseInfo.index;
    formData.value.index = -1;
    publishDate.value = new Date(formData.value.publishDate).toLocaleDateString(t('Date'));
    updateDate.value = new Date(formData.value.updateDate).toLocaleDateString(t('Date'));
    createDate.value = new Date(formData.value.createDate).toLocaleDateString(t('Date'));
    for (const item of formData.value.DefaultTable.tableData) {
      const Time: string[] = item.Time.split('-');
      const newRow = {
        range: Time,
        index: item.index,
        tip: '',
      };
      RowsData.value.push(newRow);
    }
    DetailsLoading.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    DetailsLoading.value = false;
  }
};

onMounted(() => {
  const template = localStorage.getItem('templates');
  if (template) {
    fetchDetailsData(template);
  }
});

const addTab = () => {
  const newExcel: WEEKTABLE = {};
  formData.value.Tables.push(newExcel);
};

const removeTab = (options: { value: TabValue; index: number; e: MouseEvent }) => {
  formData.value.Tables.splice(options.index - 2, 1);
};

/* -----------------------------Main Form------------------------------------ */
const onReset = () => {
  MessagePlugin.warning(t('form.onReset'));
};
const onSubmit = (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    MessagePlugin.success(t('form.onSubmit'));
  }
};
// const beforeUpload = (file: UploadFile) => {
//   if (!/\.pdf$/.test(file.name) || !/\.xlsx$/.test(file.name)) {
//     MessagePlugin.warning(t('form.beforeUpload'));
//     return false;
//   }
//   if (file.size > 1024 * 1024) {
//     MessagePlugin.warning(t('form.oversize'));
//     return false;
//   }
//   return true;
// };
// const handleFail = (options: UploadFailContext) => {
//   MessagePlugin.error(`${options.file.name} ${t('form.failUpload')}`);
// };
// // 用于格式化接口响应值，error 会被用于上传失败的提示文字；url 表示文件/图片地址
// const formatResponse = (res: any) => {
//   return { ...res, error: `${t('form.failUpload')}`, url: res.url };
// };

/* -----------------------------Default Table-------------------------------- */
// const onWeekValidate: InputNumberProps['onValidate'] = (p) => {
//   console.info('Validate', p.error);
//   if (p.error) {
//     config_tip_week.value = Default_Table_config[0].error[p.error];
//   } else {
//     config_tip_week.value = Default_Table_config[0].description;
//   }
// };
//
// const onDayValidate: InputNumberProps['onValidate'] = (p) => {
//   console.info('Validate', p.error);
//   if (p.error) {
//     config_tip_day.value = Default_Table_config[1].error[p.error];
//   } else {
//     config_tip_day.value = Default_Table_config[1].description;
//     DetailsLoading.value = true;
//     formData.value.DefaultTable.tableColumns = FullWeekTable.tableColumns.slice(0, formData.value.TableConfig.day + 1);
//     DetailsLoading.value = false;
//     onFill();
//   }
// };
//
// // 添加时间段
// const Default_AddRow = () => {
//   const last_time = RowsData.value[RowsData.value.length - 1].range[1];
//   const newRow: RowsDataItem = {
//     range: [`${last_time}`, `${last_time}`],
//     index: RowsData.value.length,
//     tip: '',
//   };
//   const newTableData: TableData = {
//     Time: `${last_time}-${last_time}`,
//     index: RowsData.value.length,
//   };
//   RowsData.value.push(newRow);
//   formData.value.DefaultTable.tableData.push(newTableData);
// };
//
// // 时间段时间修改
// const handleRangePick = (v: number) => {
//   const index = v;
//   if (index > 0 && RowsData.value[index].range[0] < RowsData.value[index - 1].range[1]) {
//     RowsData.value[index].range = [RowsData.value[index - 1].range[1], RowsData.value[index - 1].range[1]];
//     RowsData.value[index].tip = t('timetable.form.time_tip');
//     return;
//   }
//   const range = RowsData.value[index].range;
//   RowsData.value[index].tip = '';
//   formData.value.DefaultTable.tableData[index].Time = `${range[0]}-${range[1]}`;
// };

// 单元格点击事件
const cell_click_merge = (context: BaseTableCellEventContext<TableColumn>) => {
  for (const colItem of formData.value.DefaultTable.tableColumns) {
    delete colItem.attrs;
  }
  const rowIndex = context.rowIndex;
  const colIndex = context.colIndex;
  if (colIndex === 0) {
    return;
  }
  if ('rowspan' in Cells.value && !Number.isNaN(Cells.value.rowspan)) {
    Cells.value = {};
  }
  if ('rowIndex' in Cells.value && !Number.isNaN(Cells.value.rowIndex)) {
    const cI_min = Cells.value.colIndex < colIndex ? Cells.value.colIndex : colIndex;
    const cI_max = Cells.value.colIndex < colIndex ? colIndex : Cells.value.colIndex;
    const rI_min = Cells.value.rowIndex < rowIndex ? Cells.value.rowIndex : rowIndex;
    const rI_max = Cells.value.rowIndex < rowIndex ? rowIndex : Cells.value.rowIndex;
    Cells.value = {
      colIndex: cI_min,
      rowIndex: rI_min,
      rowspan: rI_max - rI_min + 1,
      colspan: cI_max - cI_min + 1,
    };
    for (let c = cI_min; c <= cI_max; c++) {
      formData.value.DefaultTable.tableColumns[c].attrs = ({ row }) => {
        if (row.index >= rI_min && row.index <= rI_max) {
          return {
            style: {
              backgroundColor: 'var(--td-brand-color-light)',
            },
          };
        }
      };
    }
  } else {
    Cells.value = {
      colIndex,
      rowIndex,
    };
    formData.value.DefaultTable.tableColumns[colIndex].attrs = ({ row }) => {
      if (row.index === rowIndex) {
        return {
          style: {
            backgroundColor: 'var(--td-brand-color-light)',
          },
        };
      }
    };
  }
};

// 单元格合并
// const onMerge = () => {
//   if (!('rowIndex' in Cells.value) || Number.isNaN(Cells.value.rowIndex)) {
//     Cells.value = {};
//     for (const colItem of formData.value.DefaultTable.tableColumns) {
//       delete colItem.attrs;
//     }
//     return;
//   }
//   for (let i = 0; i < formData.value.DefaultTable.rowspanAndColspan.length; i++) {
//     const rs_cs = formData.value.DefaultTable.rowspanAndColspan[i];
//     if (rs_cs.colIndex === Cells.value.colIndex && rs_cs.rowIndex === Cells.value.rowIndex) {
//       formData.value.DefaultTable.rowspanAndColspan.splice(i, 1);
//       // 重置选中状态
//       Cells.value = {};
//       for (const colItem of formData.value.DefaultTable.tableColumns) {
//         delete colItem.attrs;
//       }
//       return;
//     }
//   }
//   // 校验是否有有效的起始单元格
//   if (!Cells.value || !('rowIndex' in Cells.value) || Cells.value.rowIndex === undefined) {
//     MessagePlugin.warning(t('timetable.form.selectCellFirst'));
//     return;
//   }
//
//   // 校验是否有有效的合并范围
//   if (
//     !('rowspan' in Cells.value) ||
//     !('colspan' in Cells.value) ||
//     Cells.value.rowspan < 1 ||
//     Cells.value.colspan < 1
//   ) {
//     MessagePlugin.warning(t('timetable.form.invalidMergeRange'));
//     return;
//   }
//
//   const mergeRules = formData.value.DefaultTable.rowspanAndColspan || [];
//   const { rowIndex, colIndex, rowspan, colspan } = Cells.value;
//
//   // 清除范围内已有的冲突合并规则
//   const newRules = mergeRules.filter((rule) => {
//     // 检查规则是否与当前合并范围冲突
//     const ruleRowOverlap = !(rule.rowIndex + (rule.rowspan || 1) <= rowIndex || rule.rowIndex >= rowIndex + rowspan!);
//     const ruleColOverlap = !(rule.colIndex + (rule.colspan || 1) <= colIndex || rule.colIndex >= colIndex + colspan!);
//     return !(ruleRowOverlap && ruleColOverlap);
//   });
//
//   // 添加新的合并规则
//   newRules.push({ rowIndex, colIndex, rowspan, colspan });
//   formData.value.DefaultTable.rowspanAndColspan = newRules;
//
//   // 重置选中状态
//   Cells.value = {};
//   for (const colItem of formData.value.DefaultTable.tableColumns) {
//     delete colItem.attrs;
//   }
// };

// 单元格填充
const onFill = () => {
  let count = 1;
  for (let i = 1; i < formData.value.DefaultTable.tableColumns.length; i++) {
    const col_key = formData.value.DefaultTable.tableColumns[i].colKey;
    for (let j = 0; j < formData.value.DefaultTable.tableData.length; j++) {
      // for (const rs_cs of formData.value.DefaultTable.rowspanAndColspan){
      //   if (rs_cs.rowIndex <)
      //   if (rs_cs.colIndex < )
      // }
      formData.value.DefaultTable.tableData[j][col_key] = `${t('timetable.form.fill_prefix')} ${count}`;
      count++;
    }
  }
};

// 删除一行
// const onDefaultDel = (index: number) => {
//   // 检查行索引有效
//   console.log('del', index);
//   console.log(formData.value.DefaultTable);
//   if (index < 0 || index >= formData.value.DefaultTable.tableData.length) {
//     return;
//   }
//   // 检查相关合并
//   const mergeRules = formData.value.DefaultTable.rowspanAndColspan || [];
//   formData.value.DefaultTable.rowspanAndColspan = mergeRules.filter((rule) => {
//     return !(rule.rowIndex === index) || !(rule.rowIndex < index && rule.rowIndex + rule.rowspan > index);
//   });
//   // 删除行
//   RowsData.value.splice(index, 1);
//   formData.value.DefaultTable.tableData.splice(index, 1);
//   // 重构所有行index
//   for (let i = 0; i < formData.value.DefaultTable.tableData.length; i++) {
//     formData.value.DefaultTable.tableData[i].index = i;
//   }
//   for (let i = 0; i < formData.value.DefaultTable.rowspanAndColspan.length; i++) {
//     if (formData.value.DefaultTable.rowspanAndColspan[i].rowIndex > index) {
//       formData.value.DefaultTable.rowspanAndColspan[i].rowIndex =
//         formData.value.DefaultTable.rowspanAndColspan[i].rowIndex - 1;
//     }
//   }
//   console.log(formData.value.DefaultTable);
//   onFill();
//   Cells.value = {};
// };

/* ---------------------------Custom Table----------------------------------- */
const editableCellState: TableProps['editableCellState'] = () => {
  return true;
};

const addTitle = () => {
  const len = formData.value.Tables[value.value - 3].tableColumns.length;
  const newData = {
    colKey: `key${len}`,
    title: t('timetable.form.default_column'),
    width: '15',
  };
  formData.value.Tables[value.value - 3].tableColumns = [
    ...formData.value.Tables[value.value - 3].tableColumns,
    newData,
  ];
};

const AddCustomTableRow = () => {
  const Table = formData.value.Tables[value.value - 3].tableData;
  const colKeys = formData.value.Tables[value.value - 3].tableColumns.map((col) => col.colKey);
  const newTableData: TableData = {
    index: Table.length,
  };
  colKeys.forEach((colKey) => {
    newTableData[colKey] = '';
  });
  Table.push(newTableData);
};

const onCustomTableMerge = () => {};

const onCustomTableDelete = () => {};

const cell_click_copy = (context: BaseTableCellEventContext<TableColumn>) => {
  for (const colItem of formData.value.DefaultTable.tableColumns) {
    delete colItem.attrs;
  }
  const col = context.col;
  const rowIndex = context.rowIndex;
  const colIndex = context.colIndex;
  copyData.value = formData.value.DefaultTable.tableData[rowIndex][col.colKey];
  formData.value.DefaultTable.tableColumns[colIndex].attrs = ({ row }) => {
    if (row.index === rowIndex) {
      return {
        style: {
          backgroundColor: 'var(--td-brand-color-light)',
        },
      };
    }
  };
};

const cell_click_paste = (context: BaseTableCellEventContext<TableColumn>) => {
  if (copyData.value === '') {
  } else {
    const col = context.col;
    const rowIndex = context.rowIndex;
    formData.value.Tables[value.value - 3].tableData[rowIndex][col.colKey] = copyData.value;
    copyData.value = '';
    for (const colItem of formData.value.DefaultTable.tableColumns) {
      delete colItem.attrs;
    }
  }
};
</script>
<style lang="less" scoped>
@import 'index.less';
// 全局样式变量：统一控制间距、尺寸，便于维护
:root {
  --panel-padding: 24px;
  --section-margin: 16px;
  --form-item-gap: 16px;
  --input-width: 100%;
  --card-radius: 8px;
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

// 标签页面板外层容器
.timetable-tab-panel {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 100%;
  box-sizing: border-box;
}

// 表单区域
.form-section {
  margin-bottom: 16px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;

  .form-row {
    margin-bottom: 16px;
  }

  .form-input {
    width: 322px;
    box-sizing: border-box;
  }

  // 列配置标题
  .columns-container {
    .columns-title {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
      padding-left: 4px;
    }

    .columns-row {
      // 列配置项换行时的间距
      margin-bottom: 8px;
    }
  }
}

.form-button {
  margin-left: 16px;
}

// 表格区域
.table-section {
  padding: 16px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: var(--card-radius);
  min-height: 400px; // 保证表格区域最小高度，避免内容过少时塌陷
  box-sizing: border-box;
}

// 响应式适配：小屏下优化
@media (max-width: 768px) {
  :root {
    --panel-padding: 16px;
    --section-margin: 12px;
  }

  .timetable-tab-panel {
    padding: var(--panel-padding);
  }

  .form-section {
    padding: 12px;
  }

  .table-section {
    min-height: 300px;
  }
}

// 修复 TDesign 组件默认样式冲突
:deep(.base-form) {
  .t-form-item__label {
    padding-bottom: 4px;
    font-weight: 500;
  }

  .t-form-item__content {
    line-height: 1.5;
  }
}

// 输入框聚焦样式优化
:deep(.form-input) {
  &:focus {
    border-color: var(--td-brand-color);
    box-shadow: 0 0 0 2px rgba(var(--td-brand-color-rgb), 0.1);
  }
}
</style>
