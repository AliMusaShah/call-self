import React from 'react'

const Avatar = ({ name }) => {
    return (
        <div className='flex items-center gap-2'>
            <img class="inline-block size-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <h1 className="text-xl font-bold text-gray-900">{name}</h1>
        </div>
    )
}

export default Avatar