import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
      );
      console.log(response);
      const fetchdata = await response.json();
      setData(fetchdata.items.splice(0, 10));
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>isLoading</div>
      ) : (
        <div className="repos">
          {data.map((d) => {
            return <Repo key={d.id} data={d} />;
          })}
        </div>
      )}
    </div>
  );
}

const Repo = (props) => {
  console.log(props.data);
  const {
    name,
    owner,
    description,
    stargazers_count,
    html_url,
    open_issues_count,
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
          <span>{stargazers_count}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{open_issues_count}</span>
          <span>&nbsp;•&nbsp;</span>
          <span>{owner.login}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
