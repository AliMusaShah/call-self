import { useState } from 'react';

const StatusToggle = ({ row, onToggle }) => {
    const [isToggled, setIsToggled] = useState(row?.status === 'true');

    const handleToggle = async (e) => {
        const isChecked = e.target.checked;
        const newState = isChecked;

        setIsToggled(newState);

        const payload = {
            status: newState
        };
        try {
            await onToggle(row, payload);

        } catch (error) {
            console.error('Error updating status:', error);
            setIsToggled(!isToggled);

        }
    }
    return (
        <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isToggled}
                    onChange={handleToggle}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--defaultBlue)]">
                </div>
            </label>
        </div>
    )
}

export default StatusToggle