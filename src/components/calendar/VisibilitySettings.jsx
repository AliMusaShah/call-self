import React, { useState } from 'react'
import Header from '../preview/Header'
import ToggleButton from '../ToggleButton'

const VisibilitySettings = () => {
    const [settings, setSettings] = useState({
        notifyShiftMatches: true,
        showToAllClinics: true,
        autoAcceptShifts: true
    });

    const settingsConfig = [
        {
            key: 'notifyShiftMatches',
            label: 'Notify me when a shift matches',
            value: settings.notifyShiftMatches
        },
        {
            key: 'showToAllClinics',
            label: 'Show to all clinics',
            value: settings.showToAllClinics
        },
        {
            key: 'autoAcceptShifts',
            label: 'Auto-accept shifts',
            value: settings.autoAcceptShifts
        }
    ];


    const toggleSetting = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };
    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4  flex-1 `}>
            <Header title="Visibility Settings" subtitle="Control how clinics see your availability" />
            <div className="space-y-6">
                {settingsConfig.map((setting) => (
                    <ToggleButton
                        key={setting.key}
                        title={setting.label}
                        isOn={setting.value}
                        onToggle={() => toggleSetting(setting.key)}
                    />
                ))}
            </div>

        </div>
    )
}

export default VisibilitySettings