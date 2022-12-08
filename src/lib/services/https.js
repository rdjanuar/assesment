import Axios from "@/api/api_instance";

export const http = (method, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await Axios({ ...method, url });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
