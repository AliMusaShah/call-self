import { useFormikContext } from "formik";
import { useState } from "react";
import { FaEdit, FaUpload, FaUser } from "react-icons/fa";
import FormErrorMessage from "../../../components/FormErrorMessage";
import WorkImg from '../../../assets/icons/work.svg';
import { CiEdit } from "react-icons/ci";


const UploadProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const { setFieldValue } = useFormikContext();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePhoto(file);
            setFieldValue('profilePhoto', file);
        }
    };
    const handleEditPhoto = () => {
        document.getElementById('profilePhotoInput').click();
    };
    const getPhotoSrc = () => {
        if (profilePhoto) {
            if (typeof profilePhoto === 'string') {
                return profilePhoto; // URL string
            } else if (profilePhoto instanceof File) {
                return URL.createObjectURL(profilePhoto); // File object
            }
        }
        return null;
    };
    return (
        <>


            <div className="w-32 h-32 mx-auto rounded-full border-4 border-orange-500 flex items-center justify-center bg-[#F9F9F9] overflow-hidden">
                {profilePhoto ? (
                    <img
                        src={getPhotoSrc()}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img
                        src={WorkImg}
                        alt="work"
                        className="w-10 h-10 object-cover"

                    />
                )}
            </div>
            {/* Upload/Edit Buttons */}
            <div className="flex justify-center space-x-4 " disabled={profilePhoto}>
                <label htmlFor="profilePhotoInput" className="cursor-pointer">
                    <div className="flex items-center px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <FaUpload className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-gray-700">Upload Logo</span>
                    </div>
                </label>

                {/* {showEditButton && ( */}
                <button
                    type="button"
                    onClick={handleEditPhoto}
                    className={`flex items-center px-6 py-2 border border-gray-300 rounded-md transition-colors ${profilePhoto
                        ? 'hover:bg-gray-50 text-gray-700'
                        : 'text-gray-400 cursor-not-allowed'
                        }`}
                    disabled={!profilePhoto}
                >
                    <CiEdit className="w-4 h-4 mr-2" />
                    <span>Edit Logo</span>
                </button>
                {/* )} */}
            </div>
            <input
                id="profilePhotoInput"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, setFieldValue)}
                className="hidden"
            />

            {/* Error Message */}
            <FormErrorMessage name="profilePhoto" />
        </>
    )
}

export default UploadProfile