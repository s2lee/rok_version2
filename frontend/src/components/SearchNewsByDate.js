import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchNewsByDate = () => {
  const { year, month, day } = useParams();
  const [politicalArticles, setPoliticalArticles] = useState([]);
  const [economicArticles, setEconomicArticles] = useState([]);
  const [socialArticles, setSocialArticles] = useState([]);
  const [worldArticles, setWorldArticles] = useState([]);
  const [cultureArticles, setCultureArticles] = useState([]);
  const [philosophyArticles, setPhilosophyArticles] = useState([]);
  const [ideologyArticles, setIdeologyArticles] = useState([]);
  const [isArticle, setIsArticle] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const getNewsDateArticle = async () => {
      await axios
        .get(`https://therok.net/news/newspaper/${year}/${month}/${day}`)
        .then((response) => {
          if (!response.data.detail) {
            setPoliticalArticles(response.data.politics);
            setEconomicArticles(response.data.economy);
            setSocialArticles(response.data.society);
            setWorldArticles(response.data.world);
            setCultureArticles(response.data.culture);
            setPhilosophyArticles(response.data.philosophy);
            setIdeologyArticles(response.data.ideology);
            setIsArticle(true);
          } else {
            alert(response.data.detail);
            history.push(`/newspaper`);
          }
        })
        .catch((error) => console.log(error));
    };
    getNewsDateArticle();
  }, [year, month, day, history]);

  return (
    <>
      {isArticle && (
        <div className="home-container">
          <div className="home-first-section">
            <div className="home-politics-section">
              {politicalArticles.map((politicalArticle, i) => {
                return (
                  <div className="politics" key={politicalArticle.id}>
                    {i === 0 && (
                      <img src={politicalArticle.image} alt="articleImage" />
                    )}
                    <h2>
                      <Link
                        to={`/${politicalArticle.category}/${politicalArticle.id}/`}
                      >
                        {politicalArticle.title}
                      </Link>
                    </h2>
                    {i === 0 && <p>{politicalArticle.contents}</p>}
                  </div>
                );
              })}
            </div>
            <div className="home-economy-section">
              {economicArticles.map((economicArticle) => {
                return (
                  <div className="economy" key={economicArticle.id}>
                    <Link
                      to={`/${economicArticle.category}/${economicArticle.id}/`}
                    >
                      {economicArticle.title}
                    </Link>
                    <p>{economicArticle.contents}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="home-second-section">
            <div className="home-society-section">
              {socialArticles.map((socialArticle) => {
                return (
                  <div className="society" key={socialArticle.id}>
                    <Link
                      to={`/${socialArticle.category}/${socialArticle.id}/`}
                    >
                      {socialArticle.title}
                    </Link>
                    <p>{socialArticle.contents}</p>
                  </div>
                );
              })}
            </div>
            <div className="home-world-section">
              {worldArticles.map((worldArticle, i) => {
                return (
                  <div className="world" key={worldArticle.id}>
                    {i === 0 && (
                      <img src={worldArticle.image} alt="articleImage" />
                    )}
                    <h2>
                      <Link
                        to={`/${worldArticle.category}/${worldArticle.id}/`}
                      >
                        {worldArticle.title}
                      </Link>
                    </h2>
                    {i === 0 && <p>{worldArticle.contents}</p>}
                  </div>
                );
              })}
            </div>
            <div className="home-culture-section">
              {cultureArticles.map((cultureArticle) => {
                return (
                  <div className="culture" key={cultureArticle.id}>
                    <img src={cultureArticle.image} alt="articleImage" />
                    <Link
                      to={`/${cultureArticle.category}/${cultureArticle.id}/`}
                    >
                      {cultureArticle.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="home-third-section">
            <div className="home-philosophy-section">
              {philosophyArticles.map((philosophyArticle) => {
                return (
                  <div className="philosophy" key={philosophyArticle.id}>
                    <Link
                      to={`/${philosophyArticle.category}/${philosophyArticle.id}/`}
                    >
                      {philosophyArticle.title}
                    </Link>
                    <p>{philosophyArticle.contents}</p>
                  </div>
                );
              })}
            </div>
            <div className="home-ideology-section">
              {ideologyArticles.map((ideologyArticle) => {
                return (
                  <div className="ideology" key={ideologyArticle.id}>
                    <img src={ideologyArticle.image} alt="articleImage" />
                    <div className="ideology-text-card">
                      <Link
                        to={`/${ideologyArticle.category}/${ideologyArticle.id}/`}
                      >
                        {ideologyArticle.title}
                      </Link>
                      <p>{ideologyArticle.contents}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchNewsByDate;
