import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CommentForm = ({ handleSubmit, initialContents = "" }) => {
  let { user } = useContext(AuthContext);
  const [contents, setContents] = useState(initialContents);
  const isTextareaDisabled = contents.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(contents);
    setContents("");
  };

  return (
    <div className="comment-form-container">
      {user ? (
        <form onSubmit={onSubmit}>
          <textarea
            placeholder="배려와 책임의 의사소통을 보여주세요."
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="comment-textarea"
          />
          <div className="button-box">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isTextareaDisabled}
            >
              등록
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-login">
          <Link to="/login">댓글을 작성 하시려면 로그인 해주세요.</Link>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
