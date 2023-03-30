import React, { useState, useEffect } from 'react'
import './App.css'
import NewsInfo from "./Components/newsInfo"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [categorySelected, setCategorySelected] = useState('all');
  const [dateSelected, setDateSelected] = useState(new Date);
  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'technology', 'all']

  useEffect(() => {
    const searchNews = (searchInput, categorySelected, dateSelected) => {
      const filteredData = list.articles.filter(
        article => article.title.includes(searchInput)
        && article.category === categorySelected 
        );
      setFilteredResults(filteredData);
  }
    if (list !== null) searchNews(searchInput, categorySelected, dateSelected);
  }, [searchInput, categorySelected, dateSelected, list]);

  useEffect(() => {
    const fetchAllLatestNews = async() => {
      const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_KEY);
      const json = await response.json();
      setList(json);
    }
    fetchAllLatestNews().catch(console.error);
  }, [])
 
  console.log(list);
 
  return (
    <div className="whole-page">
      <div className='side-bar'>

      </div>

      <div className="search-bar">
        <div className="title-search">
          <label>Keyword: </label>
          <input
            type="text"
            placeholder="Enter keyword..."
            onChange={(inputString) => setSearchInput(inputString)}
          />
        </div>
        <div className="category-search">
            <label>Catergory: </label>
            <select id="categories" value={categorySelected} onChange={
              (checked) => setCategorySelected(checked.target.value)}>
                {categories.map((choice) => 
                (<option key={choice}>{choice}</option>))}
            </select>
        </div>
        <div className="date-search">
            <label>Date: </label>
            <DatePicker selected={dateSelected} onChange={(checked) => {
              setDateSelected(checked)}} />
        </div>
      </div>

      <div className='dashboard'>
        <h1>My Latest News</h1>
        <ul className="news-container">
          {searchInput.length > 0 
          ?
            filteredResults.map((article, index) => 
            <NewsInfo key={index}
              title={article.title}
              image={article.urlToImage}
              date={article.publishedAt} />)
          : 
            list && Object.entries(list.articles).map(([index]) => 
            <NewsInfo key={index}
              title={list.articles[index].title}
              image={list.articles[index].urlToImage}
              date={list.articles[index].publishedAt} />)}
        </ul>
      </div>

    </div>
  )
}

export default App
