// import { randomUUID } from "crypto";
// import { Request } from "express";
// import multer from "multer";
// import {
//   CHILD_IMAGE_UPLOAD_PATH,
//   CHILD_PROFILE_UPLOAD_PATH,
//   CONTENT_IMAGE_UPLOAD_PATH,
//   CONTENT_VIDEO_UPLOAD_PATH,
//   ERROR_MESSAGE,
//   FILE_UPLOAD_PATH,
//   PROFILE_UPLOAD_PATH,
//   VERIFY_FACE_UPLOAD_PATH,
// } from "../constants";
// import { promisify } from "util";
// import fs from "fs";

// const getExtension = (file: Express.Multer.File): string => {
//   const splitArray = file.originalname.split(".");
//   return splitArray?.length ? splitArray[splitArray.length - 1] : "";
// };

// // const fileUploadStorage = multer.diskStorage({
// //   destination: function (
// //     _req: Request,
// //     _file: Express.Multer.File,
// //     callback: Function
// //   ) {
// //     callback(null, FILE_UPLOAD_PATH);
// //   },
// //   filename: function (
// //     _req: Request,
// //     file: Express.Multer.File,
// //     callback: Function
// //   ) {
// //     const extension = getExtension(file);
// //     const newFilename = `temp-${Date.now()}.${extension}`;
// //     callback(null, newFilename);
// //   },
// // });
// const fileUploadStorage = multer.diskStorage({
//   filename: function (
//     _req: Request,
//     file: Express.Multer.File,
//     callback: Function
//   ) {
//     const extension = getExtension(file);
//     const newFilename = `temp-${Date.now()}.${extension}`;
//     callback(null, newFilename);
//   },
// });
// const imageUploadStorage = multer.diskStorage({
//   destination: function (
//     _req: Request,
//     _file: Express.Multer.File,
//     callback: Function
//   ) {
//     callback(null, CHILD_IMAGE_UPLOAD_PATH);
//   },
//   filename: function (
//     _req: Request,
//     file: Express.Multer.File,
//     callback: Function
//   ) {
//     const extension = getExtension(file);
//     const uniqueId = randomUUID();
//     const newFilename = `temp-${uniqueId}.${extension}`;
//     callback(null, newFilename);
//   },
// });

// const fileFilter = (_req: Request, file: Express.Multer.File, cb: Function) => {
//   const extension = getExtension(file);
//   if (["png", "jpeg", "jpg", "mp4"].includes(extension)) {
//     cb(null, true);
//   } else {
//     cb(ERROR_MESSAGE.ONLY_IMAGES.replace("extension", extension), false);
//   }
// };

// const audioFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: Function
// ) => {
//   const extension = getExtension(file);
//   if (["mp3"].includes(extension)) {
//     cb(null, true);
//   } else {
//     cb(ERROR_MESSAGE.ONLY_AUDIO.replace("extension", extension), false);
//   }
// };

// export const fileUpload = multer({
//   storage: fileUploadStorage,
//   fileFilter: fileFilter,
// });

// export const audioUpload = multer({
//   storage: fileUploadStorage,
//   fileFilter: audioFilter,
// });

// export const imageUpload = multer({
//   storage: imageUploadStorage,
//   fileFilter: fileFilter,
// });

// const mkdir = promisify(fs.mkdir);

// //Parent Profile Image Upload
// const profileImageUploadStorage = multer.diskStorage({
//   destination: async function (
//     _req: Request,
//     _file: Express.Multer.File,
//     callback: Function
//   ) {
//     try {
//       await mkdir(PROFILE_UPLOAD_PATH, { recursive: true });
//       callback(null, PROFILE_UPLOAD_PATH);
//     } catch (err) {
//       callback(err);
//     }
//   },
//   filename: function (
//     _req: Request,
//     file: Express.Multer.File,
//     callback: Function
//   ) {
//     const extension = getExtension(file);
//     const uniqueId = randomUUID();
//     const newFilename = `profile-${uniqueId}.${extension}`;
//     callback(null, newFilename);
//   },
// });

// const profileImageFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: Function
// ) => {
//   const extension = getExtension(file);
//   if (["png", "jpeg", "jpg"].includes(extension)) {
//     cb(null, true);
//   } else {
//     cb(ERROR_MESSAGE.INVALID_PROFILE_IMAGE, false);
//   }
// };

// export const profileImageUpload = multer({
//   storage: profileImageUploadStorage,
//   fileFilter: profileImageFilter,
// });

