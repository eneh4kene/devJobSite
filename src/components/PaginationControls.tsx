import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { JOBS_PER_PAGE } from "../constants";
import { useJobItemsContext } from "../lib/hooks";

export default function PaginationControls() {
  const {currentPage, setCurrentPage, totalNumOfJobs}  = useJobItemsContext()

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
  }
  };
  const handleNextPage = () => {
    if (currentPage * JOBS_PER_PAGE < totalNumOfJobs) {
      setCurrentPage(currentPage + 1);
    }

  };
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <button onClick={handlePreviousPage} className="pagination__button">
          <ArrowLeftIcon /> Page {currentPage - 1}
        </button>
      )} 
      {currentPage * JOBS_PER_PAGE < totalNumOfJobs && (
        <button onClick={handleNextPage} className="pagination__button">
          Page {currentPage + 1}
          <ArrowRightIcon />
        </button>
      )}
    </section>
  );
}
