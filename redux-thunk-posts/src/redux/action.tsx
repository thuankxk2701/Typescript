import { GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST ,API_URL} from "./types";
import axios from "axios";
export const getPost = (id: any) => ({
  type: GET_POST,
  payload: id,
});
export const createPost = (post: any) => ({
  type: CREATE_POST,
  payload: post,
});
export const updatePost = (post: any) => ({
  type: UPDATE_POST,
  payload: post,
});
export const deletePost = (id: any) => ({
  type: DELETE_POST,
  payload: id,
});

export const postFilePostImage=async (data:any) => {
  try {
      await axios.post(API_URL+'api/' + 'singleFile', data);
  } catch (error) {
      throw error;
  }
}