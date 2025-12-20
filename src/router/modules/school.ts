import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/DataCenter',
    component: Layout,
    redirect: '/DataCenter/Templates',
    name: 'DataCenter',
    meta: {
      title: {
        zh_CN: '学校数据中心',
        en_US: 'Data Center',
      },
      icon: 'view-list',
      expanded: true,
    },
    children: [
      {
        path: 'Templates',
        name: 'ListTemplates',
        component: () => import('@/pages/ETT/TimeTable/Templates/index.vue'),
        meta: {
          title: {
            zh_CN: '课程表模板',
            en_US: 'TimeTable Templates',
          },
        },
      },
      {
        path: 'TimeTable',
        name: 'TimeTable',
        component: () => import('@/pages/ETT/TimeTable/form/index.vue'),
        meta: {
          title: {
            zh_CN: '课程表编辑',
            en_US: 'TimeTable',
          },
        },
      },
      {
        path: 'RoomsCard',
        name: 'ListRooms',
        component: () => import('@/pages/ETT/Rooms/index.vue'),
        meta: {
          title: {
            zh_CN: '教室列表',
            en_US: 'Rooms List',
          },
        },
      },
      {
        path: 'TeachersCard',
        name: 'ListTeachers',
        component: () => import('@/pages/ETT/Teachers/index.vue'),
        meta: {
          title: {
            zh_CN: '教师列表',
            en_US: 'Teachers List',
          },
        },
      },
      {
        path: 'ClassesCard',
        name: 'ListClasses',
        component: () => import('@/pages/ETT/Classes/index.vue'),
        meta: {
          title: {
            zh_CN: '课程列表',
            en_US: 'Classes List',
          },
        },
      },
      {
        path: 'StudentsCard',
        name: 'ListStudents',
        component: () => import('@/pages/ETT/Students/index.vue'),
        meta: {
          title: {
            zh_CN: '学生列表',
            en_US: 'Students List',
          },
        },
      },
      {
        path: 'ConstraintsCard',
        name: 'ListConstraints',
        component: () => import('@/pages/ETT/Constraints/index.vue'),
        meta: {
          title: {
            zh_CN: '约束列表',
            en_US: 'Constraints List',
          },
        },
      },
      {
        path: 'Results',
        name: 'ListResults',
        component: () => import('@/pages/ETT/Results/index.vue'),
        meta: {
          title: {
            zh_CN: '导出课表',
            en_US: 'Results',
          },
        },
      },
    ],
  },
];
