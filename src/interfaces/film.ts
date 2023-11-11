import { IUser } from "./user";
import { EStatus, TFile } from "./common";

export type TFilm = {
  _id: string;
  author: IUser;
  editedBy: IUser;
  status: EStatus;
  name: string;
  slug: string;
  director: string;
  actor: string;
  duration: number;
  content: string;
  excerpt: string;
  thumbnail: TFile;
  trailer: TFile;
  trailerUrl: string;
  taxonomies: any;
  dayShowing: string[];
  scheduleAt: Date;
  nameSort: string;
  createdAt: Date;
  updatedAt: Date;
};
