import { useState } from "react";

export default function NewComment({ image, newComment }) {
  const [newContent, setNewContent] = useState("");
  return (
    <div className="newCommentContainer">
      <div className="newCommentContent">
        <div className="newCommentImg">
          <img src={`${process.env.PUBLIC_URL}${image.png}`} />
        </div>
        <div className="newCommentTextbox">
          <textarea
            placeholder="Add a comment..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </div>
        <div className="newCommentButton">
          <button
            className="mouse-pointer"
            onClick={() => {
              newComment(newContent);
              setNewContent("");
            }}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
