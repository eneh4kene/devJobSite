import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListWrapper() {
  const {sortedAndSlicedJobItems, isLoading} = useJobItemsContext()
  return <JobList jobItems={sortedAndSlicedJobItems} isLoading={isLoading} />;

}
