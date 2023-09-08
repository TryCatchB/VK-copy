import { FC } from "react";
import Users from "./Users";
import Menu from "./Menu";
import User from "./User";

const Sidebar: FC = () => {
  return (
    <div>
      <User />
      <Users />
      <Menu />
    </div>
  );
};

export default Sidebar;
