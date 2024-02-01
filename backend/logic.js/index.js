const axios = require('axios');
const { Crypto } = require('../database/index');


async function fetchDataAndStore() {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const tickers = response.data;
  
      //data structure of the API response is an object of tickers
      const keys = Object.keys(tickers).slice(0, 10); // Get top 10 keys

      let recordsToInsert = 10; 

      for (const key of keys) {
        if (recordsToInsert <= 0) {
            // If we've reached the limit, break out of the loop
            break;
        }

        const ticker = tickers[key];

         // Checking if data for the key already exists
        const existingData = await Crypto.findOne({ name: key });

        if (existingData) {
            console.log(`Data for ${key} already exists. Skipping insertion.`);
            continue; // Skipping this iteration and move to the next key
        }
        else{
            const cryptoData = new Crypto({
                name: key,
                last: ticker.last,
                buy: ticker.buy,
                sell: ticker.sell,
                volume: ticker.volume,
                base_unit: ticker.base_unit,
            });
        }
        
        await cryptoData.save();
        recordsToInsert--;
      }
  
      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error fetching or storing data:', error.message);
    }
  }

  module.exports=fetchDataAndStore;