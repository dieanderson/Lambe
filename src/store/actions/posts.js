import axios from 'axios'

import { ADD_POST, ADD_COMMENT } from './actionTypes'

export const addPost = post => {
    
    return dispatch => {
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-6cb0f.cloudfunctions.net',
            method: 'POST',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.log(err))
            .then(res => {
                post.image = res.data.imageUrl
                axios.post('/posts.json', { ...post })
                    .catch(err => console.log(err))
                    .then(res => console.log(res.data))
            })        
    }
    //return {
    //    type: ADD_POST,
    //    payload: post,
    //}
}

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload: payload,
    }
}