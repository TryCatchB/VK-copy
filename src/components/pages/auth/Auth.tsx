import { Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "../../providers/useAuth";
import { useError } from "../../hooks/useError";
import Error from "../../ui/Error/Error";

const Auth: FC = () => {
  const { ga } = useAuth();
  const [isRegForm, setIsRegForm] = useState(false);
  const { error, setError } = useError();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleAuth = async (email: string, password: string, name?: string) => {
    try {
      if (isRegForm) {
        const response = await createUserWithEmailAndPassword(
          ga,
          email,
          password
        );
        if (name) {
          await updateProfile(response.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(ga, email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(err);
    } finally {
      reset();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleAuth(data.email, data.password, data.name);
  };

  return (
    <>
      <Error message={error?.message} />
      <Grid display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            label="Имя"
            variant="outlined"
            fullWidth
            sx={{ display: "block", marginBottom: 3 }}
            {...register("name")}
          />
          <TextField
            type="email"
            label="Электронная почта"
            variant="outlined"
            fullWidth
            sx={{ display: "block", marginBottom: 3 }}
            {...register("email")}
          />
          <TextField
            type="password"
            label="Пароль"
            variant="outlined"
            fullWidth
            sx={{ display: "block", marginBottom: 3 }}
            {...register("password")}
          />
          <ButtonGroup variant="outlined">
            <Button type="submit" onClick={() => setIsRegForm(false)}>
              Авторизация
            </Button>
            <Button type="submit" onClick={() => setIsRegForm(true)}>
              Зарегистрироваться
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  );
};

export default Auth;
