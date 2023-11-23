import { TUser } from "./person";

export type TOrder = {
  _id: string;
  film: string;
  room: string;
  price: number;
  endHour: Date;
  startHour: Date;
  day: Date;
  seats: string[];
  createdAt: Date;
  updatedAt: Date;
  user: TUser;
};
