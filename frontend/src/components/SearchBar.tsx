import { useState } from "react";
import { useSearchParams } from "react-router";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      searchParams.set("query", value);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
  };
  return (
    <div className="relative w-full max-w-md m-auto">
      <span
        className="
      absolute
      left-3
      top-1/2
      -translate-y-1/2
      text-gray-400
    "
      >
        🔍
      </span>

      <input
        id="search"
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Busca un proyecto..."
        className="
      h-11
      w-full
      rounded-xl
      border
      border-gray-200
      bg-white

      pl-10
      pr-4

      text-sm
      text-gray-800
      placeholder:text-gray-400

      shadow-sm

      outline-none

      transition-all
      duration-200

      hover:border-gray-300

      focus:border-blue-500
      focus:ring-4
      focus:ring-blue-500/10
    "
      />
    </div>
  );
};

export default SearchBar;
