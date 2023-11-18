import { EStatus } from "./common";
import { TFilm } from "./film";
import { TUser } from "./person";

export type TLayout = {
  _id: string;
  status: EStatus;
  name: string;
  row: number;
  column: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TSeat = {
  _id: string;
  name: string;
  type: "normal" | "vip";
  status: EStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type TRoom = {
  _id: string;
  author: TUser;
  editedBy: TUser;
  status: EStatus;
  name: string;
  content: string;
  excerpt: string;
  layout: TLayout;
  seats: TSeat[];
};

export type TShowtime = {
  _id: string;
  author: TUser;
  editedBy: TUser;
  status: EStatus;
  film: TFilm;
  room: TRoom;
  seatsBooked: TSeat[];
  price: number;
  day: Date;
  startHour: Date;
  endHour: Date;
  seatsHeld: { user: string; seats: TSeat[] }[];
  createdAt: Date;
  updatedAt: Date;
};

export type TBookingSeat = {
  idShowtime: string;
  idSeat: string;
};

export type TCancelBooking = {
  idShowtime: string;
};
