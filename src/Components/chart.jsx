import React, { Component, useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label
  } from "recharts";
const Chart = ({articles}) => {
    const [histData, setHistData] = useState([]);
    const [today, setToday] = useState("");
    const getHistData = () => {
        const numArticles = new Array(24).fill(0);
        const histDataList = []

        for (let i = 0; i < articles.length; i++) {
            let isoString = articles[i].publishedAt;
            let UTCtime = new Date(isoString);
            let PSTtime = new Date(UTCtime.getTime() - 8*60*60*1000);
            let day = PSTtime.getDate();
            let month = PSTtime.getMonth() + 1;
            let year = PSTtime.getFullYear();
            let hour = PSTtime.getHours();
            let todayString = `Today: ${year}-${month}-${day}`;
            setToday(todayString);
            numArticles[hour]++;
        }
        for (let i = 0; i < numArticles.length; i++) {
            histDataList.push({
                "hour": i,
                "Number of Published Articles": numArticles[i],
                "publishedAt": i.toString() + ":00",
            });
        }
        
        setHistData(histDataList);
    }
    useEffect(() => {
        getHistData();
    }, []);
    console.log(histData);
    return (
        <div>
            {histData ? 
            <div>
                <h4>Latest News updated by hour on {today}</h4>
                
                    <LineChart width={1200} height={400} data={histData}>
                        <Line type="monotone" dataKey="Number of Published Articles" stroke="#8884d8"/>
                        <XAxis dataKey="publishedAt" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                
            </div> : null}
        </div>
    )
}

export default Chart;