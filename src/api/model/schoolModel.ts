// src/types/timetable.ts
import type { BaseTableCol, UploadProps } from 'tdesign-vue-next';
import type { TableEditableCellConfig } from 'tdesign-vue-next/es/table/type';

/** 附件类型 */
// export interface Attachment {
//   name: string; // 文件名，如 "小学通用课表.xlsx"
//   url: string;
//   status: 'success'
//   size: number;
//   type: {
//     key: string; // 目前 mock 中为空字符串
//     value: 'xlsx' | 'pdf' | ''; // 文件类型，mock 中目前只有 xlsx
//   };
// }

/** 表格列配置（支持嵌套 children，用于表头分组） */
export interface TableColumn extends BaseTableCol {
  colKey: string;
  title: string;
  width?: string; // 如 '15'（可能是百分比或固定值）
  children?: TableColumn[]; // 支持多级表头
}

export interface TableData {
  index: number;
  Time?: string;
  [key: string]: string | number; // 允许属性值为 string 或 number
}

export interface RowspanAndColspan {
  colIndex?: number;
  rowIndex?: number;
  rowspan?: number;
  colspan?: number;
}

/** 单张周课表（总周表、班级周表、教师周表等） */
export interface WEEKTABLE {
  name?: string; // 如 "总周表"、"班级周表"
  tableColumns?: TableColumn[]; // 列定义
  tableData?: TableData[]; // 行数据（mock 中部分为空数组，实际会是对象数组）
  rowspanAndColspan?: RowspanAndColspan[]; // 单元格合并配置（mock 中为空数组）
  edit?: TableEditableCellConfig;
}

export interface TABLECONFIG {
  week?: number;
  day?: number;
  slot?: number;
  start?: number;
  end?: number;
  isFixed?: boolean;
}

/** 单个课表模板数据（用于 创建 接口） */
export interface Timetable {
  index?: number; // 模板 ID
  parentId?: number | null; // 模板父ID
  owner?: string; // 拥有者外键
  name?: string; // 模板名称
  type?: string; // 模板类型，如 "小学"、"初中"
  description?: string; // 模板描述
  createDate?: Date; // 创建日期，格式 YYYY-MM-DD
  publishDate?: Date; // 发布日期
  updateDate?: Date; // 更新日期
  attachment?: UploadProps['value']; // 附件信息
  TableConfig?: TABLECONFIG; // 课程配置
  DefaultTable?: WEEKTABLE; // 默认周课表
  Tables?: WEEKTABLE[]; // 多个周课表视图
}

/** 单个课表模板的完整详情（用于 /api/get-details/:id 接口返回） */
export interface TimetableDetail {
  index?: number; // 模板 ID
  isStar?: boolean; // 是否已收藏
  owner?: string; // 拥有者，如 "SchedAI"
  usage?: number; // 使用次数
  name?: string; // 模板名称
  type?: string; // 模板类型，如 "小学"、"初中"
  createDate?: Date; // 创建日期，格式 YYYY-MM-DD
  publishDate?: Date; // 发布日期
  updateDate?: Date; // 更新日期
  attachment?: UploadProps['value']; // 附件信息
  description?: string; // 模板描述
  TableConfig?: TABLECONFIG; // 课程配置
  DefaultTable?: WEEKTABLE; // 默认周课表
  Tables?: WEEKTABLE[]; // 多个周课表视图
}

/** 列表项（我的模板、我的收藏、模板广场中每个卡片显示的数据） */
export interface TimetableCard {
  index: number; // 模板 ID
  isStar: boolean; // 是否已收藏
  isOwner: boolean; // 是否本人创建（仅我的模板和收藏中有）
  usage: number; // 使用次数
  name: string; // 模板名称
  description: string; // 模板描述
  // 注意：列表接口中没有返回 type、attachment、Tables 等详细信息
  // 如果需要展示，可后续通过详情接口补充
}

/** 列表接口通用返回结构（我的模板 / 收藏 / 推荐） */
export interface TimetableListResponse {
  code: number;
  data: {
    list: TimetableCard[];
  };
}

/** 详情接口返回结构 */
export interface TimetableDetailResponse {
  code: number;
  data: TimetableDetail;
}
