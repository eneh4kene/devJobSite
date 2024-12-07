import { createContext, useCallback, useMemo, useState } from "react";
import { useJobItemsBySearch, useSearchTextContext } from "../lib/hooks";
import { TJobItem, TSortBy } from "../lib/types";
import { JOBS_PER_PAGE } from "../constants";

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

type JobItemsContext = {
  totalNumOfJobs: number;
  sortBy: TSortBy;
  handleChangeSortBy: (newSortBy: TSortBy) => void;
  sortedAndSlicedJobItems: TJobItem[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
    const {debouncedSearchText} = useSearchTextContext()
    const { jobItems, isLoading } = useJobItemsBySearch(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<TSortBy>("relevant");

    // derived state
    const sortedJobItems = useMemo(()=>
        [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    }), [jobItems, sortBy])

    const sortedAndSlicedJobItems = useMemo(()=>
      sortedJobItems?.slice(
        (currentPage - 1) * JOBS_PER_PAGE,
        currentPage * JOBS_PER_PAGE
      ) || [], [currentPage, sortedJobItems])

    const totalNumOfJobs = jobItems?.length || 0;

    // actions
    const handleChangeSortBy = useCallback((newSortBy: TSortBy) => {
      setCurrentPage(1);
      setSortBy(newSortBy);
    }, [])

    const contextValue = useMemo(
      () => ({
        totalNumOfJobs,
        sortBy,
        handleChangeSortBy,
        sortedAndSlicedJobItems,
        isLoading,
        currentPage,
        setCurrentPage,
      }),
      [
        totalNumOfJobs,
        sortBy,
        handleChangeSortBy,
        sortedAndSlicedJobItems,
        isLoading,
        currentPage,
        setCurrentPage,
      ]
    );
  return (
    <JobItemsContext.Provider value={ contextValue }>
      {children}
    </JobItemsContext.Provider>
  );
}
