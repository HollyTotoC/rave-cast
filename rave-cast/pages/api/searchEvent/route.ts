import axios from "axios";

export default async function GET(req, res) {
    const query = req.query.q;

    try {
        const response = await axios.get(
            `https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-openagenda&q=${query}&rows=100`
        );
        // Extract and format the desired fields from the response
        const formattedData = response.data.records.map((record) => {
            return {
                location_city: record.fields.location_city,
                firstdate_begin: record.fields.firstdate_begin,
                lastdate_end: record.fields.lastdate_end,
                title_fr: record.fields.title_fr,
                uid: record.fields.uid,
            };
        });

        // Get the current date
        const currentDate = new Date();

        // Filter the events based on the current date
        const filteredData = formattedData.filter((event) => {
            const eventStartDate = new Date(event.firstdate_begin);
            const eventEndDate = new Date(event.lastdate_end);

            // Check if the event is ongoing or in the future
            return eventStartDate <= currentDate && eventEndDate >= currentDate;
        });

        // Return the filtered data
        res.status(200).json(filteredData);
    } catch (error) {
        console.log("api searchEvent", error);
        res.status(500).json({ error: "Erreur lors de la recherche" });
    }
}
