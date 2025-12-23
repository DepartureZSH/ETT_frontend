export interface UserInfoListType {
  title: string;
  content: string;
  span?: number;
}

export interface UserInfo {
  name: string;
  mobile: string;
  email: string;
  bio: string;
  organization: string;
  position: string;
}

export const USER_INFO_LIST: Array<UserInfoListType> = [
  {
    title: 'pages.user.personalInfo.desc.mobile',
    content: '+86 13923734567',
  },
  {
    title: 'pages.user.personalInfo.desc.email',
    content: 'Account@qq.com',
  },
  {
    title: 'pages.user.personalInfo.desc.entity',
    content: '腾讯集团',
  },
  {
    title: 'pages.user.personalInfo.desc.position',
    content: '高级 UI 设计师',
  },
];

export const TEAM_MEMBERS = [
  {
    avatar: 'https://avatars.githubusercontent.com/Wen1kang',
    title: 'Lovellzhong 钟某某',
    description: '直客销售 港澳拓展组员工',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/pengYYYYY',
    title: 'Jiajingwang 彭某某',
    description: '前端开发 前台研发组员工',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/24469546?s=96&v=4',
    title: 'cruisezhang 林某某',
    description: '技术产品 产品组员工',
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/88708072?s=96&v=4',
    title: 'Lovellzhang 商某某',
    description: '产品运营 港澳拓展组员工',
  },
];

export const PRODUCT_LIST = ['a', 'b', 'c', 'd'];
