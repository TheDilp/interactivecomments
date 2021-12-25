import { useState } from "react";

export default function NewReply({
  image,
  replyingTo,
  newReplyTo,
  setNewReply,
}) {
  const [replyText, setReplyText] = useState(`@${replyingTo.user.username} `);
  return (
    <div className="newReplyContainer box">
      <div className="replyToCommentContent">
        <div className="replyToCommentImg">
          <img src={`${process.env.PUBLIC_URL}${image.png}`} alt="User" />
        </div>
        <div className="replyToCommentTextarea">
          <textarea
            placeholder="Add a comment..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </div>
        <div className="replyToCommentButton">
          <button
            className="mouse-pointer"
            onClick={() => {
              newReplyTo(
                replyingTo.id,
                replyingTo.user.username,
                replyText.replace(/@(?=)\w+/g, "")
              );
              setNewReply(false);
            }}
          >
            REPLY
          </button>
        </div>
      </div>
    </div>
  );
}
