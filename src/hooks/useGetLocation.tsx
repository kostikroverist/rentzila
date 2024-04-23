import { useEffect, useState } from "react";
import axios from "axios";
import { LocationData } from "../interface/LocationData";
import { defaultPosition } from "../constant/constant";

const useGetLocation = () => {
  const [townName, setTownName] = useState<LocationData>();
  const [location, setLocation] = useState<[number, number]>([
    defaultPosition.lat,
    defaultPosition.lng,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<LocationData>(
          `https://nominatim.openstreetmap.org/reverse?lat=${location[0]}&lon=${location[1]}&format=json`
        );
        console.log(response);
        setTownName(response.data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
    fetchData();
  }, [location]);
  return { townName, setLocation };
};

export default useGetLocation;
