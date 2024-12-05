import { createContext } from "react"
import { useLocalStorage } from "../lib/hooks";

type BookmarkIdsContextProviderProps = {
    children: React.ReactNode
}

type BookmarkIdsContext = {
  bookmarkIds: number[];
  handleToggleBookmarks: (id: number) => void;
};

export const BookmarkIdsContext = createContext<BookmarkIdsContext | null>(null);

export default function BookmarkIdsContextProvider({children}: BookmarkIdsContextProviderProps) {
    // state for the bookmarks array
    const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>("bookmarkIds", []);

    const handleToggleBookmarks = (id: number) => {
        if (bookmarkIds.includes(id)) {
            setBookmarkIds(prev => prev.filter(bookmarkId => bookmarkId !== id))
        }else {
            setBookmarkIds(prev => [...prev, id])
        }
    }

  return (
    <BookmarkIdsContext.Provider value={{
        bookmarkIds,
        handleToggleBookmarks,
    }}>
        {children}
    </BookmarkIdsContext.Provider>
  )
}
