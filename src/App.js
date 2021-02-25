import React, { useEffect, useState } from "react";

import "./App.css";
import Repository from "./components/repository";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = async (pageNumber) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${pageNumber}`
    );
    const fetchdata = await response.json();
    setData(fetchdata.items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      {isLoading ? (
        <div>isLoading</div>
      ) : (
        <div className="repos">
          {data.map((d) => {
            return <Repository key={d.id} data={d} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
