const axios = require('axios')
const Captain = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {


    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;


    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';

    const requestData = {
        origin: {
            address: origin  // Example: "New York, NY"
        },
        destination: {
            address: destination  // Example: "Los Angeles, CA"
        },
        travelMode: "DRIVE", // Options: DRIVE, WALK, BICYCLE, TRANSIT
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        languageCode: "en-US",
        units: "METRIC"
    };

    try {
        const response = await axios.post(url, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration'
            }
        });

        // console.log(response.data); // Log response for debugging

        if (response.data.routes && response.data.routes.length > 0) {
            return {
                distanceMeters: response.data.routes[0].distanceMeters, 
                duration: parseInt(response.data.routes[0].duration.replace("s", ""), 10) // Converts "12345s" to 12345
            };
        } else {
            throw new Error('No routes found');
        }
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        throw new Error('Unable to fetch distance and time');
    }
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = "https://places.googleapis.com/v1/places:autocomplete";

    try {
        const response = await fetch(`${url}?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                input: input
            }),
        });

        const data = await response.json();
        return data.suggestions.map(suggestions => suggestions.placePrediction.text)

    } catch (error) {
        console.error("Google API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch place suggestions.");
    }
};


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await Captain.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}