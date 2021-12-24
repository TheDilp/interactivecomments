import { useState } from "react";
import NewReply from "./NewReply";

export default function CommentCard({
  comment,
  currentUser,
  updateScore,
  setDeleteComment,
  newReplyTo,
  updateComment,
  timeSince,
}) {
  const [newReply, setNewReply] = useState(false);
  const [edit, setEdit] = useState(false);

  // Check if the current user is the creator of this comment
  const current = comment.user.username === currentUser.username;
  return (
    <div className="commentAndReplies">
      <div className="commentContainer box">
        <div className="commentVotes">
          <div
            className="voteIcon mouse-pointer"
            onClick={() => updateScore(comment.id, 1)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icon-plus.svg`}
              alt="plus"
            />
          </div>
          <div className="voteIcon score">{comment.score}</div>
          <div
            className="voteIcon mouse-pointer"
            onClick={() => updateScore(comment.id, -1)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icon-minus.svg`}
              alt="minus"
            />
          </div>
        </div>
        <div className="commentContent">
          <div className="commentHeader">
            <img
              className="commentImage user-select-none "
              src={`${process.env.PUBLIC_URL}${comment.user.image.png}`}
              alt="test"
            />
            <b className="userName">{comment.user.username} </b>
            {current ? <span className="youTag">you</span> : ""}
            {typeof comment.createdAt === "number"
              ? timeSince(comment.createdAt) + " ago"
              : comment.createdAt}

            <div className="commentButtons desktop">
              {current ? (
                <>
                  <span
                    className="deleteButton mouse-pointer"
                    onClick={() => {
                      setDeleteComment(comment);
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-delete.svg`}
                      alt="reply"
                      className="replyImg"
                    />
                    Delete
                  </span>
                  <span
                    className="replyButton  mouse-pointer"
                    onClick={() => {
                      setEdit(comment.content);
                    }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-edit.svg`}
                      alt="reply"
                      className="replyImg"
                    />
                    Edit
                  </span>{" "}
                </>
              ) : (
                <span
                  className="replyButton  mouse-pointer"
                  onClick={() => {
                    setNewReply(comment);
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-reply.svg`}
                    alt="reply"
                    className="replyImg"
                  />
                  Reply
                </span>
              )}
            </div>
          </div>
          <div className="commentText">
            {edit && (
              <div className="newCommentTextbox">
                <textarea
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                />
                <button
                  className="mouse-pointer"
                  onClick={() => {
                    updateComment(comment.id, edit);
                    setEdit(false);
                  }}
                >
                  UPDATE
                </button>
              </div>
            )}

            {!edit &&
              (comment?.replyingTo ? (
                <div>
                  <span className="replyingTo">{`@${comment.replyingTo} `}</span>
                  {`${comment.content}`}
                </div>
              ) : (
                comment.content
              ))}
          </div>
        </div>
        <div className="commentButtons mobile">
          {current ? (
            <>
              <span
                className="deleteButton mouse-pointer"
                onClick={() => {
                  setDeleteComment(comment);
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon-delete.svg`}
                  alt="reply"
                  className="replyImg"
                />
                Delete
              </span>
              <span
                className="replyButton mouse-pointer"
                onClick={() => {
                  setEdit(comment.content);
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon-edit.svg`}
                  alt="reply"
                  className="replyImg"
                />
                Edit
              </span>{" "}
            </>
          ) : (
            <span
              className="replyButton  mouse-pointer"
              onClick={() => {
                setNewReply(comment);
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-reply.svg`}
                alt="reply"
                className="replyImg"
              />
              Reply
            </span>
          )}
        </div>
      </div>
      {newReply && (
        <NewReply
          image={currentUser.image}
          replyingTo={newReply}
          newReplyTo={newReplyTo}
          setNewReply={setNewReply}
        />
      )}
      {comment?.replies?.length > 0 && (
        <div className="commentReplies">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              updateScore={updateScore}
              updateComment={updateComment}
              newReplyTo={newReplyTo}
              setDeleteComment={setDeleteComment}
              timeSince={timeSince}
            />
          ))}
        </div>
      )}
    </div>
  );
}
