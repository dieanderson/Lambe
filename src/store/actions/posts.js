import axios from 'axios'

import { SET_POSTS, ADD_COMMENT } from './actionTypes'

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
}

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload: payload,
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts,
    }
}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => console.log(err))
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for ( let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key,
                    })
                }
                dispatch(setPosts(posts))
            })
    }
}