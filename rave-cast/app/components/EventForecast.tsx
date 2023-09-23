import React from "react";
import { Card, CardContent } from "ui-neumorphism";

interface EventForecastProps {
    weatherData: any;
}

const EventForecast = ({ weatherData }) => {
    console.log(weatherData);

    const totalElements = weatherData?.forecast?.forecastday?.length || 0;
    let widthClass = "w-1/4"; // default

    if (totalElements <= 10 && totalElements > 8) {
        widthClass = "md:w-1/6";
    } else if (totalElements <= 8 && totalElements > 6) {
        widthClass = "md:w-1/5";
    } else if (totalElements <= 6) {
        widthClass = "md:w-1/4";
    }

    return (
        <div className="flex flex-row flex-wrap justify-center mt-20 gap-10">
            {weatherData &&
            weatherData.forecast &&
            weatherData.forecast.forecastday
                ? weatherData.forecast.forecastday.map((dayData, index) => (
                      <Card
                          elevation={3}
                          key={index}
                          className={`day-forecast mb-5 w-full ${widthClass}`}
                      >
                          <CardContent className={"flex flex-col items-center"}>
                              <Card
                                  inset
                                  className={"rounded-full w-32 h-32 m-3"}
                              >
                                  <CardContent
                                      className={
                                          "flex items-center rounded-full"
                                      }
                                  >
                                      <Card className={"rounded-full"}>
                                          <CardContent>
                                              <img
                                                  src={
                                                      dayData.day.condition.icon
                                                  }
                                                  alt={
                                                      dayData.day.condition.text
                                                  }
                                              />
                                          </CardContent>
                                      </Card>
                                  </CardContent>
                              </Card>

                              <h3>{dayData.date}</h3>
                              <p>{dayData.day.condition.text}</p>
                              <p>Max Temp: {dayData.day.maxtemp_c}°C</p>
                              <p>Min Temp: {dayData.day.mintemp_c}°C</p>
                              <p>UV Index: {dayData.day.uv}</p>
                          </CardContent>
                      </Card>
                  ))
                : null}
        </div>
    );
};

export default EventForecast;
