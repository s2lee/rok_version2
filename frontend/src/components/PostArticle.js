import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const PostArticle = () => {
  const { category } = useParams();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState(null);
  let history = useHistory();

  const postArticle = async (event) => {
    event.preventDefault();
    let articleFormData = new FormData();
    articleFormData.append("title", title);
    articleFormData.append("contents", contents);
    if (image !== null) {
      articleFormData.append("image", image);
    }
    await axios
      .post(`https://therok.net/news/${category}/`, articleFormData)
      .then((response) => {
        history.push(`/${category}/`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="post-article-container">
      <form onSubmit={postArticle} className="article-post-form-container">
        <div className="article-input-box">
          <input
            type="text"
            value={title}
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
            maxLength="43"
            className="input"
          />
        </div>
        <div className="input-box">
          <textarea
            type="text"
            value={contents}
            placeholder="내용"
            onChange={(e) => setContents(e.target.value)}
            className="textarea"
          />
        </div>
        <div className="input-box">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="input"
          />
        </div>
        <div className="button-box">
          <button type="submit" className="btn btn-primary">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostArticle;
