import React from "react";
import Image from "next/image";

import { Card, CardContent } from "ui-neumorphism";

interface EventInfoProps {
    selectedEvent: {
        results: {
            image: any;
            title_fr: string;
            description_fr: string;
            location_name: string;
            location_address: string;
            location_district?: string;
            location_region?: string;
            firstdate_begin: string;
            lastdate_end: string;
        }[];
    };
}

const EventInfo: React.FC<EventInfoProps> = ({ selectedEvent }) => {
    const info = selectedEvent.results[0];
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
        const year = date.getFullYear();
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} à ${hours}:${minutes}`;
    };

    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className=" mt-10 md:mt-20 p-5">
            <div className="flex flex-col md:flex-row content-center justify-center gap-10">
                <div className="">
                    <Card inset className={" p-1"}>
                        <CardContent className={"flex items-center"}>
                            <Card className={""}>
                                <CardContent
                                    className={
                                        "flex justify-center items-center overflow-hidden m-2"
                                    }
                                >
                                    <img
                                        src={info.image}
                                        alt=""
                                        className=" h-72 object-contain"
                                    />
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col w-5/12 justify-start gap-">
                    <h3 className="text-2xl">
                        {capitalizeFirstLetter(info.title_fr)}
                    </h3>
                    <p className="w-10/12 mx-auto mb-8">
                        {capitalizeFirstLetter(info.description_fr)}
                    </p>
                    <div className="flex flex-row justify-center gap-20">
                        <div className=" grow">
                            <p className="mb-1">Où ?</p>
                            <ul>
                                <li>{info.location_name}</li>
                                <li>{info.location_address}</li>
                                <li>
                                    {info.location_district
                                        ? info.location_district
                                        : info.location_region}
                                </li>
                            </ul>
                        </div>
                        <div className=" grow">
                            <p className="mb-1">Quand ?</p>
                            <ul>
                                <li>du {formatDate(info.firstdate_begin)}</li>
                                <li>au {formatDate(info.lastdate_end)}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventInfo;
