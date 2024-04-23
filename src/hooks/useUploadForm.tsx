import { ChangeEvent, useState } from "react";
import { storage } from "../service/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const useUploadForm = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImg(e.target.files[0]);
    }
  };

  const uploadImg = (file: File) => {
    if (file === null) return;
    const imgRef = ref(storage, `images/${file.name}`);
    uploadBytes(imgRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImageUrl(downloadURL);
      });
    });
  };

  return {
    imageUrl,
    uploadImg,
    handleFileChange,
  };
};

export default useUploadForm;
