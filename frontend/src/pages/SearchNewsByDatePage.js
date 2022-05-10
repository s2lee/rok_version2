import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const SearchNewsByDatePage = () => {
  const [newsDate, setNewsDate] = useState(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [isDate, setIsDate] = useState(true);
  const convertDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    setYear(year);
    setMonth(month);
    setDay(day);
    setNewsDate(date);
    setIsDate(false);
  };

  return (
    <div className="newspaper-container">
      <h2>날짜별 신문검색</h2>
      <div className="datepicker-container">
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          placeholderText="날짜를 고르세요"
          selected={newsDate}
          onChange={(date) => convertDate(date)}
          locale={ko}
          className="datepicker"
          maxDate={new Date()}
        />
      </div>

      <div className="button-box">
        <Link to={`/newspaper/${year}/${month}/${day}/`}>
          <button type="button" disabled={isDate} className="btn btn-primary">
            검색
          </button>
        </Link>
      </div>
    </div>
  );
};
export default SearchNewsByDatePage;
