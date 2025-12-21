import type { FormRule, UploadProps } from 'tdesign-vue-next';

import type { TABLECONFIG, Timetable, TimetableDetail, WEEKTABLE } from '@/api/model/schoolModel';
import { t } from '@/locales';

export const FullWeekTable: WEEKTABLE = {
  tableColumns: [
    {
      colKey: 'Time',
      title: '时间',
    },
    {
      colKey: 'Monday',
      title: '周一',
    },
    {
      colKey: 'Tuesday',
      title: '周二',
    },
    {
      colKey: 'Wednesday',
      title: '周三',
    },
    {
      colKey: 'Thursday',
      title: '周四',
    },
    {
      colKey: 'Friday',
      title: '周五',
    },
    {
      colKey: 'Saturday',
      title: '周六',
    },
    {
      colKey: 'Sunday',
      title: '周日',
    },
  ],
};

export interface RowsDataItem {
  index?: number;
  range?: string[];
  tip?: string;
  [key: string]: string | string[] | number;
}

export const Default_Table_Config: TABLECONFIG = {
  week: 13,
  day: 5,
  slot: 144,
};

type Table_Config_KEY = keyof TABLECONFIG;

export interface TABLE_CONFIG_Item {
  label: string;
  name: Table_Config_KEY;
  description: string;
  error?: {
    'exceed-maximum'?: string;
    'below-minimum'?: string;
  };
  display: boolean;
  type: 'number' | 'radio';
}

export const Default_Table_config: TABLE_CONFIG_Item[] = [
  {
    label: t('form.week'),
    name: 'week',
    description: t('form.week_description'),
    error: {
      'exceed-maximum': t('form.week_exceed'),
      'below-minimum': t('form.week_below'),
    },
    display: true,
    type: 'number',
  },
  {
    label: t('form.days'),
    name: 'day',
    description: t('form.days_description'),
    error: {
      'exceed-maximum': t('form.days_exceed'),
      'below-minimum': t('form.days_below'),
    },
    display: true,
    type: 'number',
  },
];

export const Default_Table: WEEKTABLE = {
  name: '默认课表',
  tableColumns: [
    {
      colKey: 'Time',
      title: '时间',
      width: '15',
    },
    {
      colKey: 'Monday',
      title: '周一',
      width: '15',
    },
    {
      colKey: 'Tuesday',
      title: '周二',
      width: '15',
    },
    {
      colKey: 'Wednesday',
      title: '周三',
      width: '15',
    },
    {
      colKey: 'Thursday',
      title: '周四',
      width: '15',
    },
    {
      colKey: 'Friday',
      title: '周五',
      width: '15',
    },
  ], // 列定义
  tableData: [], // 行数据（mock 中部分为空数组，实际会是对象数组）
  rowspanAndColspan: [], // 单元格合并配置（mock 中为空数组）
};

export const Default_FORM: Timetable = {
  parentId: null,
  name: '',
  type: '',
  owner: '', // 用户
  publishDate: '', // 发布时间
  updateDate: '', // 更新时间
  createDate: '', // 创建时间
  attachment: [] as UploadProps['value'], // 附件
  description: '', // 描述
  TableConfig: Default_Table_Config, // 课程配置
  DefaultTable: Default_Table, // 默认周课表
  Tables: [],
};

type FORM_DATA_KEY = keyof Timetable;

interface BASE_INFO_Item {
  name: string;
  value: FORM_DATA_KEY;
  type: 'text' | 'textarea' | 'date' | 'file' | 'username';
  display: boolean;
}

export const BASE_FORM_DATA: BASE_INFO_Item[] = [
  {
    name: t('timetable.name'),
    value: 'name',
    type: 'text',
    display: true,
  },
  {
    name: t('timetable.type'),
    value: 'type',
    type: 'text',
    display: true,
  },
  {
    name: t('timetable.owner'),
    value: 'owner',
    type: 'username',
    display: false,
  },
  {
    name: t('timetable.publishDate'),
    value: 'publishDate',
    type: 'date',
    display: false,
  },
  {
    name: t('timetable.updateDate'),
    value: 'updateDate',
    type: 'date',
    display: false,
  },
  {
    name: t('timetable.createDate'),
    value: 'createDate',
    type: 'date',
    display: false,
  },
  {
    name: t('timetable.attachment'),
    value: 'attachment',
    type: 'file',
    display: true,
  },
  {
    name: t('timetable.description'),
    value: 'description',
    type: 'textarea',
    display: true,
  },
];

type Detail_DATA_KEY = keyof TimetableDetail;

interface Detail_DATAItem {
  name: string;
  value: Detail_DATA_KEY;
  type: 'text' | 'textarea' | 'date' | 'file' | 'username';
  display: boolean;
}

export const Default_Detail: TimetableDetail = {
  index: 0,
  isStar: false,
  owner: '-',
  usage: 0,
  name: '-',
  type: '-',
  createDate: new Date(),
  publishDate: new Date(),
  updateDate: new Date(),
  attachment: [],
  description: '',
  TableConfig: {}, // 课程配置
  DefaultTable: {}, // 默认周课表
  Tables: [],
};

export const BASE_Detail_DATA: Detail_DATAItem[] = [
  {
    name: t('timetable.name'),
    value: 'name',
    type: 'text',
    display: true,
  },
  {
    name: t('timetable.num'),
    value: 'index',
    type: 'text',
    display: true,
  },
  {
    name: t('timetable.type'),
    value: 'type',
    type: 'text',
    display: true,
  },
  {
    name: t('timetable.owner'),
    value: 'owner',
    type: 'username',
    display: false,
  },
  {
    name: t('timetable.publishDate'),
    value: 'publishDate',
    type: 'date',
    display: false,
  },
  {
    name: t('timetable.updateDate'),
    value: 'updateDate',
    type: 'date',
    display: false,
  },
  {
    name: t('timetable.createDate'),
    value: 'createDate',
    type: 'date',
    display: false,
  },
  {
    name: t('timetable.attachment'),
    value: 'attachment',
    type: 'file',
    display: true,
  },
  {
    name: t('timetable.description'),
    value: 'description',
    type: 'textarea',
    display: true,
  },
];

export const FORM_RULES: Record<string, FormRule[]> = {
  name: [{ required: true, whitespace: true, trigger: 'blur' }],
  type: [{ required: true, whitespace: true, trigger: 'blur' }],
  description: [{ required: true, whitespace: true, trigger: 'blur' }],
};

export const CONFIG_RULES: Record<string, FormRule[]> = {
  week: [
    { required: true, trigger: 'blur' },
    { min: 1, trigger: 'change', type: 'error', message: t('form.week_below') },
    { max: 52, trigger: 'change', type: 'error', message: t('form.week_exceed') },
  ],
  day: [
    { required: true, trigger: 'blur' },
    { min: 1, trigger: 'change', type: 'error', message: t('form.days_below') },
    { max: 7, trigger: 'change', type: 'error', message: t('form.days_exceed') },
  ],
};
