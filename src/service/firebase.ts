import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, query } from "firebase/firestore";
import { Announcement } from "../interface/AnnouncementInterface";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBtNzikvOMAWOuVAj5Cgh-JyCIoF3_zg_g",
    authDomain: "rentziladublicate.firebaseapp.com",
    projectId: "rentziladublicate",
    storageBucket: "rentziladublicate.appspot.com",
    messagingSenderId: "684176716552",
    appId: "1:684176716552:web:e20205748bee10b2c6f2bd",
    measurementId: "G-GGGPFHM182"
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const db = getFirestore();

export const getAnnouncements = async () => {
    const collectionRef = collection(db, 'announcements');
    const q = query(collectionRef);

    try {
        const querySnapshot = await getDocs(q);
        const categoryMap = querySnapshot.docs.map(doc => doc.data());
        return categoryMap;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}


export const postAnnouncement = async (announcementData: Announcement) => {
    try {
        const docRef = await addDoc(collection(db, "announcements"), announcementData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};