import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FiMessageCircle, FiSend } from 'react-icons/fi';
import ChatHeader from '../../../components/messages/ChatHeader';
import MessageBubble from '../../../components/messages/MessageBubble';
import MessageInput from '../../../components/messages/MessageInput';
import SearchBar from '../../../components/SearchBar';
import ConversationsList from '../../../components/messages/ConversationsList';
import { conversations, messages } from '../../../mock/data';
import TitleComponent from '../../../components/dashboard/shift/TitleComponnet';
import CustomLoader from '../../../components/CustomLoader';

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState('Harbor Rehabilitation Center');
    const [message, setMessage] = useState('');



    const handleSendMessage = () => {
        if (message.trim()) {
            setMessage('');
        }
    };
    const isLoading = false;
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <TitleComponent title="Messages" />
                    <div className="flex  bg-gray-50 h-full">
                        {/* Sidebar */}
                        <div className="w-80 bg-white border-r border-gray-200 flex flex-col ">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 flex-shrink-0">
                                <div className="flex items-center gap-2 mb-4">
                                    <FiMessageCircle className="w-5 h-5 text-gray-600" />
                                    <h1 className="font-semibold text-gray-900">Conversations</h1>
                                    <div className="w-2 h-2 bg-red-500 rounded-full ml-auto"></div>
                                </div>
                                <SearchBar />
                            </div>

                            {/* Conversations List */}
                            <div className="flex-1 overflow-y-auto">
                                {conversations.map((conversation) => (
                                    <ConversationsList
                                        key={conversation.id}
                                        id={conversation.id}
                                        avatar={conversation.avatar}
                                        avatarBg={conversation.avatarBg}
                                        selectedConversation={selectedConversation}
                                        unread={conversation.unread}
                                        time={conversation.time}
                                        preview={conversation.preview}
                                        onClick={() => setSelectedConversation(conversation.id)}

                                    />
                                ))}
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 flex flex-col ">
                            <ChatHeader selectedConversation={selectedConversation} />
                            <MessageBubble messages={messages} />
                            <MessageInput
                                message={message}
                                onChange={(e) => setMessage(e.target.value)}
                                handleSendMessage={handleSendMessage}
                            />
                        </div>
                    </div>
                </>
            )}



        </>
    )
}

export default Messages