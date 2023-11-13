import { IUser } from "./user";

export type TOrder = {
  _id: string;
  film: string;
  room: string;
  price: number;
  endHour: Date;
  startHour: Date;
  seats: string[];
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
};
