const axios = require('axios');
const cache = require('../cache');

const BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

async function getEarthquakes(req, res) {
    const {startTime, endTime} = req.query;
    const cacheKey = `quakes_${startTime || 'default'}_${endTime || 'default'}`;

    if (cache.has(cacheKey)){
        return res.json({source: 'cache', data: cache.get(cacheKey)});
    }

    try{
        const url = `${BASE_URL}${startTime ? `&starttime=${startTime}`: ''}${endTime ? `&endtime=${endTime}`: ''}`;
        const response = await axios.get(url);
        cache.set(cacheKey, response.data);
        res.json({source: 'api', data: response.data});
    } catch(error){
        res.status(500).json({error: 'Failed to fetch earthquake data.'});
    }
}

async function getEarthquakeById(req, res){
    const {id} = req.params;
    const cacheKey = `quake_${id}`;

    if (cache.has(cacheKey)) {
        return res.json({source: 'cache', data: cache.get(cacheKey)});
    }

    try{
        const url = `${BASE_URL}&eventid=${id}`;
        const response = await axios.get(url);
        cache.set(cacheKey, response.data);
        res.json({source: 'api', data: response.data});
    } catch(error){
        res.status(500).json({error: 'Failed to fetch earthquake by ID.'});
    }
}

module.exports = {
    getEarthquakes,
    getEarthquakeById
};