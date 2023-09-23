import React from "react";

interface EventForecastProps {
    data: any;
}

const EventForecast = ({ data }) => {
    const weatherIcon = data.current ? data.current.condition.icon : null;

    return (
        <div>
            <div></div>
        </div>
    );
};

export default EventForecast;
