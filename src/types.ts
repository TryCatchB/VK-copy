import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IUser {
  id: string;
  avatar: string;
  name: string;
  birthday?: string;
  city?: string;
  language?: string;
  isInNetwork?: boolean;
}

export interface IPost {
  id: string;
  avatar: string;
  name: string;
  birthday?: string;
  city?: string;
  language?: string;
  createdAt: string;
  content: string;
  images?: string[];
}

export interface IMessage {
  user: IUser;
  message: string;
}

export interface IMenuItem {
  title: string;
  link: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
}

export interface IError {
  message: string | undefined;
}

export interface IUseSearchProps extends IUser, IPost {}
