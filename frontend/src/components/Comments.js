import React, { useState } from "react";
import CommentForm from "./CommentForm";

const Comments = ({ comment, replies, addComment, parentId = null }) => {
  const replyId = parentId ? parentId : comment.id;
  const [state, setState] = useState(false);
  const toggle = () => {
    setState(!state);
  };

  return (
    <div key={comment.id}>
      <span className="comment-nickname">{comment.nickname}</span>{" "}
      <span className="comment-datetime">{comment.date_created}</span>
      <button onClick={toggle} className="reply-btn">
        <i className="fas fa-pencil-alt reply"></i>
      </button>
      {state && (
        <CommentForm
          handleSubmit={(contents) => addComment(contents, replyId)}
        />
      )}
      <p className="comment-contents">{comment.contents}</p>
      {replies && (
        <div className="reply-container">
          {replies.map((reply) => (
            <Comments
              comment={reply}
              key={reply.id}
              addComment={addComment}
              parentId={comment.id}
              replies={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
