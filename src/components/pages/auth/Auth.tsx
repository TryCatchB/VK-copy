import { Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";
import { useError } from "../../hooks/useError";
import Error from "../../ui/Error/Error";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const Auth: FC = () => {
  const { ga } = useAuth();
  const [isRegForm, setIsRedForm] = useState(false);
  const { error, setError } = useError();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    if (isRegForm) {
      try {
        const response = await createUserWithEmailAndPassword(
          ga,
          data.email,
          data.password
        );

        await updateProfile(response.user, { displayName: data.name });
        navigate("/");
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

  return (
    <>
      <Error message={error?.message} />
      <Grid display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            id="name"
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
            <Button type="submit" onClick={() => setIsRedForm(false)}>
              Авторизация
            </Button>
            <Button type="submit" onClick={() => setIsRedForm(true)}>
              Зарегистрироваться
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </>
  );
};

export default Auth;
