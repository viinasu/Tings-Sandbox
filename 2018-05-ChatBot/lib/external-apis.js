const API_KEYS = require("./api-keys");
const fetch = require("node-fetch");

const getWeather = (coordinates) => {
    const url = ` https://api.darksky.net/forecast/${API_KEYS.DARK_SKY}/${coordinates.lat},${coordinates.lng}`;
    return fetch(url)
        .then(res => res.json())
        .then(json => {
            const data = json.currently;
            return { current_summary: data.summary, current_temp: data.temperature };
        });
};

const getGeocode = (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEYS.GOOGLE_MAPS}`;

    return fetch(url)
        .then(res => res.json())
        .then(json => {
            const data = json.results[0].geometry.location;
            return { lat: data.lat, lng: data.lng }
        })
};

module.exports = { getGeocode, getWeather };