import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleSection from "../components/ArticleSection";

const ArticleSectionPage = () => {
  const [articleSectionData, setArticleSectionData] = useState([]);
  const [topArticleSectionData, setTopArticleSectionData] = useState([]);
  let { category } = useParams();

  useEffect(() => {
    const getArticleSection = async () => {
      const response = await axios.get(`https://therok.net/news/${category}/`);
      setArticleSectionData(response.data.articles);
      setTopArticleSectionData(response.data.top_articles);
    };
    getArticleSection();
  }, [category]);

  return (
    <>
      <ArticleSection
        articleSectionData={articleSectionData}
        topArticleSectionData={topArticleSectionData}
        category={category}
      />
    </>
  );
};

export default ArticleSectionPage;
