import React from 'react'
import { FiSend } from 'react-icons/fi'

const MessageInput = ({ message, onChange, handleSendMessage }) => {
    return (
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={onChange}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    <FiSend className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default MessageInput