import { Field } from "formik";

const DateTimeField = ({ question, name, setFieldValue, getOptionsForQuestionType }) => {
    if (question?.questionType !== 'Date / Time') {
        return null;
    }

    const defaultSettings = getOptionsForQuestionType('Date / Time');
    const currentSettings = question.dateTimeOptions || defaultSettings;
    const handleSettingChange = (settingKey, value) => {
        const updatedSettings = {
            ...currentSettings,
            [settingKey]: value
        };

        setFieldValue(`${name}.dateTimeOptions`, updatedSettings);
    };
    return (
        <div className="space-y-3 flex justify-between">
            {/* Collection Options */}
            <div className="flex gap-4 items-center">
                <label className="text-gray-700 font-medium">Collect:</label>

                <label className="flex items-center gap-2">
                    <Field
                        type="checkbox"
                        name={`${name}.dateTimeOptions.collectDate`}
                        checked={currentSettings.collectDate}
                        onChange={(e) => handleSettingChange('collectDate', e.target.checked)}
                        className="border-gray-400"
                    />
                    <span className="text-gray-700">Date Info</span>
                </label>

                <label className="flex items-center gap-2">
                    <Field
                        type="checkbox"
                        name={`${name}.dateTimeOptions.collectTime`}
                        checked={currentSettings.collectTime}
                        onChange={(e) => handleSettingChange('collectTime', e.target.checked)}
                        className="border-gray-400"
                    />
                    <span className="text-gray-700">Time Info</span>
                </label>
            </div>

            {/* Date Format Options - Conditional */}

            <div className='flex'>
                <div className="flex gap-4 items-center ml-4">
                    <label className="text-gray-700 font-medium">Date Format:</label>
                    <label className="flex items-center gap-2">
                        <Field
                            type="radio"
                            name={`${name}.dateTimeOptions.dateFormat`}
                            value="DD/MM/YYYY"
                            checked={currentSettings.dateFormat === 'DD/MM/YYYY'}
                            onChange={() => handleSettingChange('dateFormat', 'DD/MM/YYYY')}
                            className="border-gray-400"
                        />
                        <span className="text-gray-700">DD/MM/YYYY</span>
                    </label>
                </div>
                <div className="flex gap-4 items-center ml-4">
                    <label className="text-gray-700 font-medium">Date Format:</label>
                    <label className="flex items-center gap-2">
                        <Field
                            type="radio"
                            name={`${name}.dateTimeOptions.dateFormat`}
                            value="MM/DD/YYYY"
                            checked={currentSettings.dateFormat === 'MM/DD/YYYY'}
                            onChange={() => handleSettingChange('dateFormat', 'MM/DD/YYYY')}
                            className="border-gray-400"
                        />
                        <span className="text-gray-700">MM/DD/YYYY</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default DateTimeField