import axios from "axios";
import React from "react";

import debounce from "../utils/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface InputProps {
    handleDynamicSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    eventName: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    showList: boolean;
    setShowList: React.Dispatch<React.SetStateAction<boolean>>;
    data: any[];
    setSelectedEvent: React.Dispatch<React.SetStateAction<any>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({
    handleDynamicSearch,
    eventName,
    setEventName,
    showList,
    setShowList,
    data,
    setSelectedEvent,
    setLocation,
    weatherSearch,
}) => {
    const debouncedHandleSearch = debounce(handleDynamicSearch, 300); // 300ms de délai
    const handleChange = (e) => {
        e.preventDefault();
        setEventName(e.target.value);
        debouncedHandleSearch(e);
    };

    const handleItemClick = async (title, uid) => {
        setEventName(title);
        const eventExists = data.some((event) => event.title_fr === title);
        if (eventExists) {
            setShowList(false);
        }

        // Utilisation de l'UID pour effectuer un appel API et récupérer le profil complet de l'événement
        const eventProfileUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=20&refine=uid%3A${uid}`;

        try {
            const response = await axios.get(eventProfileUrl);
            const fields = response.data.results[0];
            const firstDate = fields.firstdate_begin.split("T")[0];
            const lastDate = fields.lastdate_end.split("T")[0];
            console.log("firstdate", firstDate, "lastdate", lastDate);
            setSelectedEvent(response.data); // Mise à jour de l'événement sélectionné avec les données récupérées
            setLocation(fields.location_city);
            weatherSearch(firstDate, lastDate);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération du profil de l'événement",
                error
            );
        }
    };

    return (
        <>
            <form className="flex items-center justify-center w-full relative w-11/12 md:w-7/12 ">
                <input
                    type="text"
                    value={eventName}
                    placeholder="Rechercher un événement"
                    className="w-full h-12 p-4 text-black focus:outline-none"
                    onChange={handleChange}
                />
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className=" ml-[-25px] text-lime-500 cursor-pointer"
                />
                {showList && (
                    <ul className="bg-white min-w-80 max-w-90 shadow-lg max-h-60 overflow-y-auto absolute top-full">
                        {data.map((info, index) => {
                            return (
                                <li
                                    key={index}
                                    className="border-b p-2 hover:bg-neutral-100"
                                    onClick={() =>
                                        handleItemClick(info.title_fr, info.uid)
                                    }
                                >
                                    {info.title_fr}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </form>
        </>
    );
};

export default Input;
