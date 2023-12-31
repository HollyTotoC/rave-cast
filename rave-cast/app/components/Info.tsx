import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCloudSun } from "@fortawesome/free-solid-svg-icons";

import { Card, CardContent } from "ui-neumorphism";

function Info() {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-14 md:justify-evenly mt-16 md:mt-40">
            <Card
                elevation={3}
                className="w-11/12 md:5/12 lg:w-4/12 p-10 h-full"
            >
                <CardContent>
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
                        Que ce soit un concert en plein air, un festival, un
                        spectacle ou tout autre rassemblement, assurez-vous de
                        savoir comment vous habiller et quoi emporter.
                    </p>
                </CardContent>
            </Card>
            <Card
                elevation={3}
                className="w-11/12 md:5/12 lg:w-4/12 p-10 h-full"
            >
                <CardContent>
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        size="2xl"
                        className="text-3xl md:text-5xl lg:text-7xl text-lime-500 mb-5"
                    />
                    <p className="mb-4">
                        Si la météo précise pour la date de l'événement n'est
                        pas encore disponible, nous vous fournirons les données
                        météorologiques des mêmes dates l'année passée.
                    </p>
                    <p>
                        Avec Rave-Cast, soyez toujours prêt à profiter de chaque
                        moment, quel que soit le temps.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default Info;
