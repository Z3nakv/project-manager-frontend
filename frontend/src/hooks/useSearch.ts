import { useSearchParams } from "react-router";

/* const useSearch = ( data : ProjectItemType[]) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query")?.trim() ?? "";
    
    if (!data) return { filteredItems: [] };
    const filteredItems = !query 
    ? data
    : data?.filter(item => item.projectName.toLowerCase().includes(query.toLowerCase()))
    return { filteredItems };
}

export default useSearch */

const useSearch = <T>(data: T[], selector: (item: T) => string) => {
    const [serachParams] = useSearchParams();

    const query = serachParams.get("query")?.trim().toLowerCase() ?? "";

    const filteredItems = !query
        ? data 
        : data.filter(item => 
            selector(item).toLowerCase().includes(query)
        )
        return { filteredItems };
}

export default useSearch;