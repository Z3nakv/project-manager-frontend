import { useMemo } from "react";
import { useSearchParams } from "react-router";

const useSearch = <T>(data: T[], selector: (item: T) => string) => {
  const [serachParams] = useSearchParams();

  const query = serachParams.get("query")?.trim().toLowerCase() ?? "";

  const filteredItems = useMemo(() => {
    if (!query) return data;
    return data.filter((item) =>
      selector(item).toLowerCase().includes(query.toLowerCase()),
    );
  }, [data, query, selector]);
  return { filteredItems };
};

export default useSearch;
