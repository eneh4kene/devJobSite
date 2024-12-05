import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkIdsContext } from "../lib/hooks";

type BookmarkIconProp = {
  id: number;
}
export default function BookmarkIcon({id}: BookmarkIconProp) {
  const { bookmarkIds, handleToggleBookmarks } = useBookmarkIdsContext()

  return (
    <button onClick={(e)=> {
      handleToggleBookmarks(id);
      e.stopPropagation();
      e.preventDefault()
      }} 
      className="bookmark-btn">
      <BookmarkFilledIcon className={`${bookmarkIds.includes(id) && 'filled'}`} />
    </button>
  );
}
