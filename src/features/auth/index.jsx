import React, { useState } from 'react'
import LoginPage from './components/LoginPage'
import AuthLayout from '../../ui/AuthLayout'
import CustomButton from '../../components/CustomButton'
import TabNavigation from '../../components/TabNavigation'
// import SignUp from './components/SignUp'

const AuthScreen = () => {
    const tabs = ['Sign In', 'Sign Up']
    const [activeTab, setActiveTab] = useState(tabs[0])

    const onTabChange = (tab) => {
        setActiveTab(tab)
    }
    console.log(activeTab, 'activeTab')
    return (
        <AuthLayout>
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
            />
            {activeTab === 'Sign In' ? <LoginPage /> : 'sign up'}
            {/* <SignUp /> */}
        </AuthLayout>
    )
}

export default AuthScreen