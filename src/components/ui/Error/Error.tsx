import { Alert } from "@mui/material";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface IErrorProps {
  error: string | Dispatch<SetStateAction<string>>;
}

const Error: FC<IErrorProps> = ({ error }) => {
  return (
    <>
      {error && (
        <Alert style={{ marginBottom: 20 }} severity="error">
          {error}
        </Alert>
      )}
    </>
  );
};

export default Error;
