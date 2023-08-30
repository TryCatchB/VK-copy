import { Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { IUserData } from "./types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";
import { useError } from "../../hooks/useError";
import Error from "../../ui/Error/Error";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const initialValue = {
  email: "",
  password: "",
  name: "",
};

type FormData = {
  name: string;
  email: string;
};

const Auth: FC = () => {
  const { ga, user } = useAuth();
  const [isRegForm, setIsRedForm] = useState(false);
  const { error, setError } = useError();
  const { register, handleSubmit, reset } = useForm();

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    if (isRegForm) {
      try {
        const response = await createUserWithEmailAndPassword(
          ga,
          data.email,
          data.password
        );

        await updateProfile(response.user, { displayName: data.name });
      } catch (error: any) {
        setError(error);
      }
    } else {
      try {
        await signInWithEmailAndPassword(ga, data.email, data.password);
      } catch (error: any) {
        setError(error);
      }
    }

    reset();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Error message={error?.message} />
      <Grid display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            type="text"
            label="Name"
            variant="outlined"
            sx={{ display: "block", marginBottom: 3 }}
            {...register("Name")}
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            sx={{ display: "block", marginBottom: 3 }}
            {...register("email")}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            sx={{ display: "block", marginBottom: 3 }}
            {...register("password")}
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
