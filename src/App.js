import "./App.css";
import Repository from "./components/repository";
import React, { useEffect, useState, useRef, useCallback } from "react";

function App() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = async (pageNumber) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${pageNumber}`
    );
    console.log(response);
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

  // const pageEnd = useRef();

  // useEffect(() => {
  //   if (!isLoading) {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         console.log(entries);
  //         if (entries[0].isIntersecting) {
  //           setPageNumber((prev) => prev + 1);
  //         }
  //       },
  //       { threshold: 1 }
  //     );
  //     observer.observe(pageEnd.current);
  //   }
  // }, [isLoading]);

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
    [isLoading]
  );

  return (
    <div>
      {isLoading ? (
        <div>isLoading</div>
      ) : (
        <div className="repos">
          {data.map((d, index) => {
            return (
              <div ref={lastBookElementRef} key={index}>
                <Repository data={d} />
              </div>
            );
          })}
          {hasMore ? <div>Load more ... </div> : <div> the end </div>}
        </div>
      )}
    </div>
  );
}

export default App;
