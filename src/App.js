import { useState } from "react";
import "./App.css";
import CommentCard from "./components/CommentCard";
import DeleteModal from "./components/DeleteModal";
import NewComment from "./components/NewComment";
import JSONData from "./data";
function App() {
  const [data, setData] = useState(JSONData);

  const [deleteComment, setDeleteComment] = useState(false);
  const updateScore = (id, change) => {
    let temp = data;
    for (let comment of temp.comments) {
      if (comment.id === id) {
        comment.score += change;
        break;
      } else {
        if (comment?.replies?.length > 0) {
          findCommentToVote(comment.replies, id, change);
        }
      }
    }
    setData({ ...temp });
  };
  const findCommentToVote = (replies, id, change) => {
    for (let reply of replies) {
      if (reply.id === id) {
        reply.score += change;
        break;
      } else {
        if (reply?.replies?.length > 0) {
          findCommentToVote(reply, reply.replies, id, change);
        }
      }
    }
  };
  const findCommentToDelete = (parent, replies, id) => {
    let temp = parent;
    for (let reply of replies) {
      if (reply.id === id) {
        temp.replies = temp.replies.filter(
          (filComment) => filComment.id !== id
        );
        break;
      } else {
        if (reply?.replies?.length > 0) {
          findCommentToDelete(reply, reply.replies, id);
        }
      }
    }
  };
  const deleteOneComment = (id) => {
    let temp = data;
    for (let comment of temp.comments) {
      if (comment.id === id) {
        temp.comments = temp.comments.filter(
          (filComment) => filComment.id !== id
        );
        break;
      } else {
        if (comment?.replies?.length > 0) {
          findCommentToDelete(comment, comment.replies, id);
        }
      }
    }
    setData({ ...temp });
  };
  const findCommentToReply = (parent, replies, id, content, replyingToUser) => {
    let temp = parent;
    if (!temp.replies) temp.replies = [];
    for (let reply of replies) {
      if (reply.id === id) {
        temp.replies.push({
          id: Math.random(),
          content,
          createdAt: Date.now(),
          score: 0,
          replyingTo: replyingToUser,
          user: { ...data.currentUser },
        });
        break;
      } else {
        if (reply?.replies?.length > 0) {
          findCommentToReply(reply, reply.replies, id, content);
        }
      }
    }
  };
  const newReplyTo = (id, replyingToUser, content) => {
    let temp = data;
    for (let comment of temp.comments) {
      // Comment replies array exists
      if (comment.id === id) {
        comment.replies = [
          ...comment.replies,
          {
            id: Math.random(),
            content,
            createdAt: Date.now(),
            score: 0,
            replyingTo: replyingToUser,
            user: { ...data.currentUser },
          },
        ];
        break;
      } else {
        findCommentToReply(
          comment,
          comment.replies,
          id,
          content,
          replyingToUser
        );
      }
    }
    setData({ ...temp });
  };
  const updateComment = (id, content) => {
    let temp = data;
    for (let comment of temp.comments) {
      if (comment.id === id) {
        comment.content = content;
        break;
      } else {
        if (comment?.replies?.length > 0) {
          findCommentToUpdate(comment.replies, id, content);
        }
      }
    }
    setData({ ...temp });
  };
  const findCommentToUpdate = (replies, id, content) => {
    for (let reply of replies) {
      if (reply.id === id) {
        reply.content = content;
        break;
      } else {
        if (reply?.replies?.length > 0) {
          findCommentToVote(reply, reply.replies, id, content);
        }
      }
    }
  };
  const newComment = (content) => {
    let temp = data;
    temp.comments.push({
      id: Math.random(),
      content,
      createdAt: Date.now(),
      replies: [],
      score: 0,
      user: { ...data.currentUser },
    });
    setData({ ...temp });
  };

  const timeSince = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  return (
    <div className="App">
      {deleteComment && (
        <DeleteModal
          setDeleteComment={setDeleteComment}
          deleteComment={deleteComment}
          deleteOneComment={deleteOneComment}
        />
      )}
      <div className="comments">
        {data.comments
          .sort((a, b) => {
            if (a.score > b.score) return -1;
            if (a.score < b.score) return 1;
            return 0;
          })
          .map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUser={data.currentUser}
              updateScore={updateScore}
              updateComment={updateComment}
              newReplyTo={newReplyTo}
              setDeleteComment={setDeleteComment}
              timeSince={timeSince}
            />
          ))}
      </div>
      <div className="newCommentBox">
        <NewComment image={data.currentUser.image} newComment={newComment} />
      </div>
    </div>
  );
}

export default App;
