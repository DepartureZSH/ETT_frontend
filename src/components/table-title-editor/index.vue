<template>
  <!--  <t-collapse -->
  <!--    :expand-icon="showArrow" -->
  <!--    :borderless="borderless" -->
  <!--    @change="handlePanelChange" -->
  <!--  > -->
  <t-collapse>
    <t-collapse-panel
      v-for="(Column_Item, Column_Index) in item.tableColumns"
      :key="Column_Index"
      :value="Column_Index"
      :header="Column_Item.title"
    >
      这部分是每个折叠面板折叠或展开的内容
    </t-collapse-panel>
  </t-collapse>
</template>
<script setup lang="ts">
import TableTitleEditer from '@/components/table-title-editer/index';
</script>
<style scoped lang="less"></style>
