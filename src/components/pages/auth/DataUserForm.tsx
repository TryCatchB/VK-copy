import { Button, TextField } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../providers/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./DataUserForm.module.css";

const DataUserForm: FC = () => {
  const { setUserInfo } = useAuth();
  const [user, setUser] = useState({ birthday: "", city: "", language: "" });
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const handleLogin = (data: any) => {
    setUser(data);

    reset();
  };

  const onClickContinue = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/auth");
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
      <TextField
        id="birthday"
        type="text"
        label="День рождения"
        variant="outlined"
        fullWidth
        sx={{ display: "block", marginBottom: 3 }}
        {...register("birthday")}
      />
      <TextField
        id="city"
        type="text"
        label="Город"
        variant="outlined"
        fullWidth
        sx={{ display: "block", marginBottom: 3 }}
        {...register("city")}
      />
      <TextField
        id="language"
        type="text"
        label="Язык"
        variant="outlined"
        fullWidth
        sx={{ display: "block", marginBottom: 3 }}
        {...register("language")}
      />
      <Button type="submit" onClick={(event) => onClickContinue(event)}>
        Продолжить
      </Button>
    </form>
  );
};

export default DataUserForm;
