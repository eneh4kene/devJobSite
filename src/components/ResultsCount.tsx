type ResultsCountProp = {
  totalNumOfJobs: number;
};

export default function ResultsCount({ totalNumOfJobs }: ResultsCountProp) {
  return <p className="count"><span className="u-bold">{totalNumOfJobs}</span> results</p>;
}
