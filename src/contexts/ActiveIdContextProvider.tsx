import { createContext } from "react";
import { useActiveID } from "../lib/hooks";

type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

type ActiveIdContext = {
  activeId: number | null
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(
  null
);

export default function ActiveIdContextProvider({
  children,
}: ActiveIdContextProviderProps) {
  // state for the bookmarks array
   const activeId = useActiveID()

  return (
    <ActiveIdContext.Provider
      value={{activeId}}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
