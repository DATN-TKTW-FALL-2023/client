export interface IStatusCode {
  statusCode: number;
}

export interface IMessage {
  message: string;
}

export interface ILimit {
  limit?: number;
}

export interface IPage {
  page?: number;
}

export interface IExtra<T = any> {
  [key: string]: T;
}

export type TResDataListApi<T = any, K = any> = {
  page: number;
  limit: number;
  total: number;
} & { data: T } & IExtra<K>;

export type TResApi<T = any, K = any> = IStatusCode &
  IMessage & { data: T } & IExtra<K>;

export enum EStatus {
  ACTIIVE = "active",
  INACTIVE = "inactive",
}

export type TFile = {
  _id: string;
  name: string;
  originalname: string | null;
  size: number;
  extension: string;
  mimetype: string;
  bucket: string;
  location: string;
  key: string;
  width: number | null;
  height: number | null;
  alt: string | null;
  caption: string | null;
  description: string | null;
  system: string;
};
