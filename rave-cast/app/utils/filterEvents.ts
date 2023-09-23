// filterEvents.js

/**
 * Filtre les événements en fonction de la date actuelle.
 * @param {Array} events - Liste des événements à filtrer.
 * @returns {Array} - Liste des événements filtrés.
 */
function filterEventsByDate(events) {
    if (!Array.isArray(events)) {
        return [];
    }

    const currentDate = new Date();

    return events.filter((event) => {
        const firstDate = new Date(event.firstdate_begin);
        const lastDate = new Date(event.lastdate_end);

        return firstDate <= currentDate && currentDate <= lastDate;
    });
}

export default filterEventsByDate;
