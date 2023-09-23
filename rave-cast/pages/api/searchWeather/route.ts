import axios from "axios";

export default async function GET(req, res) {
    const location = req.query.location;
    const firstDayEvent = new Date(req.query.firstDay); // Convertissez en objet Date
    const lastDayEvent = new Date(req.query.lastDay); // Convertissez en objet Date

    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const urlWeather = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=10&aqi=yes&alerts=yes`;

    try {
        const response = await axios.get(urlWeather);
        const weatherData = response.data;

        // Filtrez les jours de la météo en fonction des dates de l'événement
        const filteredForecast = weatherData.forecast.forecastday.filter(
            (day) => {
                const dayDate = new Date(day.date);
                return dayDate >= firstDayEvent && dayDate <= lastDayEvent;
            }
        );

        // Si aucun jour ne correspond à la plage de dates de l'événement, renvoyez false
        if (filteredForecast.length === 0) {
            res.status(200).json(false);
            return;
        }

        // Sinon, mettez à jour la météo filtrée et renvoyez-la
        weatherData.forecast.forecastday = filteredForecast;
        res.status(200).json(weatherData);
    } catch (error) {
        console.log("api searchWeather", error);
        res.status(500).json({ error: "Erreur lors de la recherche" });
    }
}
