
const Title = ({ heading, description }) => {
    return (
        <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{heading}</h1>
            <p className="text-gray-500">{description}</p>
        </div>
    )
}

export default Title