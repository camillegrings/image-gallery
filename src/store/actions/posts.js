import { SET_POSTS, CREATING_POST, POST_CREATED } from "./actionTypes";
import axios from "axios";
import { setMessage } from "./message";

export const addPost = post => {
  return (dispatch, getState) => {
    dispatch(creatingPost());
    axios({
      url: "uploadImage",
      baseURL: "https://us-central1-galeria-de-fotos-fd8f8.cloudfunctions.net",
      method: "post",
      data: {
        image: post.image.base64
      }
    })
      .then(res => {
        post.image = res.data.imageUrl;
        axios
          .post(`/posts.json?auth=${getState().user.token}`, { ...post })
          .then(res => {
            dispatch(fetchPosts());
            dispatch(postCreated());
          })
          .catch(err => dispatch(setMessage({ title: "Erro", text: err })));
      })
      .catch(err =>
        dispatch(
          setMessage({
            title: "Erro",
            text: "Não foi possível adicionar o post"
          })
        )
      );
  };
};

export const addComment = payload => {
  return (dispatch, getState) => {
    axios
      .get(`/posts/${payload.postId}.json`)
      .then(res => {
        const comments = res.data.comments || [];
        comments.push(payload.comment);
        axios
          .patch(
            `/posts/${payload.postId}.json?auth=${getState().user.token}`,
            { comments }
          )
          .then(res => {
            dispatch(fetchPosts());
          })
          .catch(err =>
            dispatch(
              setMessage({
                title: "Erro",
                text: "Não foi possível adicionar o comentário"
              })
            )
          );
      })
      .catch(err =>
        dispatch(
          setMessage({
            title: "Erro",
            text: "Não foi possível adicionar o comentário"
          })
        )
      );
  };
};

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts
  };
};

export const fetchPosts = () => {
  return dispatch => {
    axios
      .get("/posts.json")
      .then(res => {
        const rawPosts = res.data;
        const posts = [];
        for (let key in rawPosts) {
          posts.push({
            ...rawPosts[key],
            id: key
          });
        }

        dispatch(setPosts(posts.reverse()));
      })
      .catch(err =>
        dispatch(
          setMessage({
            title: "Erro",
            text: "Não foi possível carregar os posts"
          })
        )
      );
  };
};

export const creatingPost = () => {
  return {
    type: CREATING_POST
  };
};

export const postCreated = () => {
  return {
    type: POST_CREATED
  };
};
