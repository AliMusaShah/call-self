import React from 'react'

const CustomImage = ({ src }) => {
    return (
        <img
            src={src}
            alt="Login Background"
            className="w-full h-full rounded-2xl "
        />
    )
}

export default CustomImage