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
import { useJobItems } from "../lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  const [jobItems, isLoading, totalNumOfJobs] = useJobItems(searchText);

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
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
