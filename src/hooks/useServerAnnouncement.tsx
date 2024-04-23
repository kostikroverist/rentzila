import { useEffect, useState } from "react";
import { Announcement } from "../interface/AnnouncementInterface";
import { getAnnouncements, postAnnouncement } from "../service/firebase";

const useServerAnnouncement = () => {
  const [data, setData] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllAnnouncements();
  }, []);

  const getAllAnnouncements = async () => {
    try {
      const categoryData = await getAnnouncements();
      setData(categoryData as Announcement[]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const postAnnouncements = async (data: Announcement) => {
    try {
      await postAnnouncement(data);
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  return { data, isLoading, postAnnouncements };
};

export default useServerAnnouncement;
