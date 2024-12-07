import { createPortal } from "react-dom";
import { useBookmarkIdsContext } from "../lib/hooks";
import JobList from "./JobList";
import { forwardRef } from "react";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarkIdsContext();

  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;