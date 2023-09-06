import Auth from "../pages/auth/Auth";
import DataUserForm from "../pages/auth/DataUserForm";
import Friends from "../pages/friends/Friends";
import Home from "../pages/home/Home";
import Messages from "../pages/messages/Messages";
import Profile from "../pages/profile/Profile";
import UserProfile from "../pages/profile/UserProfile";

export const routes = [
  {
    path: "/",
    component: Home,
    auth: true,
  },
  {
    path: "/profile/:id",
    component: UserProfile,
    auth: true,
  },
  {
    path: "/profile",
    component: Profile,
    auth: true,
  },
  {
    path: "/messages",
    component: Messages,
    auth: true,
  },
  {
    path: "/friends",
    component: Friends,
    auth: true,
  },
  {
    path: "/auth",
    component: Auth,
    auth: false,
  },
  {
    path: "/info",
    component: DataUserForm,
    auth: false,
  },
];
