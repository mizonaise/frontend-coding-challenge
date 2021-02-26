import TimeAgo from 'timeago-react'; 
import { changeFormat } from "../utils/changeFormat";

const RepoCard = (props) => {
  const {
    name,
    owner,
    description,
    stargazers_count,
    html_url,
    open_issues_count,
    created_at,
  } = props.data;

  return (
    <div className="repo-container">
      <div className="avatar">
        <img src={owner.avatar_url} alt="Avatar" />
      </div>
      <div className="repo-content">
        <div className="">
          <a href={html_url}>
            <span className="repo-name">{name}</span>
          </a>
        </div>

        <div className="description">{description}</div>

        <div className="details">
          <span className="star-issue">
            {"Stars: " + changeFormat(stargazers_count)}
          </span>
          <span className="star-issue">
            {"Issues: " + changeFormat(open_issues_count)}
          </span>
          <span>{"Submitted "}</span>
          <TimeAgo datetime={created_at} locale="en_EN" />
          <span>{" by "}</span>
          <a href={owner.html_url}>
            <span className="owner-name">{owner.login}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