// //Child Profile Image Upload
// // const ChildprofileImageUploadStorage = multer.diskStorage({
// //   destination: async function (
// //     _req: Request,
// //     _file: Express.Multer.File,
// //     callback: Function
// //   ) {
// //     try {
// //       await mkdir(CHILD_PROFILE_UPLOAD_PATH, { recursive: true });
// //       callback(null, CHILD_PROFILE_UPLOAD_PATH);
// //     } catch (err) {
// //       callback(err);
// //     }
// //   },
// //   filename: function (
// //     _req: Request,
// //     file: Express.Multer.File,
// //     callback: Function
// //   ) {
// //     const extension = getExtension(file);
// //     const uniqueId = randomUUID();
// //     const newFilename = `profile-${uniqueId}.${extension}`;
// //     callback(null, newFilename);
// //   },
// // });
// const ChildprofileImageUploadStorage = multer.diskStorage({
//   filename: function (
//     _req: Request,
//     file: Express.Multer.File,
//     callback: Function
//   ) {
//     const extension = getExtension(file);
//     const uniqueId = randomUUID();
//     const newFilename = `profile-${uniqueId}.${extension}`;
//     callback(null, newFilename);
//   },
// });
// const ChildprofileImageFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: Function
// ) => {
//   const extension = getExtension(file);
//   if (["png", "jpeg", "jpg", "gif", "bmp", "webp", "tiff", "svg", "ico"].includes(extension)) {
//     cb(null, true);
//   } else {
//     cb(ERROR_MESSAGE.INVALID_PROFILE_IMAGE, false);
//   }
// };

// export const ChildprofileImageUpload = multer({
//   storage: ChildprofileImageUploadStorage,
//   fileFilter: ChildprofileImageFilter,
// });

// //Content Question Upload
// const createDestinationIfNotExists = async (destination: string) => {
//   try {
//     await fs.promises.mkdir(destination, { recursive: true });
//   } catch (err) {
//     // Handle any errors during directory creation
//     console.error("Error creating destination folder:", err);
//   }
// };

// const contentQuestionUploadStorage = multer.diskStorage({
//   destination: async function (
//     _req: Request,
//     file: Express.Multer.File,
//     callback: Function
//   ) {
//     const extension = getExtension(file);
//     if (["mp4"].includes(extension)) {
//       await createDestinationIfNotExists(CONTENT_VIDEO_UPLOAD_PATH);
//       callback(null, CONTENT_VIDEO_UPLOAD_PATH);
//     } else {
//       await createDestinationIfNotExists(CONTENT_IMAGE_UPLOAD_PATH);
//       callback(null, CONTENT_IMAGE_UPLOAD_PATH);
//     }
//   },
//   filename: function (
//     _req: Request,
//     file: Express.Multer.File,
//     callback: Function
//   ) {
//     const extension = getExtension(file);
//     const uniqueId = randomUUID();
//     const newFilename = `content-question-${uniqueId}.${extension}`;
//     callback(null, newFilename);
//   },
// });

// const contentQuestionFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: Function
// ) => {
//   const extension = getExtension(file);
//   if (["mp4", "png", "jpeg", "jpg"].includes(extension)) {
//     cb(null, true);
//   } else {
//     cb(ERROR_MESSAGE.INVALID_CONTENT_QUESTION, false);
//   }
// };

// export const contentQuestionUpload = multer({
//   storage: contentQuestionUploadStorage,
//   fileFilter: contentQuestionFilter,
// });

// //verify face
// const verifyFaceUploadStorage = multer.diskStorage({
//   destination: function (_req, _file, callback) {
//     // Define the destination folder where the images will be stored for face verification
//     callback(null, VERIFY_FACE_UPLOAD_PATH);
//   },
//   filename: function (_req, file, callback) {
//     // Generate a unique filename for each uploaded image
//     const extension = getExtension(file);
//     const uniqueId = randomUUID();
//     const newFilename = `verifyFace-${uniqueId}.${extension}`;
//     callback(null, newFilename);
//   },
// });

// const verifyFaceUploadFilter = (
//   _req: Request,
//   file: Express.Multer.File,
//   cb: Function
// ) => {
//   // Define the file filter to allow only specific image file types
//   const allowedExtensions = ["png", "jpeg", "jpg"];
//   const extension = getExtension(file);

//   if (allowedExtensions.includes(extension)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid image file type"), false);
//   }
// };

// export const verifyFaceUploader = multer({
//   storage: verifyFaceUploadStorage,
//   fileFilter: verifyFaceUploadFilter,
// });

// export  function getContentTypeFromExtension(fileName : any) {
//   const extension = fileName.split('.').pop().toLowerCase();

//   const imageExtensions :any = {
//     jpeg: 'image/jpeg',
//     jpg: 'image/jpeg',
//     png: 'image/png',
//     gif: 'image/gif',
//     bmp: 'image/bmp',
//     webp: 'image/webp',
//     tiff: 'image/tiff',
//     svg: 'image/svg+xml',
//     ico: 'image/x-icon',
//   };

//   const videoExtensions :any = {
//     mp4: 'video/mp4',
//     avi: 'video/x-msvideo',
//     mov: 'video/quicktime',
//     wmv: 'video/x-ms-wmv',
//     webm: 'video/webm',
//   };

//   if (imageExtensions[extension]) {
//     return imageExtensions[extension];
//   } else if (videoExtensions[extension]) {
//     return videoExtensions[extension];
//   } else {
//     return 'application/octet-stream'; // Default content type for unknown file types
//   }
// }
