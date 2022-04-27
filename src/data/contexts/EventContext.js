import React, { createContext,useState } from "react"

const EventContext = createContext()

export const EventProvider = ({ children }) => {
    const [uploading, setUploading] = useState(false)
    const [messageTitle, setMessageTitle] = useState('')
    const [message, setMessage] = useState('')
    const [splash, setSplash] = useState(true)

    const eventInternalContext = {
        uploading,
        messageTitle,
        message,
        splash,
        startingUpload: function () {
            setUploading(true)
        },
        finishedUpload: function () {
            setUploading(false)
        },
        setMessage: function (title, message) {
            setMessageTitle(title)
            setMessage(message)
        },
        clearMessage: function () {
            eventInternalContext.setMessage('', '')
        },
        endSplash: function () {
            setSplash(false)
        }
    }

    return (
        <EventContext.Provider value={eventInternalContext}>
            {children}
        </EventContext.Provider>
    )
}

export default EventContext