import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./list";
import Layout from "../layout/Layout";

const Paths: FC = () => {
  const isAuth = true;
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((route) => {
            if (route.auth && !isAuth) {
              return false;
            }

            return (
              <Route
                path={route.path}
                key={`route ${route.path}`}
                element={<route.component />}
              />
            );
          })}
        </Routes>
      </Layout>
    </Router>
  );
};

export default Paths;
