// pages/api/upload.js
import nextConnect from "next-connect";
import formidable from "formidable";
import cloudinary from "cloudinary";

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser allows us to handle file uploads
  },
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post((req, res) => {
    console.log('POST', req.files);
    
//   const { file } = req.files;
//   const { month, shipmentNo } = fields; // Assume these are sent as part of the form data

//   cloudinary.v2.config({
//     cloud_name: "your_cloud_name",
//     api_key: "your_api_key",
//     api_secret: "your_api_secret",
//   });

//   const folderPath = `parcel/${month}/${shipmentNo}`;

//   cloudinary.v2.uploader.upload(
//     file.path,
//     {
//       folder: folderPath,
//     },
//     (error, result) => {
//       if (error) return res.status(500).json({ error: error.message });
//       res.status(200).json({ message: "Success", url: result.url });
//     }
//   );
});

export default apiRoute;
