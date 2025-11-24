import axiosBase from "./axiosBase";

const getItems = async () => {
  const response = await axiosBase.get("/items");
  return response.data;
};

export default getItems;
