import { useState } from "react";

export const useQuery = () => {
  const [query, setQuery] = useState<string | null>(null);

  return { query, setQuery };
};
