import {
  USER_LOGGED_ID,
  USER_LOGGED_OUT,
  USER_LOADED,
  LOADING_USER,
  PROFILE_UPDATED
} from "./actionTypes";
import axios from "axios";
import { setMessage } from "./message";

const AUTH_BASE_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const API_KEY = "AIzaSyB_POGmz_NjeGthRgLWbt_0Vjr7mXlmRvM";

export const userLogged = user => {
  return {
    type: USER_LOGGED_ID,
    payload: user
  };
};

export const logout = () => {
  return {
    type: USER_LOGGED_OUT
  };
};

export const createUser = user => {
  return dispatch => {
    dispatch(loadingUser());
    axios
      .post(`${AUTH_BASE_URL}/signupNewUser?key=${API_KEY}`, {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      })
      .then(res => {
        if (res.data.localId) {
          axios
            .put(`/users/${res.data.localId}.json`, {
              name: user.name
            })
            .then(() => {
              dispatch(login(user));
            })
            .catch(err =>
              dispatch(
                setMessage({
                  title: "Erro",
                  text: "Não foi possível criar uma nova conta"
                })
              )
            );
        }
      })
      .catch(err =>
        dispatch(
          setMessage({
            title: "Erro",
            text: "Não foi possível criar uma nova conta"
          })
        )
      );
  };
};

export const loadingUser = () => {
  return {
    type: LOADING_USER
  };
};

export const userLoaded = () => {
  return {
    type: USER_LOADED
  };
};

export const login = user => {
  return dispatch => {
    dispatch(loadingUser());
    axios
      .post(`${AUTH_BASE_URL}/verifyPassword?key=${API_KEY}`, {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      })
      .then(res => {
        if (res.data.localId) {
          user.token = res.data.idToken;
          const id = res.data.localId;
          axios
            .get(`/users/${res.data.localId}.json`)
            .then(res => {
              delete user.password;
              user.name = res.data.name;
              user.id = id;
              user.profilePhoto = res.data.profilePhoto;
              dispatch(userLogged(user));
              dispatch(userLoaded());
            })
            .catch(err =>
              dispatch(
                setMessage({
                  title: "Erro",
                  text: "Não foi possível carregar os dados do Usuário"
                })
              )
            );
        }
      })
      .catch(err =>
        dispatch(
          setMessage({ title: "Erro", text: "Usuário ou senha inválido" })
        )
      );
  };
};

export const updateProfilePicture = photoUrl => {
  return (dispatch, getState) => {
    dispatch(loadingUser());
    axios({
      url: "uploadImage",
      baseURL: "https://us-central1-galeria-de-fotos-fd8f8.cloudfunctions.net",
      method: "post",
      data: {
        image: photoUrl.base64
      }
    })
      .then(res => {
        console.log("1", res);
        console.log(getState().user.id);
        console.log(getState().user.token);
        axios
          .patch(
            `/users/${getState().user.id}.json?auth=${getState().user.token}`,
            {
              profilePhoto: res.data.imageUrl
            }
          )
          .then(res => {
            console.log("2", res);
            dispatch(userLoaded());
            dispatch(profileUpdated({ profilePhoto: res.data.profilePhoto }));
          })
          .catch(err => {
            console.log("erro", err);
            dispatch(setMessage({ title: "Erro", text: err }));
          });
      })
      .catch(err => {
        console.log(err);
        dispatch(
          setMessage({
            title: "Erro",
            text: "Não foi possível atualizar a foto de perfil"
          })
        );
      });
  };
};

export const profileUpdated = photo => {
  return {
    type: PROFILE_UPDATED,
    payload: photo
  };
};
