import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleVoteButton from "./ArticleVoteButton";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const ArticleDetail = ({ articleDetail }) => {
  let { id } = useParams();
  const [comments, setComments] = useState([]);
  const addComment = async (contents, parent = null) => {
    const commentFormData = {
      article: id,
      contents: contents,
      parent,
    };
    await axios
      .post(`https://therok.net/news/${id}/comments/`, commentFormData)
      .then((sentComment) => {
        if (sentComment.data["parent"]) {
          getComments();
        } else {
          setComments([...comments, sentComment.data]);
        }
      })
      .catch((error) => console.log(error));
  };
  const getComments = async () => {
    await axios
      .get(`https://therok.net/news/${id}/comments/`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="article-detail-container">
      <h1>{articleDetail.title}</h1>
      <div className="detail-author">
        <span>{articleDetail.nickname}</span>
      </div>
      <div className="detail-datetime">
        <span>입력 {articleDetail.date_posted}</span>
      </div>
      {articleDetail.image && (
        <img src={articleDetail.image} alt="articleImage" />
      )}
      <div className="detail-contents">
        <p>{articleDetail.contents}</p>
      </div>
      <ArticleVoteButton
        articleAuthor={articleDetail.author}
        articleDatePosted={articleDetail.date_posted}
        spearNum={articleDetail.num_spear}
        shieldNum={articleDetail.num_shield}
      />
      <div className="comment-container">
        {comments.map((comment) => (
          <Comments
            key={comment.id}
            comment={comment}
            replies={comment.reply}
            addComment={addComment}
          />
        ))}
      </div>
      <CommentForm handleSubmit={addComment} />
    </div>
  );
};

export default ArticleDetail;
