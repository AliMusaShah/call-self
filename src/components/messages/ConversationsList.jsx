
const ConversationsList = ({ id, avatar, avatarBg, selectedConversation, unread, time, preview, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedConversation === id ? 'bg-blue-50 border-r-2 border-r-orange-500' : ''
                }`}
        >
            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center text-white font-semibold text-sm`}>
                    {avatar}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 text-sm truncate">
                            {name}
                        </h3>
                        {unread && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{time}</p>
                    <p className="text-sm text-gray-600 truncate">{preview}</p>
                </div>
            </div>
        </div>
    )
}

export default ConversationsList