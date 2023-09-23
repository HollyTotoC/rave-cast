"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./globals.css";

import Input from "./components/Input";
import Info from "./components/Info";
import EventForecast from "./components/EventForecast";
import EventInfo from "./components/EventInfo";

function Home() {
    const [data, setData] = useState([]);
    const [weatherData, setWeatherData] = useState("");
    const [location, setLocation] = useState("");
    const [eventName, setEventName] = useState("");
    const [error, setError] = useState("");
    const [showList, setShowList] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleDynamicSearch = async (e) => {
        e.preventDefault();
        const searchUrl = `/api/searchEvent/route?q=${eventName}`;
        try {
            const response = await axios.get(searchUrl);

            // Extract 'title_fr' and 'uid' from each record
            const events = response.data.map((record) => ({
                title_fr: record.title_fr,
                uid: record.uid,
            }));

            // Now, 'events' is an array containing objects with 'title_fr' and 'uid'
            setData(events);
            setShowList(true);
            setError("");
        } catch (err) {
            setError("Veuillez entrer un événement valide");
            setData([]);
            setShowList(false);
        }
    };

    const weatherSearch = async (firstDate, lastDate) => {
        const weatherUrl = `/api/searchWeather/route?location=${location}&firstDay=${firstDate}&lastDay=${lastDate}`;
        try {
            const response = await axios.get(weatherUrl);
            setWeatherData(response.data);
            setError("");
        } catch (err) {
            setError("Erreur lors de la recherche météo");
            setWeatherData("");
        }
    };

    console.log("location", location);
    console.log("weather", weatherData);

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
        <></>;
    }

    return (
        <div className=" bg-neutral-200 bg-cover">
            <div className=" flex flex-col justify-center h-full">
                {/* Input */}
                <div className="flex flex-col items-center justify-center text-center p-12 text-black">
                    <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br to-lime-600 from-lime-400">
                        Rave Cast
                    </h1>
                    <h2 className="font-semibold text-neutral-600 text-2xl mb-10">
                        Votre météo pour chaque événement !
                    </h2>
                    <Input
                        handleDynamicSearch={handleDynamicSearch}
                        setEventName={setEventName}
                        eventName={eventName}
                        setShowList={setShowList}
                        showList={showList}
                        data={data}
                        setSelectedEvent={setSelectedEvent}
                        selectedEvent={selectedEvent}
                        setLocation={setLocation}
                        weatherSearch={weatherSearch}
                    />
                    {content}
                    {selectedEvent !== null && (
                        <>
                            <EventInfo selectedEvent={selectedEvent} />
                            <EventForecast weatherData={weatherData} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
