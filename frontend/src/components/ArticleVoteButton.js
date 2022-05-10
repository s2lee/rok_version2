import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const ArticleVoteButton = ({
  articleAuthor,
  articleDatePosted,
  spearNum,
  shieldNum,
}) => {
  let { id } = useParams();
  let { user } = useContext(AuthContext);
  const [spearCount, setSpearCount] = useState(spearNum);
  const [shieldCount, setShieldCount] = useState(shieldNum);
  let history = useHistory();

  const getToday = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (1 + today.getMonth())).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    return year + "." + month + "." + day;
  };

  const voteButton = (choice) => {
    if (user) {
      if (user.pk !== articleAuthor) {
        if (articleDatePosted.toString().slice(0, 10) === getToday()) {
          axios
            .post(`https://therok.net/news/${id}/vote/${choice}/`)
            .then((response) => {
              if (choice === "spear") {
                setSpearCount(response.data.total_choice_count);
              } else {
                setShieldCount(response.data.total_choice_count);
              }
            })
            .catch((error) => {
              alert(error.response.data.detail);
            });
        } else {
          alert("기사에 대한 투표시간이 지났습니다.");
        }
      } else {
        alert("기사 작성자는 사용할 수 없습니다.");
      }
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    setSpearCount(spearNum);
    setShieldCount(shieldNum);
  }, [spearNum, shieldNum]);

  return (
    <div className="vote-container">
      <div>
        <span>{spearCount} </span>
        <button onClick={(e) => voteButton("spear")} className="vote-btn">
          <i className="fas fa-arrow-up up"></i>{" "}
        </button>
      </div>
      <div>
        <span>{shieldCount} </span>
        <button onClick={(e) => voteButton("shield")} className="vote-btn">
          <i className="fas fa-arrow-down down"></i>
        </button>
      </div>
    </div>
  );
};

export default ArticleVoteButton;
