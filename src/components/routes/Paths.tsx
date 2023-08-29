import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./list";
import Layout from "../layout/Layout";
import Auth from "../pages/auth/Auth";
import { useAuth } from "../providers/useAuth";
import Loader from "../ui/Loader/Loader";

const Paths: FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                path={route.path}
                key={`route ${route.path}`}
                element={route.auth && !user ? <Auth /> : <route.component />}
              />
            );
          })}
        </Routes>
      </Layout>
    </Router>
  );
};

export default Paths;
