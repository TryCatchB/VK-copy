import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./list";

const Paths: FC = () => {
  const isAuth = true;
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          if (route.auth && !isAuth) {
            return false;
          }

          return (
            <Route
              path={route.path}
              exact={route.exact}
              key={`route ${route.path}`}
            >
              <route.component></route.component>
            </Route>
          );
        })}
      </Routes>
    </Router>
  );
};

export default Paths;
