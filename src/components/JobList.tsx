import { TJobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProp = {
  jobItems: TJobItem[];
  isLoading: boolean
}

export function JobList({jobItems, isLoading}: JobListProp) {
  return <ul className="job-list">
    {
      isLoading && <Spinner />
    }
    {
      !isLoading && jobItems.map(jobItem => (
        <JobListItem key={jobItem.id} jobItem={jobItem}/>
      ))
    }
  </ul>;
}

export default JobList;
