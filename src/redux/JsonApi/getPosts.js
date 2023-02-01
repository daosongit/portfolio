import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { POSTS_URL, CONFIG, DETAILS_URL } from './constants';
import getPostsMock from './getPostsMock';

// calling 2 get request and mixing details with posts,
// beacuse jsonbin.io api doesn't allow json files more than 100kb
const addDetails = (posts, details) => {
  const postsWithDetails = posts.map((el) => {
    el.details = details;
    return el;
  });
  return postsWithDetails;
};

const getPosts = createAsyncThunk('posts/getPostsStatus', async () => {
  try {
    // fetching all posts is complicated, but jsonbin.io api doesn't allow use url parameters
    const posts_response = await axios.get(POSTS_URL, CONFIG);
    const details_response = await axios.get(DETAILS_URL, CONFIG);
    return addDetails(posts_response.data.record, details_response.data.record.details);
  } catch (e) {
    console.group('Fetching from jsonbin.io:');
    console.log("jsonbin.io doesn't answer with next error:");
    console.error(e);
    console.log('Using hard-coded json...');
    console.groupEnd();
    return getPostsMock();
  }
});

export default getPosts;
