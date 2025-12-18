<template>
  <div>
    <!-- 表格容器 -->
    <t-table
      :bordered="true"
      :data="data"
      :columns="columns"
      row-key="index"
      :rowspan-and-colspan="rowspanAndColspanFn"
      :editable-cell-state="editableCellState"
      resizable
      table-layout="fixed"
      lazy-load
      @cell-click="cell_click"
    />
  </div>
</template>
<script lang="tsx" setup>
// 引入 TDesign 相关组件
import type { BaseTableCellEventContext, TableProps, TableRowData } from 'tdesign-vue-next';
import { ref, watch } from 'vue';

import type { RowspanAndColspan, TableColumn, TableData } from '@/api/model/schoolModel';

type EditableCellState = TableProps<TableRowData>['editableCellState'];

// 接收 props 数据
const props = defineProps({
  // 数据：表格的数据
  data: {
    type: Array as () => TableData[],
    required: true,
  },
  // 列配置：表格的列定义
  columns: {
    type: Array as () => TableColumn[],
    required: true,
  },
  // 合并行和列的配置
  rowspanAndColspan: {
    type: Array as () => RowspanAndColspan[],
    required: true,
  },
  editableCellState: {
    // 运行时校验：允许 Object 或 Function 类型
    type: [Object, Function] as unknown as () => EditableCellState,
    required: false,
    default: undefined, // 可选：设置默认值
  },
});

const emit = defineEmits(['cell-click']);

const default_editableCellState: TableProps['editableCellState'] = () => {
  return false;
};

const cell_click = (context: BaseTableCellEventContext<TableColumn>) => {
  emit('cell-click', context);
};

const columns = ref(props.columns);
const editableCellState = ref(props.editableCellState || default_editableCellState);

// 将传递的 `rowspanAndColspan` 数组转换成合适的合并逻辑
const rowspanAndColspanFn: TableProps['rowspanAndColspan'] = ({ rowIndex, colIndex }) => {
  // 遍历父组件传递的合并规则数组
  for (const rule of props.rowspanAndColspan) {
    if (rule.colIndex === colIndex && rule.rowIndex === rowIndex) {
      return {
        rowspan: rule.rowspan || 1,
        colspan: rule.colspan || 1,
      };
    }
  }
  return {};
};

watch(
  () => props.columns,
  (newCols) => {
    console.log('watch', newCols);
    columns.value = [...newCols]; // 解构新数组，强制触发更新
    console.log('watch columns', columns.value);
  },
  { deep: true }, // 深度监听列数组的元素变化
);
</script>
<style scoped>
/* 这里可以根据需要调整样式 */
.week-table {
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
