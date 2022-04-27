import React, { createContext, useState } from "react"
import axios from "axios"

import useEvent from "../hooks/useEvent"
import useUser from "../hooks/useUser"

const FeedContext = createContext({})

export const FeedProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const { startingUpload, finishedUpload, setMessage } = useEvent()
    const { token } = useUser()

    const feedInternalContext = {
        posts,
        fetchPosts: async () => {
            try {
                const res = await axios.get('/posts.json')
                const rawPosts = res.data
                const postsTemp = []
                for (let key in rawPosts) {
                    postsTemp.push({
                        ...rawPosts[key],
                        id: key
                    })
                }
                setPosts(postsTemp.reverse())
            } catch (err) {
                setMessage('Erro ao Exibir Posts', err.message)
            }
        },
        addPost: async (post) => {
            try {
                startingUpload()
                const restStorage = await axios({
                    url: 'uploadImage',
                    baseURL: 'https://us-central1-lambe-6cb0f.cloudfunctions.net',
                    method: 'post',
                    data: {
                        image: post.image.base64
                    }
                })
                post.image = restStorage.data.imageUrl
                await axios.post(`/posts.json?auth=${token}`, post)
                finishedUpload()
                feedInternalContext.fetchPosts()
            } catch (err) {
                setMessage('Erro ao Adicionar Post', err.message)
                finishedUpload()
            }
        },
        addComment: async (postId, comment) => {
            try {
                const res = await axios.get(`/posts/${postId}.json`)
                const comments = res.data.comments || []
                comments.push(comment)
                await axios.patch(`/posts/${postId}.json?auth=${token}`, {comments})
                feedInternalContext.fetchPosts()
            } catch (err) {
                setMessage('Erro ao Adicionar Comentário', err.message)
            }
        }
    }

    return (
        <FeedContext.Provider value={feedInternalContext}>
            {children}
        </FeedContext.Provider>
    )
}

export default FeedContext