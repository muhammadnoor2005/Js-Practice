// Function to calculate distance between two points using Haversine formula
exports.calculateDistance = (lat,lon) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat-process.env.NEXT_PUBLIC_INSTITUTE_LATITUDE);  // deg2rad below
    const dLon = deg2rad(lon- process.env.NEXT_PUBLIC_INSTITUTE_LONGITUDE); 

    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(process.env.NEXT_PUBLIC_INSTITUTE_LATITUDE)) * Math.cos(deg2rad(lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);

  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km

    return d <= 3; //within 3km radius
    
}
  
const deg2rad = (deg) => {
    return deg * (Math.PI/180)
};










