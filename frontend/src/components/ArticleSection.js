import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ArticleSection = ({
  articleSectionData,
  topArticleSectionData,
  category,
}) => {
  let { user } = useContext(AuthContext);
  const categoryDict = {
    politics: "정치",
    economy: "경제",
    society: "사회",
    world: "국제",
    culture: "문화",
    philosophy: "철학",
    ideology: "이념",
  };
  const getCategory = categoryDict[category];
  return (
    <div className="article-section-container">
      <h1>{getCategory}</h1>
      <div className="article-section">
        <div className="article-section-flex">
          <div className="popular-articles">
            {topArticleSectionData.map((top_article) => {
              return (
                <div key={top_article.id} className="top-article">
                  <img src={top_article.image} alt="articleImage" />
                  <div className="text-card">
                    <Link to={`/${category}/${top_article.id}/`}>
                      {top_article.title}
                    </Link>
                    <p>{top_article.contents}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="latest-articles">
            <div id="latest-articles-header">
              <h3 id="new-article">최신기사</h3>
              {user && (
                <Link to={`/${category}/post`}>
                  <i className="fas fa-pencil-alt"></i>
                </Link>
              )}
            </div>
            {articleSectionData.map((article) => {
              return (
                <div key={article.id} className="latest-articles-title">
                  <h3>
                    <Link to={`/${category}/${article.id}/`}>
                      {article.title}
                    </Link>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSection;
