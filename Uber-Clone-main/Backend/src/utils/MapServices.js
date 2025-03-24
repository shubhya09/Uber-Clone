
// import axios from 'axios'


// export const getLatLng=async (address) => {
//     const key=process.env.GOMAPS_API_KEY

//     const url='https://www.gomaps.pro/maps/api/geocode/json'
//    try {
//     const response = await axios.get(url, {
//         params: {
//           address:address,
//           key: key,  // Ensure you send your API key
//         },
//       });
//       // console.log(response.data.results[0].geometry.location)
//       if (response.status === 200 && response.data.status === "OK") {
//         const location = response.data.results[0].geometry.location;
//         return {
//             latitude: location.lat,
//             longitude: location.lng,
//         }
//       }
//      else{
//          console.log('Address not found');
//          return null
//      }
//    } catch (error) {
//     console.log(error);
//    }
// }


// export async function getSuggestion(input) {
//     const key=process.env.GOMAPS_API_KEY
//     try {
//         const response = await axios.get('https://maps.gomaps.pro/maps/api/place/queryautocomplete/json', {
//             params: {
//               input:input,
//               key: key,  // Ensure you send your API key
//             },
//           });
        
//           const suggestions=response.data.predictions.map(item=>item.description)
//         // console.log('Suggestions:', suggestions);  // Output formatted suggestions
//         return suggestions;  // Return the formatted list of suggestions
//       } catch (error) {
//         console.error('Error fetching address suggestions:', error);
//         return [];
//       }
// }

// export async function getDistanceandTime(startAddress, endAddress) {
//     const key=process.env.GOMAPS_API_KEY
//     try {
//         const response = await axios.get(
//             "https://maps.gomaps.pro/maps/api/distancematrix/json",
//             {
//               params: {
//                 origins:startAddress,
//                 destinations:endAddress,
//                 key: key, // API key
//               },
//             }
//           );
//           // console.log(response.data);
//         const data=response.data
//         return data
    
//   } catch (error) {
//     console.error('Error fetching route:', error);
//     return null;
//   }
// };
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config(); // Ensure environment variables are loaded

// const API_KEY = process.env.GOMAPS_API_KEY;

// if (!API_KEY) {
//   console.error("Error: GOMAPS_API_KEY is missing. Check your .env file.");
// }

// const BASE_URL = 'https://maps.gomaps.pro/maps/api';

// // Get Latitude and Longitude from Address
// export const getLatLng = async (address) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/geocode/json`, {
//       params: {
//         address: address,
//         key: API_KEY,
//       },
//     });

//     if (response.status === 200 && response.data.status === "OK") {
//       const location = response.data.results[0].geometry.location;
//       return {
//         latitude: location.lat,
//         longitude: location.lng,
//       };
//     } else {
//       console.error("Address not found or invalid response:", response.data);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates:", error.message);
//     return null;
//   }
// };

// // Get Address Suggestions
// export const getSuggestion = async (input) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/place/queryautocomplete/json`, {
//       params: {
//         input: input,
//         key: API_KEY,
//       },
//     });

//     if (response.status === 200 && response.data.status === "OK") {
//       return response.data.predictions.map(item => item.description);
//     } else {
//       console.error("Error fetching suggestions:", response.data);
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching address suggestions:", error.message);
//     return [];
//   }
// };

// // Get Distance and Time between Addresses
// export const getDistanceandTime = async (startAddress, endAddress) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/distancematrix/json`, {
//       params: {
//         origins: startAddress,
//         destinations: endAddress,
//         key: API_KEY,
//       },
//     });

//     if (response.status === 200 && response.data.status === "OK") {
//       return response.data.rows;
//     } else {
//       console.error("Error fetching distance and time:", response.data);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching distance and time:", error.message);
//     return null;
//   }
// };


// src/utils/MapServices.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://maps.gomaps.pro/maps/api/distancematrix/json';

export const getLatLng = async (address) => {
  try {
    const response = await axios.get(`${BASE_URL}/geocode/json`, {
      params: {
        address: address,
        key: API_KEY,
      },
    });

    if (response.status === 200 && response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      console.error("Address not found or invalid response:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
};

// Get Address Suggestions
export const getSuggestion = async (input) => {
  try {
    const response = await axios.get(`${BASE_URL}/place/queryautocomplete/json`, {
      params: {
        input: input,
        key: API_KEY,
      },
    });

    if (response.status === 200 && response.data.status === "OK") {
      return response.data.predictions.map(item => item.description);
    } else {
      console.error("Error fetching suggestions:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching address suggestions:", error.message);
    return [];
  }
};



// Function to get distance and time
export async function getDistanceandTime(origin, destination) {
    try {
        if (!origin || !destination) {
            throw new Error('Origin or destination missing');
        }

        console.log('Using API Key: ', process.env.GOMAPS_API_KEY);

        const response = await axios.get(BASE_URL, {
            params: {
                origins: origin,
                destinations: destination,
                key: process.env.GOMAPS_API_KEY
            }
        });

        if (response.data.status !== 'OK') {
            throw new Error(`API Error: ${response.data.error_message || response.data.status}`);
        }

        console.log('API Response:', JSON.stringify(response.data, null, 2));
        return response.data;

    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        throw new Error('Failed to fetch distance and time');
    }
}
