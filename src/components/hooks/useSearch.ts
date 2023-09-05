import { useMemo } from "react";
import { IUseSearchProps } from "../../types";

export const useSearch = (array: IUseSearchProps[], query: string | null) => {
  const searchedData = useMemo(() => {
    return array.filter((item: IUseSearchProps) =>
      item.name.toLowerCase().includes(query ?? "")
    );
  }, [array, query]);

  return searchedData;
};
