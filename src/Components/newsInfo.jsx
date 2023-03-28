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
        <div>
            {news ? (
                <li className="main-list" key={title}>
                    <img   
                        className="images"
                        src={image}
                    />
                    {title}
                    <span className="tab"></span>
                    - {date}
                </li>
            ) : null}
        </div>
    )
}

export default NewsInfo;