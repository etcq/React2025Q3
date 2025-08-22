export const imageToBase = (image: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (typeof base64 === 'string') {
        resolve(base64);
      } else {
        reject(new Error("Can't convert image to base64"));
      }
    };
  });
};
