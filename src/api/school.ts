import type { CardListResult, ListResult } from '@/api/model/listModel';
import type { Lesson, Timetable, TimetableDetail } from '@/api/model/schoolModel';
import { request } from '@/utils/request';

const Api = {
  TemplatesList: '/get-my-templates',
  StarsList: '/get-stars',
  RecommendsList: '/get-recommended-templates',
  Details: '/get-details',
  Template: '/get-template',
  Classes: '/get-classes',
};

export function getTemplates() {
  return request.get<ListResult>({
    url: Api.TemplatesList,
  });
}

export function getStars() {
  return request.get<ListResult>({
    url: Api.StarsList,
  });
}

export function getRecommends() {
  return request.get<CardListResult>({
    url: Api.RecommendsList,
  });
}

export function getDetails(id: string) {
  return request.get<TimetableDetail>({
    url: `${Api.Details}/${id}`,
  });
}

export function getTable(id: string) {
  return request.get<Timetable>({
    url: `${Api.Template}/${id}`,
  });
}

export function getClasses() {
  return request.get({
    url: Api.Classes,
  });
}
