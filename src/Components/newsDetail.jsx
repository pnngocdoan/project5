import React, { Component, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const NewsDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    useEffect(() => {
        const getNewsDetail = async() => {
            const details = await fetch(`https://newsapi.org/v2/top-headlines?q=${params.title}&country=us&apiKey=` + API_KEY);
            const json = await details.json();
            setFullDetails(json.articles[0]);
        }
        getNewsDetail().catch(console.error);
        console.log(fullDetails);
    },[])
    return (
        <div>
            <h1>{fullDetails?.title}</h1>
            <h3>{fullDetails?.publishedAt}{" - "}{fullDetails?.source.name}</h3>
            <img className="image-newsdetail" src={`${fullDetails?.urlToImage}`} />
            <p>{fullDetails?.description}</p>
            <p> Learn more about it at: {fullDetails?.url} </p>
        </div>
    )

}

export default NewsDetail;