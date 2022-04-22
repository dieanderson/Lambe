import axios from 'axios'

import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes'

const authBaseURL = 'https://identitytoolkit.googleapis.com/v1'
const API_KEY = 'AIzaSyAFC1A0Q8K-bq-M14eyLFkk5kTAWZHakrk'
const url = `${authBaseURL}/accounts:signUp?key=${API_KEY}`
const config = {
    headers: {
        'Content-Type': 'application/json',
    }
  }
export const login = user => {
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
        axios.post(url, dataUser, config)
            .catch(err => console.log(err))
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                    })
                        .catch(err => console.log(err))
                        .then(res => {
                            console.log('Usuario criado com sucesso!')
                        })
                }
            })
    }
}