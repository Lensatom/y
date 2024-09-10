import { IUserData } from "@/interfaces";

export interface UserState extends IUserData {
  isLoggedIn: boolean;
  update: (data:IUserData) => void
  login: (data:IUserData) => void
}