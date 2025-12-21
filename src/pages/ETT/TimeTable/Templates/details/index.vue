<template>
  <div v-if="!isHidden" class="template-wrapper">
    <t-space class="tab-space">
      <t-tabs v-model="value">
        <template #action>
          <div class="operation">
            <t-button
              :theme="baseInfo.isStar ? 'primary' : 'default'"
              :variant="baseInfo.isStar ? 'base' : 'text'"
              @click="handleStar"
            >
              {{ baseInfo.isStar ? t('timetable.unstar') : t('timetable.star') }}
            </t-button>
          </div>
        </template>
        <t-tab-panel :value="1" label="课表详情" :destroy-on-hide="false">
          <div v-if="!DetailsLoading" class="detail-base">
            <t-card :bordered="false">
              <div class="form-basic-container">
                <div class="form-basic-item">
                  <t-descriptions :title="t('detail.title')" bordered table-layout="auto">
                    <t-descriptions-item :label="BASE_FORM_DATA[0].name">{{ baseInfo.name }}</t-descriptions-item>
                    <t-descriptions-item :label="BASE_FORM_DATA[1].name">{{ baseInfo.type }}</t-descriptions-item>
                    <t-descriptions-item :label="BASE_FORM_DATA[2].name">{{ baseInfo.owner }}</t-descriptions-item>
                    <t-descriptions-item :label="BASE_FORM_DATA[3].name">
                      <div v-if="baseInfo.publishDate">
                        {{ new Date(baseInfo.publishDate).toLocaleDateString(t('Date')) }}
                      </div>
                      <div v-else>-</div>
                    </t-descriptions-item>
                    <t-descriptions-item :label="BASE_FORM_DATA[4].name">
                      <div v-if="baseInfo.updateDate">
                        {{ new Date(baseInfo.updateDate).toLocaleDateString(t('Date')) }}
                      </div>
                      <div v-else>-</div>
                    </t-descriptions-item>
                    <t-descriptions-item :label="BASE_FORM_DATA[5].name">
                      <div v-if="baseInfo.createDate">
                        {{ new Date(baseInfo.createDate).toLocaleDateString(t('Date')) }}
                      </div>
                      <div v-else>-</div>
                    </t-descriptions-item>
                  </t-descriptions>
                  <t-divider />
                  <t-descriptions :title="t('form.otherInfo')" layout="vertical" table-layout="auto">
                    <t-descriptions-item
                      v-if="baseInfo.attachment && baseInfo.attachment[0]"
                      :label="BASE_FORM_DATA[6].name"
                    >
                      <t-link theme="primary" underline :href="baseInfo.attachment[0].url">
                        <template #prefix-icon>
                          <link-icon />
                        </template>
                        {{ baseInfo.attachment[0].name }}
                      </t-link>
                    </t-descriptions-item>
                    <t-descriptions-item :label="BASE_FORM_DATA[7].name">{{
                      baseInfo.description
                    }}</t-descriptions-item>
                  </t-descriptions>
                </div>
              </div>
              <!--              <t-descriptions :title="t('detail.title')"> -->
              <!--                <t-descriptions-item v-for="(item, index) in BASE_Detail_DATA" :key="index" :label="item.name"> -->
              <!--                  <span> -->
              <!--                    {{ item.value === 'attachment' ? baseInfo[item.value][0].name : baseInfo[item.value] }} -->
              <!--                  </span> -->
              <!--                </t-descriptions-item> -->
              <!--              </t-descriptions> -->
            </t-card>
          </div>
          <div v-else-if="DetailsLoading">
            <t-loading />
          </div>
        </t-tab-panel>
        <t-tab-panel :value="2" :label="baseInfo.DefaultTable.name" :destroy-on-hide="false">
          <div v-if="!DetailsLoading">
            <week-table
              :data="baseInfo.DefaultTable.tableData"
              :columns="baseInfo.DefaultTable.tableColumns"
              :rowspan-and-colspan="baseInfo.DefaultTable.rowspanAndColspan"
            />
          </div>
          <div v-else>
            <t-loading />
          </div>
        </t-tab-panel>
        <t-tab-panel
          v-for="(item, index) in baseInfo.Tables"
          :key="index"
          :value="index + 3"
          :label="item.name"
          :destroy-on-hide="false"
        >
          <div v-if="!DetailsLoading">
            <week-table
              :data="item.tableData"
              :columns="item.tableColumns"
              :rowspan-and-colspan="item.rowspanAndColspan"
            />
          </div>
          <div v-else>
            <t-loading />
          </div>
        </t-tab-panel>
      </t-tabs>
    </t-space>
  </div>
</template>
<script setup lang="ts">
import { LinkIcon } from 'tdesign-icons-vue-next';
import { ref, watch } from 'vue';

import type { TimetableDetail } from '@/api/model/schoolModel';
import { getDetails } from '@/api/school';
import WeekTable from '@/components/week-table/index.vue';
import { t } from '@/locales';
import { BASE_Detail_DATA, BASE_FORM_DATA, Default_Detail } from '@/pages/ETT/TimeTable/constants';

const props = defineProps({
  detailId: {
    type: String,
    default: '-1',
  },
  isHidden: {
    type: Boolean,
    default: true,
  },
});

// const route = useRoute();

const value = ref(1);
const baseInfo = ref<TimetableDetail>(Default_Detail);
const DetailsLoading = ref(true);

const fetchDetailsData = async () => {
  try {
    const productId = props.detailId;
    baseInfo.value = await getDetails(productId);
    console.log('fetchDetailsData', baseInfo.value);
    DetailsLoading.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    DetailsLoading.value = false;
  }
};

watch(
  () => props.detailId,
  () => {
    fetchDetailsData();
  },
);

const handleStar = async () => {
  // TODO
  try {
    console.log(baseInfo.value.index);
    console.log(baseInfo.value.isStar);
    baseInfo.value.isStar = !baseInfo.value.isStar;
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="less" scoped>
@import 'index.less';

.template-wrapper {
  width: 100%;
}

.tab-space {
  width: 100%;
  margin-top: 20px;
}

.operation {
  height: var(--td-comp-size-xxl);
  padding-right: 16px;
  line-height: var(--td-comp-size-xxl);
}

.card-operation {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--td-comp-margin-xxl);
  padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-xl);
}
</style>
