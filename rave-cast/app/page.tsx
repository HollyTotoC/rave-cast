"use client";
import React, { useState } from "react";
import axios from "axios";

import "./globals.css";

import Input from "./components/Input";
import Info from "./components/Info";
import EventForecast from "./components/EventForecast";

function Home() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [eventName, setEventName] = useState("");
    const [error, setError] = useState("");
    const [showList, setShowList] = useState(false);

    // const weatherApiKey = "537ed0987d034041bd0144755232209";
    // const urlWeather = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=yes&alerts=yes`;
    // const urlEvent = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-openagenda&q=${eventName}`;

    // console.log(weatherApiKey);

    const handleSearch = async (e) => {
        e.preventDefault();
        const searchUrl = `/api/searchEvent/route?q=${eventName}`;
        try {
            const response = await axios.get(searchUrl);
            const responseData = response.data;

            // Extract 'title_fr' titles from each record
            const titles = responseData.map((record) => record.title_fr);

            // Now, 'titles' is an array containing all 'title_fr' titles
            setData(titles);
            setShowList(true);
            setError("");
        } catch (err) {
            setError("Veuillez entrer un événement valide");
            setData([]);
            setShowList(false);
        }
    };

    let content;
    let base = <Info />;

    if (Object.keys(data).length === 0 && error === "") {
        content = base;
    } else if (error !== "") {
        content = (
            <>
                <div className="mt-3">
                    <h3>Oups...</h3>
                    <p>Une erreur s'est produite. Veuillez réessayer.</p>
                </div>
                {base}
            </>
        );
    } else {
        content = <EventForecast data={data} />;
    }

    return (
        <div className=" bg-neutral-200 bg-cover">
            <div className=" flex flex-col justify-center h-full md:h-screen">
                {/* Input */}
                <div className="flex flex-col items-center justify-center text-center p-12 text-black">
                    <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br to-lime-600 from-lime-400">
                        Rave Cast
                    </h1>
                    <h2 className="font-semibold text-neutral-600 text-2xl mb-10">
                        Votre météo pour chaque événement !
                    </h2>
                    <Input
                        handleSearch={handleSearch}
                        setEventName={setEventName}
                        eventName={eventName}
                        setShowList={setShowList}
                        showList={showList}
                        data={data}
                    />
                    {content}
                    {data.current ? <div>{data.current.temp_c}</div> : null}
                </div>
            </div>
        </div>
    );
}

export default Home;
