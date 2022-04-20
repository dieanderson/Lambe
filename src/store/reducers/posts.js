import { Image } from 'react-native'

import { ADD_POST } from '../actions/actionTypes'

import img1 from '../../../assets/imgs/fence.jpg'
import img2 from '../../../assets/imgs/boat.jpg'
import img3 from '../../../assets/imgs/gate.jpg'

const initialState = {
    posts: [{
        id: Math.random(),
        nickname: 'Gabriel Ferreira',
        email: 'gabriel@teste.com.br',
        image: Image.resolveAssetSource(img1).uri,
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
        image: Image.resolveAssetSource(img2).uri,
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
        image: Image.resolveAssetSource(img3).uri,
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
        default:
            return state
    }
}

export default reducer