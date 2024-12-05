import { useBookmarkIdsContext, useJobItemsByIds } from "../lib/hooks";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const {bookmarkIds}  = useBookmarkIdsContext()
  console.log(useJobItemsByIds(bookmarkIds));
  return (
    <div className="bookmarks-popover">
      {/* <JobList jobItems={} isLoading={}/> */}

    </div>
  );
}
