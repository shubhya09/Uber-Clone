// import { CaptainModel } from "../models/captain-model.js";
// import { RideModel } from "../models/ride-schema.js";
// import { getDistanceandTime} from "./MapServices.js";
// import crypto from 'crypto'



// export async function calcFare(origin,destination) {

    
//     if(!origin  || !destination){
//         throw new Error('Origin or destination missing')
//     }
//     const fareDetails = {
//         car: { baseFare: 50, ratePerKm: 15 },
//         auto: { baseFare: 30, ratePerKm: 10 },
//         motorcycle: { baseFare: 20, ratePerKm: 8 }
//     };

//     const distanceTime=await getDistanceandTime(origin,destination)
    
//     if (!distanceTime || !distanceTime.rows || !distanceTime.rows[0].elements[0].distance) {
//         throw new Error('Failed to retrieve distance and time');
//     }

//     // Extract distance and duration
//     const distanceInKm = distanceTime.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
//     const durationInMins = Math.round(distanceTime.rows[0].elements[0].duration.value / 60);; // Convert seconds to minutes
        
//     const fares={}

//    for (const vehicleDetails in fareDetails) {
//    const {baseFare,ratePerKm}=fareDetails[vehicleDetails]
//    fares[vehicleDetails]=Math.round(baseFare+(ratePerKm*distanceInKm))
//    }

//    return { fares, distanceInKm, durationInMins };
// }

// export function generateOtp(num){
//     //The num is the length of otp
//     const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
//     return otp;
// }


// export const getNearbyCaptains=async function(lat,lng,radius){
//     if(!lat || !lng || !radius){
//         throw new Error('Parameters missing')
//     }
//     //Radius is in km
//     const nearbyCaptain=await CaptainModel.find({
//         location:{
//             $geoWithin:{
//                 $centerSphere:[[lat,lng],radius /6371]
//             }
//         }
//      })

//      if(!nearbyCaptain){
//         return null
//      }

//      return nearbyCaptain
// }

// export const calcFine=(fare)=>{
//     const fine = Math.round(fare * 0.1); // 10% of the fare
//     return fine;
// }

// export async function calcdeliveryFees(origin,destination) {

    
//     if(!origin  || !destination){
//         throw new Error('Origin or destination missing')
//     }
//     const fareDetails = {
//         car: { baseFare: 50, ratePerKm: 10},
//         auto: { baseFare: 30, ratePerKm: 8 },
//         motorcycle: { baseFare: 20, ratePerKm: 6 }
//     };

//     const distanceTime=await getDistanceandTime(origin,destination)
    
//     if (!distanceTime || !distanceTime.rows || !distanceTime.rows[0].elements[0].distance) {
//         throw new Error('Failed to retrieve distance and time');
//     }

//     // Extract distance and duration
//     const distanceInKm = distanceTime.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
//     const durationInMins = Math.round(distanceTime.rows[0].elements[0].duration.value / 60);; // Convert seconds to minutes
        
//     const fares={}

//    for (const vehicleDetails in fareDetails) {
//    const {baseFare,ratePerKm}=fareDetails[vehicleDetails]
//    fares[vehicleDetails]=Math.round(baseFare+(ratePerKm*distanceInKm))
//    }

//    return { fares, distanceInKm, durationInMins };
// }

// src/utils/RideServices.js
import { CaptainModel } from "../models/captain-model.js";
import crypto from 'crypto';
import { getDistanceandTime } from "./MapServices.js";

// Calculate fare for a ride
export async function calcFare(origin, destination) {
    if (!origin || !destination) {
        throw new Error('Origin or destination missing');
    }

    // Fare configuration
    const fareDetails = {
        car: { baseFare: 50, ratePerKm: 15 },
        auto: { baseFare: 30, ratePerKm: 10 },
        motorcycle: { baseFare: 20, ratePerKm: 8 }
    };

    // Get distance and time
    const distanceTime = await getDistanceandTime(origin, destination);

    // Validate response
    if (!distanceTime || !distanceTime.rows || !distanceTime.rows[0].elements[0].distance) {
        console.error("Invalid API response: ", distanceTime);
        throw new Error('Failed to retrieve distance and time');
    }

    // Extract distance (in km) and duration (in minutes)
    const distanceInKm = distanceTime.rows[0].elements[0].distance.value / 1000;
    const durationInMins = Math.round(distanceTime.rows[0].elements[0].duration.value / 60);

    // Calculate fares for all vehicles
    const fares = {};
    for (const vehicle in fareDetails) {
        const { baseFare, ratePerKm } = fareDetails[vehicle];
        fares[vehicle] = Math.round(baseFare + (ratePerKm * distanceInKm));
    }

    return { fares, distanceInKm, durationInMins };
}

// Generate a random OTP
export function generateOtp(num) {
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}

// Find nearby captains based on location
export async function getNearbyCaptains(lat, lng, radius) {
    if (!lat || !lng || !radius) {
        throw new Error('Parameters missing');
    }

    // Radius is in km, and we convert to radians for $centerSphere
    const nearbyCaptains = await CaptainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371]
            }
        }
    });

    return nearbyCaptains.length > 0 ? nearbyCaptains : null;
}

// Calculate fine (10% of fare)
export const calcFine = (fare) => Math.round(fare * 0.1);

// Calculate delivery fees
export async function calcDeliveryFees(origin, destination) {
    if (!origin || !destination) {
        throw new Error('Origin or destination missing');
    }

    const fareDetails = {
        car: { baseFare: 50, ratePerKm: 10 },
        auto: { baseFare: 30, ratePerKm: 8 },
        motorcycle: { baseFare: 20, ratePerKm: 6 }
    };

    const distanceTime = await getDistanceandTime(origin, destination);

    if (!distanceTime || !distanceTime.rows || !distanceTime.rows[0].elements[0].distance) {
        console.error("Invalid API response: ", distanceTime);
        throw new Error('Failed to retrieve distance and time');
    }

    const distanceInKm = distanceTime.rows[0].elements[0].distance.value / 1000;
    const durationInMins = Math.round(distanceTime.rows[0].elements[0].duration.value / 60);

    const fares = {};
    for (const vehicle in fareDetails) {
        const { baseFare, ratePerKm } = fareDetails[vehicle];
        fares[vehicle] = Math.round(baseFare + (ratePerKm * distanceInKm));
    }

    return { fares, distanceInKm, durationInMins };
}
