import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const NewsInfo = ({title, date, image}) => {
    const [news, setNews] = useState(null);
    useEffect(() => {
        const getNews = async() => {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
            const json = await response.json();
            setNews(json);
        }
        getNews().catch(console.error);
    }, [title]);
    return (
        <div className="news-card">
            {news ? (
                <li key={title}>
                    <img   
                        className="images"
                        src={image}
                    />
                    <h4>{title}</h4>
                    <h5>{date}</h5>
                </li>
            ) : null}
        </div>
    )
}

export default NewsInfo;