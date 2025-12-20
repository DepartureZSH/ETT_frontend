<template>
  <div>
    <step :current="0" />
    <div>
      <t-space style="width: 100%; margin-top: 20px">
        <t-tabs v-model="value" @change="onTabSwitch">
          <t-tab-panel :value="1" :label="t('templates.panel1')" :destroy-on-hide="false">
            <div style="padding: 16px">
              <div class="list-card-operation">
                <div>
                  <t-button @click="onCreate"> {{ t('timetable.create') }} </t-button>
                  <t-button @click="onUse"> {{ t('timetable.use') }} </t-button>
                </div>
                <div class="search-input">
                  <t-input v-model="searchValue" :placeholder="t('timetable.placeholder')" clearable @change="onSearch">
                    <template #suffix-icon>
                      <search-icon v-if="searchValue === ''" size="var(--td-comp-size-xxxs)" />
                    </template>
                  </t-input>
                </div>
              </div>
              <h2 style="margin-bottom: 10px">{{ t('templates.panel1') }}</h2>
              <template v-if="TemplatesPagination.total > 0 && !TemplatesDataLoading">
                <div class="list-card-items">
                  <t-row :gutter="[16, 16]">
                    <t-col
                      v-for="product in TemplatesList.slice(
                        TemplatesPagination.pageSize * (TemplatesPagination.current - 1),
                        TemplatesPagination.pageSize * TemplatesPagination.current,
                      )"
                      :key="product.index"
                      :lg="4"
                      :xs="6"
                      :xl="3"
                    >
                      <product-card
                        :id="product.index"
                        :class="product.index === TemplatesSelect ? 'list-card-item-select' : 'list-card-item'"
                        :product="product"
                        @click="OnProductClick(product.index)"
                      />
                    </t-col>
                  </t-row>
                </div>
                <div class="list-card-pagination">
                  <t-pagination
                    v-model="TemplatesPagination.current"
                    v-model:page-size="TemplatesPagination.pageSize"
                    :total="TemplatesPagination.total"
                    :page-size-options="[12, 24, 36]"
                    @page-size-change="onPageSizeChange"
                    @current-change="onCurrentChange"
                  />
                </div>
              </template>
              <div v-else-if="TemplatesDataLoading" class="list-card-loading">
                <t-loading size="large" :text="t('templates.loading')" />
              </div>
              <div v-else>
                <div class="list-card-items">
                  <t-empty />
                  <div class="list-card-pagination">
                    <t-pagination
                      v-model="TemplatesPagination.current"
                      v-model:page-size="TemplatesPagination.pageSize"
                      :total="TemplatesPagination.total"
                      :page-size-options="[12, 24, 36]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </t-tab-panel>
          <t-tab-panel :value="2" :label="t('templates.panel2')" :destroy-on-hide="false">
            <div style="padding: 16px">
              <div class="list-card-operation">
                <div>
                  <t-button @click="onCreate"> {{ t('timetable.create') }} </t-button>
                  <t-button @click="onUse"> {{ t('timetable.use') }} </t-button>
                </div>
                <div class="search-input">
                  <t-input v-model="searchValue" :placeholder="t('timetable.placeholder')" clearable @change="onSearch">
                    <template #suffix-icon>
                      <search-icon v-if="searchValue === ''" size="var(--td-comp-size-xxxs)" />
                    </template>
                  </t-input>
                </div>
              </div>
              <h2 style="margin-bottom: 10px">{{ t('templates.panel2') }}</h2>
              <template v-if="StarsPagination.total > 0 && !StarsDataLoading">
                <div class="list-card-items">
                  <t-row :gutter="[16, 16]">
                    <t-col
                      v-for="product in StarsList.slice(
                        StarsPagination.pageSize * (StarsPagination.current - 1),
                        StarsPagination.pageSize * StarsPagination.current,
                      )"
                      :key="product.index"
                      :lg="4"
                      :xs="6"
                      :xl="3"
                    >
                      <product-card
                        :class="product.index === StarsSelect ? 'list-card-item-select' : 'list-card-item'"
                        :product="product"
                        @click="OnProductClick(product.index)"
                      />
                    </t-col>
                  </t-row>
                </div>
                <div class="list-card-pagination">
                  <t-pagination
                    v-model="StarsPagination.current"
                    v-model:page-size="StarsPagination.pageSize"
                    :total="StarsPagination.total"
                    :page-size-options="[12, 24, 36]"
                    @page-size-change="onPageSizeChange"
                    @current-change="onCurrentChange"
                  />
                </div>
              </template>
              <div v-else-if="StarsDataLoading" class="list-card-loading">
                <t-loading size="large" :text="t('templates.loading')" />
              </div>
              <div v-else>
                <div class="list-card-items">
                  <t-empty />
                  <div class="list-card-pagination">
                    <t-pagination
                      v-model="StarsPagination.current"
                      v-model:page-size="StarsPagination.pageSize"
                      :total="StarsPagination.total"
                      :page-size-options="[12, 24, 36]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </t-tab-panel>
          <t-tab-panel :value="3" :label="t('templates.panel3')" :destroy-on-hide="false">
            <div style="padding: 16px">
              <div class="list-card-operation">
                <div>
                  <t-button @click="onCreate"> {{ t('timetable.create') }} </t-button>
                  <t-button @click="onUse"> {{ t('timetable.use') }} </t-button>
                </div>
                <div class="search-input">
                  <t-input v-model="searchValue" :placeholder="t('timetable.placeholder')" clearable @change="onSearch">
                    <template #suffix-icon>
                      <search-icon v-if="searchValue === ''" size="var(--td-comp-size-xxxs)" />
                    </template>
                  </t-input>
                </div>
              </div>
              <template v-if="RecommendsPagination.total > 0 && !RecommendsDataLoading">
                <div class="list-card-items">
                  <t-row :gutter="[16, 16]">
                    <t-col
                      v-for="product in RecommendsList.slice(
                        RecommendsPagination.pageSize * (RecommendsPagination.current - 1),
                        RecommendsPagination.pageSize * RecommendsPagination.current,
                      )"
                      :key="product.index"
                      :lg="4"
                      :xs="6"
                      :xl="3"
                    >
                      <product-card
                        :class="product.index === RecommendsSelect ? 'list-card-item-select' : 'list-card-item'"
                        :product="product"
                        @click="OnProductClick(product.index)"
                      />
                    </t-col>
                  </t-row>
                </div>
                <div class="list-card-pagination">
                  <t-pagination
                    v-model="RecommendsPagination.current"
                    v-model:page-size="RecommendsPagination.pageSize"
                    :total="RecommendsPagination.total"
                    :page-size-options="[12, 24, 36]"
                    @page-size-change="onPageSizeChange"
                    @current-change="onCurrentChange"
                  />
                </div>
              </template>
              <div v-else-if="RecommendsDataLoading" class="list-card-loading">
                <t-loading size="large" :text="t('templates.loading')" />
              </div>
              <div v-else>
                <div class="list-card-items">
                  <t-empty />
                  <div class="list-card-pagination">
                    <t-pagination
                      v-model="RecommendsPagination.current"
                      v-model:page-size="RecommendsPagination.pageSize"
                      :total="RecommendsPagination.total"
                      :page-size-options="[12, 24, 36]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </t-tab-panel>
        </t-tabs>
      </t-space>
    </div>
    <templates-details :detail-id="detailId" :is-hidden="hidden" />
  </div>
