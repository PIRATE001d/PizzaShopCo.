import axios from 'axios';

const API_KEY = 'f060df675e8240dd9442ab95a751423a'; // Replace with your OpenCage API key

export async function getAddress({ latitude, longitude }) {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json`,
      {
        params: {
          q: `${latitude},${longitude}`,
          key: API_KEY,
          language: 'en', // Optional: Set the language to English
        },
      }
    );

    // Check if the response has results
    if (response.data.results.length > 0) {
      const addressData = response.data.results[0];
      return {
        locality: addressData.components.city || addressData.components.town,
        city: addressData.components.city || addressData.components.town,
        postcode: addressData.components.postcode,
        countryName: addressData.components.country,
      };
    } else {
      throw new Error("No address found");
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    throw new Error("Failed getting address: " + error.message);
  }
}
