import { ADD_POST, ADD_COMMENT } from '../actions/actionTypes'

import img1 from '../../../assets/imgs/fence.jpg'
import img2 from '../../../assets/imgs/boat.jpg'
import img3 from '../../../assets/imgs/gate.jpg'

const initialState = {
    posts: [{
        id: Math.random(),
        nickname: 'Gabriel Ferreira',
        email: 'gabriel@teste.com.br',
        image: img1,
        comments: [{
            nickname: 'Diego Anderson',
            comment: 'Bela foto!',
        },{
            nickname: 'Karina Ferreia',
            comment: 'Não curti muito!',
        }]
    },{
        id: Math.random(),
        nickname: 'Mariana Ferreira',
        email: 'mari@teste.com.br',
        image: img2,
        comments: [{
            nickname: 'Diego Anderson',
            comment: 'que massa',
        },{
            nickname: 'Karina Ferreia',
            comment: 'gostei demais',
        }]
    },{            
        id: Math.random(),
        nickname: 'Diego Anderson',
        email: 'dieanderson@gmail.com',
        image: img3,
        comments: []  
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat({
                    ...action.payload
                })
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        if (post.comments) {
                            post.comments = post.comments.concat(action.payload.comment)
                        } else {
                            post.comments = [action.payload.comment]
                        }
                    }
                    return post
                })
            }    
        default:
            return state
    }
}

export default reducer