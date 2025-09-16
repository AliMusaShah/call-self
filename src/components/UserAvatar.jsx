import React from 'react'

const UserAvatar = ({ avatar, name, style
}) => {
    return (
        <div className="flex items-center space-x-3">
            <img
                src={avatar}
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div>
                <h3 className={`font-medium ${style} `}>{name}</h3>
            </div>
        </div>
    )
}

export default UserAvatar