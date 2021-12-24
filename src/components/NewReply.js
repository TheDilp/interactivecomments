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
      <div className="newCommentContent">
        <div className="newCommentImg">
          <img src={`${process.env.PUBLIC_URL}${image.png}`} />
        </div>
        <div className="newCommentTextbox">
          <textarea
            placeholder="Add a comment..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </div>
        <div className="newCommentButton">
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
