
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 

export const getCloudinaryUrl = (publicId: string, width: number, height: number) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},h_${height},c_fit,q_auto,f_auto/${publicId}`;
};