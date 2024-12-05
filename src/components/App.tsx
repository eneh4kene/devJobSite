import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import PaginationControls from "./PaginationControls";
import JobList from "./JobList";
import SortingControls from "./SortingControls";
import ResultsCount from "./ResultsCount";
import SidebarTop from "./SidebarTop";
import HeaderTop from "./HeaderTop";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { useDebounce, useJobItemsBySearch } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { JOBS_PER_PAGE } from "../constants";
import { TSortBy } from "../lib/types";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250)
  const { jobItems, isLoading } = useJobItemsBySearch(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<TSortBy>("relevant")

  // derived state
  const sortedJobItems = [...(jobItems || [])].sort((a,b)=>{
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore
    }else {
      return a.daysAgo - b.daysAgo
    }
  })
  
  const sortedAndSlicedJobItems = sortedJobItems?.slice((currentPage -1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE) || [];
  const totalNumOfJobs = jobItems?.length || 0;

  // actions
  const handleChangeSortBy = (newSortBy: TSortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
          <SearchForm searchText={searchText} setSearchText={setSearchText} />
        </HeaderTop>
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumOfJobs={totalNumOfJobs} />
            <SortingControls sortBy={sortBy} onClick={handleChangeSortBy}/>
          </SidebarTop>
          <JobList jobItems={sortedAndSlicedJobItems} isLoading={isLoading} />
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalNumOfJobs={totalNumOfJobs}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
