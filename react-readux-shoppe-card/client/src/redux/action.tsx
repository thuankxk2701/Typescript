import axios from "axios";
import { API_URL } from "./types";
export const postFilePostImage = async (data: any) => {
  try {
    await axios.post(API_URL + "api/" + "singleFile", data);
  } catch (error) {
    throw error;
  }
};
