import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContextProviderProps = {
  children: React.ReactNode;
};

type SearchTextContext = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearchText: string;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

export default function SearchTextContextProvider({
  children,
}: SearchTextContextProviderProps) {
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 250);

  return (
    <SearchTextContext.Provider value={{ 
        searchText,
        setSearchText,
        debouncedSearchText
     }}>
      {children}
    </SearchTextContext.Provider>
  );
}


