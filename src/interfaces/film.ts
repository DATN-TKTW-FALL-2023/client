import { EStatus, TFile } from "./common";
import { TUser } from "./person";

export type TFilm = {
  _id: string;
  author: TUser;
  editedBy: TUser;
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
