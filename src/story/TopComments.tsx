import React, { useState, useEffect } from "react";
import * as service from "./StoryService";
import parser from "html-react-parser";

interface Comment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
}

const TopComments = (props: any) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    props.onLoading(true);
    service.getData(20, props.data, function (data: any) {
      setComments(data);
      props.onLoading(false);
    });
  }, [props.data]);

  return (
    <>
      {comments &&
        comments.map((item) => {
          return (
            <div className="author-comment" key={item.id}>
              <b>Author: {item.by && item.by}</b>
              <div>{item.text && parser(item.text)}</div>
            </div>
          );
        })}
    </>
  );
};

export default React.memo(TopComments);
