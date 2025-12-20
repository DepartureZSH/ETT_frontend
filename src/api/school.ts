import type { CardListResult, ListResult } from '@/api/model/listModel';
import type { Lesson, Room, Staff, Student, Timetable, TimetableDetail } from '@/api/model/schoolModel';
import { request } from '@/utils/request';

const Api = {
  TemplatesList: '/school/get-my-templates',
  StarsList: '/school/get-stars',
  RecommendsList: '/school/get-recommended-templates',
  Details: '/school/get-details',
  Template: '/school/get-template',
  Rooms: '/school/get-rooms',
  Staff: '/school/get-staffs',
  Student: '/school/get-students',
  Classes: '/school/get-lessons',
};

export function getTemplates() {
  return request.get<ListResult | any>({
    url: Api.TemplatesList,
  });
}

export function getStars() {
  return request.get<ListResult | any>({
    url: Api.StarsList,
  });
}

export function getRecommends() {
  return request.get<CardListResult | any>({
    url: Api.RecommendsList,
  });
}

export function getDetails(id: string) {
  return request.get<TimetableDetail | any>({
    url: `${Api.Details}/${id}`,
  });
}

export function getTable(id: string) {
  return request.get<Timetable | any>({
    url: `${Api.Template}/${id}`,
  });
}

export function getRooms() {
  return request.get<Room[] | any>({
    url: Api.Rooms,
  });
}

export function getStaff() {
  return request.get<Staff[] | any>({
    url: Api.Staff,
  });
}

export function getStudent() {
  return request.get<Student[] | any>({
    url: Api.Student,
  });
}

export function getClasses() {
  return request.get<Lesson[] | any>({
    url: Api.Classes,
  });
}
