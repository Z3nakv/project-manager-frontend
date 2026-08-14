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
  const isDashboard = location.pathname === '/dashboard';
  const isProjectDetails = /^\/projects\/[^/]+$/.test(location.pathname);

  if (!isDashboard && !isProjectDetails) return null;
  return (
    <Popover className={'relative'}>
      
      <PopoverButton
        className="text-text-muted cursor-pointer  inline-flex items-center gap-x-1 rounded-lg hover:text-primary hover:-translate-y-1 transition-transform duration-150"
        aria-label="searchbar"
      >
        <FaSearch className="cursor-pointer w-6 h-6" />
        <p className="font-mono hidden lg:block">Buscar</p>
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  🔍
                </span>

                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={handleChange}
                  placeholder="Busca un proyecto..."
                  className="h-11 w-full rounded-xl border border-border bg-input pl-10 pr-4 text-sm text-text-primary
      placeholder:text-text-muted
      shadow-sm
      outline-none
      transition-all
      duration-200
      hover:border-border-strong
      focus:border-primary
      focus:ring-4
      focus:ring-primary/10"
                />
              </div>
            </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default SearchBar;
