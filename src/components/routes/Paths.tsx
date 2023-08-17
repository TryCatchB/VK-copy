import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./list";
import Layout from "../layout/Layout";
import { useAuth } from "../providers/useAuth";
import Auth from "../pages/auth/Auth";

const Paths: FC = () => {
  const { user } = useAuth();
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((route) => {
            if (route.auth && !user) {
              <Auth />;
            } else {
              return (
                <Route
                  path={route.path}
                  key={`route ${route.path}`}
                  element={<route.component />}
                />
              );
            }
          })}
        </Routes>
      </Layout>
    </Router>
  );
};

export default Paths;
