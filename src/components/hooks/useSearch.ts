import { useMemo } from "react";
import { IPost, IUser } from "../../types";

export const useSearch = (array: any, query: string) => {
  const searchedData = useMemo(() => {
    return array.filter((item: IUser | IPost) =>
      item.name.toLowerCase().includes(query)
    );
  }, [query]);

  return searchedData;
};
