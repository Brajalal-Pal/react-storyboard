import React, { useState, useEffect } from "react";
import * as service from "./StoryService";
import TopComments from "./TopComments";
import ErrorComponent from "./ErrorComponent";
import "./index.css";

interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
}

const TopStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [problem, setProblem] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getAllStories(function (data: any) {
      if (!data) {
        setProblem(true);
        setLoading(false);
      } else if (data) {
        setLoading(false);
        setProblem(false);
      }
      setStories(data);
    });
  }, []);

  return (
    <div>
      {!problem && <h1 className="heading">Top 10 Stories:</h1>}
      {loading && <h1>Loading...</h1>}
      {problem && <ErrorComponent />}
      {stories.map((item) => {
        return (
          <div key={item.id}>
            <br />
            <div className="story">
              <h1>{item.title}</h1>
              <TopComments data={item.kids} onLoading={setLoading} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopStories;
