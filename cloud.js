const cloudinary = require("cloudinary");

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (url) => {
    return await cloudinary.v2.uploader.upload(url, {
        resource_type: "video",
    });
};

module.exports = uploadToCloudinary;
