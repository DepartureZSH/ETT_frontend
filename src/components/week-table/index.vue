<template>
  <div class="week-table">
    <!-- 表格容器 -->
    <t-table :data="weekData" border>
      <thead>
        <tr>
          <th>课程</th>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in timeSlots" :key="index">
          <td>{{ row }}</td>
          <td v-for="(day, idx) in days" :key="idx">
            <!-- 用户可以点击或选择课程，更新课程数据 -->
            <t-select v-model="weekData[index][day]" :options="courseOptions" placeholder="选择课程" size="small" />
          </td>
        </tr>
      </tbody>
    </t-table>

    <!-- 课程数据展示（可选） -->
    <t-button @click="showData">查看当前数据</t-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

// 7天的课程数据（每天的课程）
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// 时间槽（假设每一天有 5 个时间段）
const timeSlots = ['8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00'];

// 课程选项（可以是从后端获取的课程数据，或预定义的课程列表）
const courseOptions = [
  { label: '数学', value: 'Math' },
  { label: '英语', value: 'English' },
  { label: '物理', value: 'Physics' },
  { label: '化学', value: 'Chemistry' },
  { label: '生物', value: 'Biology' },
  { label: '计算机', value: 'Computer' },
];

// 默认的周表数据，假设传入的 ITC2019 数据结构和我们预定义的一样
const weekData = ref(
  timeSlots.map(() => {
    const dayData = {};
    days.forEach((day) => {
      dayData[day] = ''; // 初始化为空
    });
    return dayData;
  }),
);

// 处理用户点击查看数据的事件
const showData = () => {
  console.log(weekData.value);
};
</script>
<style scoped lang="less">
.week-table {
  width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
