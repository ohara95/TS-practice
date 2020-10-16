import firebase, { storage } from "../config/firebase";
import { v4 } from "uuid";

export const handleCloudUpload = (name, file, set) => {
  const uuid = v4();
  const next = (snapshot) => {
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
  };

  const error = (err) => console.log(err);

  const complete = () => {
    storage
      .ref(name)
      .child(uuid)
      .getDownloadURL()
      .then((url) => {
        set(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadTask = storage.ref(`/${name}/${uuid}`).put(file);
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    next,
    error,
    complete
  );
};
