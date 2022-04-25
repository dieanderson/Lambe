import axios from 'axios'

import { 
    USER_LOGGED_IN, 
    USER_LOGGED_OUT,
    LOADING_USER,
    USER_LOADED,
} from './actionTypes'
import { setMessage } from './message'

const authBaseURL = 'https://identitytoolkit.googleapis.com/v1'
const API_KEY = 'AIzaSyAFC1A0Q8K-bq-M14eyLFkk5kTAWZHakrk'
const url_signUp = `${authBaseURL}/accounts:signUp?key=${API_KEY}`
const url_signIn = `${authBaseURL}/accounts:signInWithPassword?key=${API_KEY}`
const config = {
    headers: {
        'Content-Type': 'application/json',
    }
  }

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user,
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT,
    }
}

export const createUser = user => {
    const dataUser = {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      }
    return dispatch => {
        axios.post(url_signUp, dataUser, config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro ao Criar Usuário',
                    text: err,
                }))
            })
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                    })
                        .catch(err => {
                            dispatch(setMessage({
                                title: 'Erro ao Criar Usuário',
                                text: err,
                            }))
                        })
                        .then(res => {
                            dispatch(setMessage({
                                title: 'Criar Usuário',
                                text: 'Usuário Criado com Sucesso!',
                            }))
                        })
                }
            })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER,
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED,
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser())
        const dataUser = {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        }
        axios.post(url_signIn, dataUser,config)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro ao Realizar Login',
                    text: err,
                }))
            })
            .then(res => {
                if (res.data.localId) {
                    axios.get(`/users/${res.data.localId}.json`)
                        .catch(err => {
                            dispatch(setMessage({
                                title: 'Erro ao Realizar Login',
                                text: err,
                            }))
                        })
                        .then(res => {
                            user.password = null
                            user.name = res.data.name
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })
                }
            })
    }
}