import CustomLoader from "./CustomLoader"

const IsLoading = ({ isLoading }) => {
    if (isLoading) {
        // return <div>Loading...</div>
        return <CustomLoader />
    }
    return null
}

export default IsLoading