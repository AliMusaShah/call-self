import { legendItems } from '../mock/data'

const ProgressBar = () => {
    return (
        <div className="flex h-4 bg-gray-100 rounded-lg overflow-hidden">
            {legendItems.map((item, index) => (
                <div
                    key={index}
                    className={`${item.color}`}
                    style={{ width: item.progress }}
                ></div>
            ))}
        </div>
    )
}

export default ProgressBar