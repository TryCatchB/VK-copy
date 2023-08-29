import { Dispatch, SetStateAction, useState } from "react";

interface IError {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

export const useError = () => {
  const [error, setError] = useState<IError>("");

  return [error, setError];
};
