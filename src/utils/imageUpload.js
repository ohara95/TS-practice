// import { storage } from "../config/firebase";
// import { v4 } from "uuid";

// const uuid = v4();

// export const next = (snapshot) => {
//   const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log(percent + "% done");
// };

// export const error = (err) => console.log(err);

// export const complete = (name, set) => {
//   storage
//     .ref(name)
//     .child(i¥uuid)
//     .getDownloadURL()
//     .then((url) => {
//       set(url);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
export {};
