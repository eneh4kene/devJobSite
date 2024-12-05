import { TSortBy } from "../lib/types";

type SortingControlsProps = {
  sortBy: TSortBy;
  onClick: (newSortBy: TSortBy)=> void
}

export default function SortingControls({sortBy, onClick}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => onClick("relevant")}
        className={`sorting__button sorting__button--recent ${
          sortBy === "relevant" && "sorting__button--active"
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => onClick("recent")}
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" && "sorting__button--active"
        }`}
      >
        Recent
      </button>
    </section>
  );
}
