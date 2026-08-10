import { Fragment, useState } from "react";
import { useSearchParams } from "react-router";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";

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
    <Popover className={'relative'}>
      <PopoverButton
        className="inline-flex items-center gap-x-1 p-1.5 rounded-lg bg-[#2d3348] hover:bg-[#353d55] border border-[#3d4663] transition-colors duration-150 focus:outline-none"
        aria-label="searchbar"
      >
        <FaSearch className="cursor-pointer w-6 h-6 text-slate-300" />
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute -bottom-5 left-10 z-10 w-72">
            <div className="relative max-w-screen-2xl mx-auto px-6 py-4 flex  justify-between items-center">
              <div className="relative w-full max-w-md md:m-auto mr-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>

                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={handleChange}
                  placeholder="Busca un proyecto..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-800
      placeholder:text-gray-400
      shadow-sm
      outline-none
      transition-all
      duration-200
      hover:border-gray-300
      focus:border-blue-500
      focus:ring-4
      focus:ring-blue-500/10"
                />
              </div>
            </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default SearchBar;
