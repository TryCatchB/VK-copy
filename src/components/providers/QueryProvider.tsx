import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface IQueryContext {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const queryProvider = createContext<IQueryContext>({} as IQueryContext);

const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <queryProvider.Provider value={{ query, setQuery }}>
      {children}
    </queryProvider.Provider>
  );
};

export default QueryProvider;
