export type TUser = {
  _id?: string;
  username?: string;
  email?: string;
  phone?: string;
  lastName?: string;
  firstName?: string;
  isActive?: boolean;
  avatar: string | null;
  roles: Array<{
    _id: string;
    code: string;
  }>;
  devices: any[];
  allowNotification: boolean;
  createdAt: string;
  updatedAt: string;
};
