"use client";

import "./globals.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from "./components/Input";
import { faCalendarDays, faCloudSun } from "@fortawesome/free-solid-svg-icons";

function Home() {
    return (
        <div className=" bg-neutral-200 bg-cover h-screen">
            <div className=" flex flex-col justify-center h-full">
                {/* Input */}
                <div className="flex flex-col items-center justify-center text-center p-12 text-black">
                    <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br to-lime-600 from-lime-400">
                        Rave Cast
                    </h1>
                    <h2 className="font-semibold text-2xl mb-10">
                        Votre météo pour chaque événement !
                    </h2>
                    <Input />
                    <div className="flex flex-col md:flex-row items-start justify-evenly mt-20">
                        <div className="w-4/12 neuro rounded-2xl p-10">
                            <FontAwesomeIcon
                                icon={faCloudSun}
                                size="2xl"
                                className="text-3xl md:text-5xl lg:text-7xl text-lime-500 mb-5"
                            />
                            <p className="mb-4">
                                Sur Rave-Cast, découvrez la météo des événements
                                auxquels vous allez participer.
                            </p>
                            <p>
                                Que ce soit un concert en plein air, un
                                festival, un spectacle ou tout autre
                                rassemblement, assurez-vous de savoir comment
                                vous habiller et quoi emporter.
                            </p>
                        </div>
                        <div className="w-4/12 neuro rounded-2xl p-10">
                            <FontAwesomeIcon
                                icon={faCalendarDays}
                                size="2xl"
                                className="text-3xl md:text-5xl lg:text-7xl text-lime-500 mb-5"
                            />
                            <p className="mb-4">
                                Si la météo précise pour la date de l'événement
                                n'est pas encore disponible, nous vous
                                fournirons les données météorologiques des mêmes
                                dates l'année passée.
                            </p>
                            <p>
                                Avec Rave-Cast, soyez toujours prêt à profiter
                                de chaque moment, quel que soit le temps.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
