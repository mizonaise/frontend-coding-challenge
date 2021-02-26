import Moment from "react-moment";

const Repository = (props) => {
  const {
    name,
    owner,
    description,
    stargazers_count,
    html_url,
    open_issues_count,
    created_at,
  } = props.data;

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  return (
    <div className="repo-container">
      <div className="logo">
        <img src={owner.avatar_url} alt="" />
      </div>
      <div className="part1">
        <div className="">
          <a href={html_url}>
            <span className="rname">{name}</span>
          </a>
          {/* {props.data.new && <span className="new">new!</span>}
            {props.data.featured && <span className="featured">featured</span>} */}
        </div>

        <div className="description">{description}</div>

        <div className="details">
          <span>{"Stars: " + kFormatter(stargazers_count)}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{"Issues: " + kFormatter(open_issues_count)}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{"Submitted "}</span>
          {/* <TimeAgo datetime={created_at} locale="en_EN" /> */}
          <Moment fromNow>{created_at}</Moment>
          <span>{" by "}</span>
          <span className="uname">{owner.login}</span>
        </div>
      </div>
    </div>
  );
};

export default Repository;
