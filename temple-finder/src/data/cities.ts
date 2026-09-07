export interface City {
  name: string
  state: string
  latitude: number
  longitude: number
  timezone: string
}

export const INDIAN_CITIES: City[] = [
  // Tamil Nadu
  { name: 'Chennai', state: 'Tamil Nadu', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
  { name: 'Coimbatore', state: 'Tamil Nadu', latitude: 11.0168, longitude: 76.9558, timezone: 'Asia/Kolkata' },
  { name: 'Madurai', state: 'Tamil Nadu', latitude: 9.9252, longitude: 78.1198, timezone: 'Asia/Kolkata' },
  { name: 'Trichy', state: 'Tamil Nadu', latitude: 10.7905, longitude: 78.7047, timezone: 'Asia/Kolkata' },
  { name: 'Salem', state: 'Tamil Nadu', latitude: 11.6643, longitude: 78.1460, timezone: 'Asia/Kolkata' },
  { name: 'Tirunelveli', state: 'Tamil Nadu', latitude: 8.7139, longitude: 77.7567, timezone: 'Asia/Kolkata' },
  { name: 'Vellore', state: 'Tamil Nadu', latitude: 12.9165, longitude: 79.1325, timezone: 'Asia/Kolkata' },
  { name: 'Erode', state: 'Tamil Nadu', latitude: 11.3410, longitude: 77.7172, timezone: 'Asia/Kolkata' },
  { name: 'Thanjavur', state: 'Tamil Nadu', latitude: 10.7870, longitude: 79.1378, timezone: 'Asia/Kolkata' },
  { name: 'Kanchipuram', state: 'Tamil Nadu', latitude: 12.8342, longitude: 79.7036, timezone: 'Asia/Kolkata' },
  
  // Karnataka
  { name: 'Bangalore', state: 'Karnataka', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
  { name: 'Mysore', state: 'Karnataka', latitude: 12.2958, longitude: 76.6394, timezone: 'Asia/Kolkata' },
  { name: 'Mangalore', state: 'Karnataka', latitude: 12.9141, longitude: 74.8560, timezone: 'Asia/Kolkata' },
  { name: 'Hubli', state: 'Karnataka', latitude: 15.3647, longitude: 75.1240, timezone: 'Asia/Kolkata' },
  { name: 'Belgaum', state: 'Karnataka', latitude: 15.8497, longitude: 74.4977, timezone: 'Asia/Kolkata' },
  
  // Kerala
  { name: 'Thiruvananthapuram', state: 'Kerala', latitude: 8.5241, longitude: 76.9366, timezone: 'Asia/Kolkata' },
  { name: 'Kochi', state: 'Kerala', latitude: 9.9312, longitude: 76.2673, timezone: 'Asia/Kolkata' },
  { name: 'Kozhikode', state: 'Kerala', latitude: 11.2588, longitude: 75.7804, timezone: 'Asia/Kolkata' },
  { name: 'Thrissur', state: 'Kerala', latitude: 10.5276, longitude: 76.2144, timezone: 'Asia/Kolkata' },
  { name: 'Kollam', state: 'Kerala', latitude: 8.8932, longitude: 76.6141, timezone: 'Asia/Kolkata' },
  
  // Andhra Pradesh & Telangana
  { name: 'Hyderabad', state: 'Telangana', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', latitude: 17.6868, longitude: 83.2185, timezone: 'Asia/Kolkata' },
  { name: 'Vijayawada', state: 'Andhra Pradesh', latitude: 16.5062, longitude: 80.6480, timezone: 'Asia/Kolkata' },
  { name: 'Guntur', state: 'Andhra Pradesh', latitude: 16.3067, longitude: 80.4365, timezone: 'Asia/Kolkata' },
  { name: 'Tirupati', state: 'Andhra Pradesh', latitude: 13.6288, longitude: 79.4192, timezone: 'Asia/Kolkata' },
  { name: 'Warangal', state: 'Telangana', latitude: 17.9689, longitude: 79.5941, timezone: 'Asia/Kolkata' },
  
  // Maharashtra
  { name: 'Mumbai', state: 'Maharashtra', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'Pune', state: 'Maharashtra', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata' },
  { name: 'Nagpur', state: 'Maharashtra', latitude: 21.1458, longitude: 79.0882, timezone: 'Asia/Kolkata' },
  { name: 'Nashik', state: 'Maharashtra', latitude: 19.9975, longitude: 73.7898, timezone: 'Asia/Kolkata' },
  { name: 'Aurangabad', state: 'Maharashtra', latitude: 19.8762, longitude: 75.3433, timezone: 'Asia/Kolkata' },
  { name: 'Solapur', state: 'Maharashtra', latitude: 17.6599, longitude: 75.9064, timezone: 'Asia/Kolkata' },
  
  // Gujarat
  { name: 'Ahmedabad', state: 'Gujarat', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata' },
  { name: 'Surat', state: 'Gujarat', latitude: 21.1702, longitude: 72.8311, timezone: 'Asia/Kolkata' },
  { name: 'Vadodara', state: 'Gujarat', latitude: 22.3072, longitude: 73.1812, timezone: 'Asia/Kolkata' },
  { name: 'Rajkot', state: 'Gujarat', latitude: 22.3039, longitude: 70.8022, timezone: 'Asia/Kolkata' },
  
  // Rajasthan
  { name: 'Jaipur', state: 'Rajasthan', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata' },
  { name: 'Jodhpur', state: 'Rajasthan', latitude: 26.2389, longitude: 73.0243, timezone: 'Asia/Kolkata' },
  { name: 'Udaipur', state: 'Rajasthan', latitude: 24.5854, longitude: 73.7125, timezone: 'Asia/Kolkata' },
  { name: 'Ajmer', state: 'Rajasthan', latitude: 26.4499, longitude: 74.6399, timezone: 'Asia/Kolkata' },
  
  // Madhya Pradesh
  { name: 'Bhopal', state: 'Madhya Pradesh', latitude: 23.2599, longitude: 77.4126, timezone: 'Asia/Kolkata' },
  { name: 'Indore', state: 'Madhya Pradesh', latitude: 22.7196, longitude: 75.8577, timezone: 'Asia/Kolkata' },
  { name: 'Jabalpur', state: 'Madhya Pradesh', latitude: 23.1815, longitude: 79.9864, timezone: 'Asia/Kolkata' },
  { name: 'Gwalior', state: 'Madhya Pradesh', latitude: 26.2183, longitude: 78.1828, timezone: 'Asia/Kolkata' },
  
  // Uttar Pradesh
  { name: 'Lucknow', state: 'Uttar Pradesh', latitude: 26.8467, longitude: 80.9462, timezone: 'Asia/Kolkata' },
  { name: 'Kanpur', state: 'Uttar Pradesh', latitude: 26.4499, longitude: 80.3319, timezone: 'Asia/Kolkata' },
  { name: 'Varanasi', state: 'Uttar Pradesh', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata' },
  { name: 'Agra', state: 'Uttar Pradesh', latitude: 27.1767, longitude: 78.0081, timezone: 'Asia/Kolkata' },
  { name: 'Allahabad', state: 'Uttar Pradesh', latitude: 25.4358, longitude: 81.8463, timezone: 'Asia/Kolkata' },
  { name: 'Meerut', state: 'Uttar Pradesh', latitude: 28.9845, longitude: 77.7064, timezone: 'Asia/Kolkata' },
  
  // Delhi & NCR
  { name: 'New Delhi', state: 'Delhi', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { name: 'Gurgaon', state: 'Haryana', latitude: 28.4595, longitude: 77.0266, timezone: 'Asia/Kolkata' },
  { name: 'Noida', state: 'Uttar Pradesh', latitude: 28.5355, longitude: 77.3910, timezone: 'Asia/Kolkata' },
  { name: 'Faridabad', state: 'Haryana', latitude: 28.4089, longitude: 77.3178, timezone: 'Asia/Kolkata' },
  
  // Punjab & Haryana
  { name: 'Chandigarh', state: 'Chandigarh', latitude: 30.7333, longitude: 76.7794, timezone: 'Asia/Kolkata' },
  { name: 'Amritsar', state: 'Punjab', latitude: 31.6340, longitude: 74.8723, timezone: 'Asia/Kolkata' },
  { name: 'Ludhiana', state: 'Punjab', latitude: 30.9010, longitude: 75.8573, timezone: 'Asia/Kolkata' },
  { name: 'Jalandhar', state: 'Punjab', latitude: 31.3260, longitude: 75.5762, timezone: 'Asia/Kolkata' },
  
  // West Bengal
  { name: 'Kolkata', state: 'West Bengal', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
  { name: 'Siliguri', state: 'West Bengal', latitude: 26.7271, longitude: 88.3953, timezone: 'Asia/Kolkata' },
  { name: 'Durgapur', state: 'West Bengal', latitude: 23.5204, longitude: 87.3119, timezone: 'Asia/Kolkata' },
  
  // Odisha
  { name: 'Bhubaneswar', state: 'Odisha', latitude: 20.2961, longitude: 85.8245, timezone: 'Asia/Kolkata' },
  { name: 'Cuttack', state: 'Odisha', latitude: 20.4625, longitude: 85.8830, timezone: 'Asia/Kolkata' },
  { name: 'Puri', state: 'Odisha', latitude: 19.8135, longitude: 85.8312, timezone: 'Asia/Kolkata' },
  
  // Bihar & Jharkhand
  { name: 'Patna', state: 'Bihar', latitude: 25.5941, longitude: 85.1376, timezone: 'Asia/Kolkata' },
  { name: 'Ranchi', state: 'Jharkhand', latitude: 23.3441, longitude: 85.3096, timezone: 'Asia/Kolkata' },
  { name: 'Jamshedpur', state: 'Jharkhand', latitude: 22.8046, longitude: 86.2029, timezone: 'Asia/Kolkata' },
  
  // Assam & Northeast
  { name: 'Guwahati', state: 'Assam', latitude: 26.1445, longitude: 91.7362, timezone: 'Asia/Kolkata' },
  { name: 'Imphal', state: 'Manipur', latitude: 24.8170, longitude: 93.9368, timezone: 'Asia/Kolkata' },
  { name: 'Agartala', state: 'Tripura', latitude: 23.8315, longitude: 91.2868, timezone: 'Asia/Kolkata' },
  
  // Goa
  { name: 'Panaji', state: 'Goa', latitude: 15.4909, longitude: 73.8278, timezone: 'Asia/Kolkata' },
  { name: 'Margao', state: 'Goa', latitude: 15.2707, longitude: 73.9537, timezone: 'Asia/Kolkata' },
  
  // Uttarakhand
  { name: 'Dehradun', state: 'Uttarakhand', latitude: 30.3165, longitude: 78.0322, timezone: 'Asia/Kolkata' },
  { name: 'Haridwar', state: 'Uttarakhand', latitude: 29.9457, longitude: 78.1642, timezone: 'Asia/Kolkata' },
  { name: 'Rishikesh', state: 'Uttarakhand', latitude: 30.0869, longitude: 78.2676, timezone: 'Asia/Kolkata' },
]

export function getCityByName(cityName: string): City | undefined {
  const normalized = cityName.trim().toLowerCase()
  return INDIAN_CITIES.find(city => 
    city.name.toLowerCase() === normalized || 
    city.name.toLowerCase().includes(normalized)
  )
}

export function getDefaultCity(): City {
  return INDIAN_CITIES[0] // Chennai as default
}
