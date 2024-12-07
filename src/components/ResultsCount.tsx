import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const {totalNumOfJobs} = useJobItemsContext()
  return <p className="count"><span className="u-bold">{totalNumOfJobs}</span> results</p>;
}
