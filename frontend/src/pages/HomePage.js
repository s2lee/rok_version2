import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeArticle from "../components/HomeArticle";

const HomePage = () => {
  const [politicalArticles, setPoliticalArticles] = useState([]);
  const [economicArticles, setEconomicArticles] = useState([]);
  const [socialArticles, setSocialArticles] = useState([]);
  const [worldArticles, setWorldArticles] = useState([]);
  const [cultureArticles, setCultureArticles] = useState([]);
  const [philosophyArticles, setPhilosophyArticles] = useState([]);
  const [ideologyArticles, setIdeologyArticles] = useState([]);

  useEffect(() => {
    const getHomeArticles = async () => {
      await axios
        .get("https://therok.net/news/home/")
        .then((response) => {
          setPoliticalArticles(response.data.politics);
          setEconomicArticles(response.data.economy);
          setSocialArticles(response.data.society);
          setWorldArticles(response.data.world);
          setCultureArticles(response.data.culture);
          setPhilosophyArticles(response.data.philosophy);
          setIdeologyArticles(response.data.ideology);
        })
        .catch((error) => console.log(error));
    };
    getHomeArticles();
  }, []);

  return (
    <>
      <HomeArticle
        politicalArticles={politicalArticles}
        economicArticles={economicArticles}
        socialArticles={socialArticles}
        worldArticles={worldArticles}
        cultureArticles={cultureArticles}
        philosophyArticles={philosophyArticles}
        ideologyArticles={ideologyArticles}
      />
    </>
  );
};

export default HomePage;
