import { GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST } from "./types";
export const getPost = (id: number) => ({
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
export const deletePost = (id: number) => ({
  type: DELETE_POST,
  payload: id,
});
