import { Dispatch, SetStateAction, useState } from "react";
import { IError } from "../../types";

interface IUseErrorProps {
  error: IError | null;
  setError: Dispatch<SetStateAction<IError | null>>;
}

export const useError = (): IUseErrorProps => {
  const [error, setError] = useState<IError | null>(null);

  return { error, setError };
};
