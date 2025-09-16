
const ChatHeader = ({ selectedConversation }) => {
    return (
        <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                    H
                </div>
                <div>
                    <h2 className="font-semibold text-gray-900">{selectedConversation}</h2>
                    <p className="text-sm text-gray-500">Last seen 10 minutes ago</p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader