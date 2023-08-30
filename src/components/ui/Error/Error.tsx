import { Alert } from "@mui/material";
import { FC } from "react";
import { IError } from "../../../types";

const Error: FC<IError> = ({ message }) => {
  return (
    <>
      {message && (
        <Alert style={{ marginBottom: 20 }} severity="error">
          {message}
        </Alert>
      )}
    </>
  );
};

export default Error;
