import {NewPost, Post} from '../services/utils/SpacebookRequests';

export async function getListOfPosts(userId: number) {}
export async function addNewPost(userId: number, newPost: NewPost) {}
export async function getPost(userId: number, postId: number) {}
export async function removePost(userId: number, postId: number) {}
export async function updatePost(
  userId: number,
  postId: number,
  updatePost: Post,
) {}

export async function likePost(userId: number, postId: number) {}
export async function unlikePost(userId: number, postId: number) {}
