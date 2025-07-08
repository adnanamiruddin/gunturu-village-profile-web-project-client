import { storage } from "@/api/config/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImageToFirebaseStorage = async ({
  storageFolderName,
  image,
}) => {
  const storageRef = ref(
    storage,
    `sibulu-village/${storageFolderName || "uploads"}/${
      image.name + +new Date()
    }`
  );
  const upload = await uploadBytes(storageRef, image);
  const downloadUrl = await getDownloadURL(upload.ref);
  return downloadUrl;
};
