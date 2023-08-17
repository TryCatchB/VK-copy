import { FC, ReactNode } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Grid } from "@mui/material";
import { useAuth } from "../providers/useAuth";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Grid container spacing={2} paddingX={5} marginTop={2}>
        {user && (
          <Grid item md={3}>
            <Sidebar />
          </Grid>
        )}
        <Grid item md={user ? 9 : 12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