</template>
<script setup lang="ts">
import { SearchIcon } from 'tdesign-icons-vue-next';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getRecommends, getStars, getTemplates } from '@/api/school';
import Step from '@/components/steps/index.vue';
import ProductCard from '@/components/timetable-card/index.vue';
import { t } from '@/locales';
import TemplatesDetails from '@/pages/ETT/TimeTable/Templates/details/index.vue';

defineOptions({
  name: 'Templates',
});

const router = useRouter();
const value = ref(1);
const hidden = ref(true);

const searchValue = ref('');
const detailId = ref('');

const RecommendsPagination = ref({ current: 1, pageSize: 12, total: 0 });
const RecommendsSelect = ref(-1);
const Recommends = ref([]);
const RecommendsList = ref([]);
const RecommendsDataLoading = ref(true);

const StarsPagination = ref({ current: 1, pageSize: 12, total: 0 });
const StarsSelect = ref(-1);
const Stars = ref([]);
const StarsList = ref([]);
const StarsDataLoading = ref(true);

const TemplatesPagination = ref({ current: 1, pageSize: 12, total: 0 });
const TemplatesSelect = ref(-1);
const Templates = ref([]);
const TemplatesList = ref([]);
const TemplatesDataLoading = ref(true);

const fetchTemplatesData = async () => {
  // fetch Templates of User's
  try {
    const { list } = await getTemplates();
    Templates.value = list;
    TemplatesList.value = list;
    TemplatesPagination.value = {
      ...TemplatesPagination.value,
      total: list.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    TemplatesDataLoading.value = false;
  }
};

const fetchStarsData = async () => {
  // fetch Templates which User stared
  try {
    const { list } = await getStars();
    Stars.value = list;
    StarsList.value = list;
    StarsPagination.value = {
      ...StarsPagination.value,
      total: list.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    StarsDataLoading.value = false;
  }
};

const fetchRecommendsData = async () => {
  // fetch all Templates
  try {
    const { list } = await getRecommends();
    Recommends.value = list;
    RecommendsList.value = list;
    RecommendsPagination.value = {
      ...RecommendsPagination.value,
      total: list.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    RecommendsDataLoading.value = false;
  }
};

// When page is first loaded
onMounted(() => {
  fetchTemplatesData();
  fetchRecommendsData();
  fetchStarsData();
});

// Tab Change
const onTabSwitch = () => {
  hidden.value = true;
  TemplatesSelect.value = -1;
  StarsSelect.value = -1;
  RecommendsSelect.value = -1;
  searchValue.value = '';
};

// Page Size/Index Change
const onPageSizeChange = (size: number) => {
  if (value.value === 1) {
    TemplatesPagination.value.pageSize = size;
    TemplatesPagination.value.current = 1;
  } else if (value.value === 2) {
    StarsPagination.value.pageSize = size;
    StarsPagination.value.current = 1;
  } else if (value.value === 3) {
    RecommendsPagination.value.pageSize = size;
    RecommendsPagination.value.current = 1;
  }
};
const onCurrentChange = (current: number) => {
  if (value.value === 1) {
    TemplatesPagination.value.current = current;
  } else if (value.value === 2) {
    StarsPagination.value.current = current;
  } else if (value.value === 3) {
    RecommendsPagination.value.current = current;
  }
};

// Card Click
const OnProductClick = async (current: number) => {
  let isHidden = hidden.value;
  if (value.value === 1) {
    if (TemplatesSelect.value === current) {
      TemplatesSelect.value = -1;
      isHidden = true;
    } else {
      TemplatesSelect.value = current;
      isHidden = false;
    }
  } else if (value.value === 2) {
    if (StarsSelect.value === current) {
      StarsSelect.value = -1;
      isHidden = true;
    } else {
      StarsSelect.value = current;
      isHidden = false;
    }
  } else if (value.value === 3) {
    if (RecommendsSelect.value === current) {
      RecommendsSelect.value = -1;
      isHidden = true;
    } else {
      RecommendsSelect.value = current;
      isHidden = false;
    }
  }
  if (!isHidden) {
    detailId.value = String(current);
    console.log(detailId.value);
  }
  hidden.value = isHidden;
};

// Create
const onCreate = () => {
  // 跳转创建
  localStorage.removeItem('templates');
  router.push({ name: 'TimeTable' });
};

// Use
const onUse = () => {
  if (value.value === 1) {
    if (TemplatesSelect.value !== -1) {
      // 跳转使用
      localStorage.setItem('templates', JSON.stringify(TemplatesSelect.value));
      router.push({ name: 'TimeTable' });
    }
  } else if (value.value === 2) {
    if (StarsSelect.value !== -1) {
      // 跳转使用
      localStorage.setItem('templates', JSON.stringify(StarsSelect.value));
      router.push({ name: 'TimeTable' });
    }
  } else if (value.value === 3) {
    if (RecommendsSelect.value !== -1) {
      // 跳转使用
      localStorage.setItem('templates', JSON.stringify(RecommendsSelect.value));
      router.push({ name: 'TimeTable' });
    }
  }
};

// Search
const onSearch = () => {
  if (value.value === 1) {
    if (searchValue.value === '') {
      TemplatesList.value = Templates.value;
    } else {
      const tempList = [];
      for (const i in Templates.value) {
        if (Templates.value[i].name.includes(searchValue.value)) {
          tempList.push(Templates.value[i]);
        } else if (Templates.value[i].description.includes(searchValue.value)) {
          tempList.push(Templates.value[i]);
        }
      }
      TemplatesList.value = tempList;
      TemplatesPagination.value = {
        ...TemplatesPagination.value,
        total: tempList.length,
      };
    }
  } else if (value.value === 2) {
    if (searchValue.value === '') {
      StarsList.value = Stars.value;
    } else {
      const starsList = [];
      for (const i in Stars.value) {
        if (Stars.value[i].name.includes(searchValue.value)) {
          starsList.push(Stars.value[i]);
        } else if (Stars.value[i].description.includes(searchValue.value)) {
          starsList.push(Stars.value[i]);
        }
      }
      StarsList.value = starsList;
      StarsPagination.value = {
        ...StarsPagination.value,
        total: starsList.length,
      };
    }
  } else if (value.value === 3) {
    if (searchValue.value === '') {
      RecommendsList.value = Recommends.value;
    } else {
      const recommendsList = [];
      for (const i in Recommends.value) {
        if (Recommends.value[i].name.includes(searchValue.value)) {
          recommendsList.push(Recommends.value[i]);
        } else if (Recommends.value[i].description.includes(searchValue.value)) {
          recommendsList.push(Recommends.value[i]);
        }
      }
      RecommendsList.value = recommendsList;
      RecommendsPagination.value = {
        ...RecommendsPagination.value,
        total: recommendsList.length,
      };
    }
  }
};
</script>
<style lang="less" scoped>
.list-card {
  height: 100%;

  &-operation {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--td-comp-margin-xxl);

    .search-input {
      width: 360px;
    }
  }

  &-item {
    padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingTB-xl);

    :deep(.t-card__header) {
      padding: 0;
    }

    :deep(.t-card__body) {
      padding: 0;
      margin-top: var(--td-comp-margin-xxl);
      margin-bottom: var(--td-comp-margin-xxl);
    }

    :deep(.t-card__footer) {
      padding: 0;
    }
  }

  &-item-select {
    border: 1.5px solid blue;

    padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingTB-xl);

    :deep(.t-card__header) {
      padding: 0;
    }

    :deep(.t-card__body) {
      padding: 0;
      margin-top: var(--td-comp-margin-xxl);
      margin-bottom: var(--td-comp-margin-xxl);
    }

    :deep(.t-card__footer) {
      padding: 0;
    }
  }

  &-pagination {
    padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingTB-xl);
  }

  &-loading {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
