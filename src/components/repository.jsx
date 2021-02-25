const Repository = (props) => {
  console.log(props.data);
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
      <div className="logo">
        <img src={owner.avatar_url} alt="" />
      </div>
      <div className="part1">
        <div className="">
          <a href={html_url}>
            <span className="cname">{name}</span>
          </a>
          {/* {props.data.new && <span className="new">new!</span>}
            {props.data.featured && <span className="featured">featured</span>} */}
        </div>

        <div className="description">{description}</div>

        <div className="details">
          <span>{"Stars: " + stargazers_count}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{"Issues: " + open_issues_count}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{"Submitted " + " by " + owner.login}</span>
        </div>
      </div>
    </div>
  );
};

export default Repository;
