export enum FetchState {
  DEFAULT = "DEFAULT",
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export interface Friend {
  active: boolean;
  avatar: string;
  color: string;
  createdAt: string;
  email: string;
  id: number;
  updatedAt: string;
  username: string;
}
