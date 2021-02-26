import "./App.css";
import moment from "moment";
import RepoCard from "./components/repoCard";
import React, { useEffect, useState, useRef, useCallback } from "react";

function App() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = async (pageNumber) => {
    const priorDate = moment().add(-30, "d").format("YYYY-MM-DD");
    // console.log(priorDate);
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>${priorDate}&sort=stars&order=desc&page=${pageNumber}`
    );
    // console.log(response);
    if (response.status === 200) {
      const fetchdata = await response.json();
      setData((data) => [...data, ...fetchdata.items]);
      setIsLoading(false);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <div>
      {isLoading ? (
        <div className="repos">
          <div>isLoading </div>
        </div>
      ) : (
        <div className="repos">
          {data.map((d, index) => {
            return (
              <div ref={lastBookElementRef} key={index}>
                <RepoCard data={d} />
              </div>
            );
          })}
          {hasMore ? <div>Load more ... </div> : null}
        </div>
      )}
    </div>
  );
}

export default App;
