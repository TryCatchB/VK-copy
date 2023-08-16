import { Alert, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { IUserData } from "./types";
import { useAuth } from "../../providers/useAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const { ga, user } = useAuth();

  const [isRegForm, setIsRedForm] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    password: "",
  } as IUserData);
  const [error, setError] = useState("");

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegForm) {
      try {
        await createUserWithEmailAndPassword(
          ga,
          userData.email,
          userData.password
        );
      } catch (error: any) {
        error.message && setError(error.message);
      }
      try {
        await signInWithEmailAndPassword(ga, userData.email, userData.password);
      } catch (error: any) {
        error.message && setError(error.message);
      }
    } else {
      console.log("auth");
    }
    setUserData({ email: "", password: "" });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      {error && (
        <Alert style={{ marginBottom: 20 }} severity="error">
          {error}
        </Alert>
      )}
      <Grid display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleLogin}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            sx={{ display: "block", marginBottom: 3 }}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            sx={{ display: "block", marginBottom: 3 }}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <ButtonGroup variant="outlined">
            <Button type="submit" onClick={() => setIsRedForm(false)}>
              Auth
            </Button>
            <Button type="submit" onClick={() => setIsRedForm(true)}>
              Register
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  );
};

export default Auth;
