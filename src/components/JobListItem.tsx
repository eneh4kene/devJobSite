import { useActiveIdContext } from "../lib/hooks";
import { TJobItem } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";

type JobListItemProp = {
  jobItem: TJobItem
}
export default function JobListItem({jobItem}: JobListItemProp) {
  const { activeId } = useActiveIdContext()
  return (
    <li className={`job-item ${jobItem.id === activeId ? "job-item--active" : ""}`}>
      <a href={`#${jobItem.id}`} className="job-item__link">
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon id={jobItem.id}/>
          <time className="job-item__time">{jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
