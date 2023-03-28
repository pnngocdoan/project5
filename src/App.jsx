import React, { useState, useEffect } from 'react'
import './App.css'
import NewsInfo from "./Components/newsInfo"
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const searchNews = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.articles).filter(article => Object.values(article).join("").toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredResults(filteredData);
      console.log(filteredResults);
    }
    else setFilteredResults(Object.keys(list.articles));
  }
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
        <input
          type="text"
          placeholder="Enter keyword..."
          onChange={(inputString) => searchNews(inputString.target.value)}
        />
      </div>
      <div className='dashboard'>
        <h1>My Latest News</h1>
        <ul>
          {searchInput.length > 0 
          ?
            filteredResults.map(([index]) => 
            <NewsInfo 
              title={list.articles[index].title}
              image={list.articles[index].urlToImage}
              date={list.articles[index].publishedAt} />)
          : 
            list && Object.entries(list.articles).map(([index]) => 
            <NewsInfo 
              title={list.articles[index].title}
              image={list.articles[index].urlToImage}
              date={list.articles[index].publishedAt} />)}
        </ul>
      </div>
    </div>
  )
}

export default App
