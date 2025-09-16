import { FastField, Field, FieldArray, useFormikContext } from 'formik'
import CustomButton from '../../../components/CustomButton'
import { CiCamera } from 'react-icons/ci'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const AddGeneralAssets = () => {
    const { values, setFieldValue } = useFormikContext()
    const [previewFiles, setPreviewFiles] = useState([]);
    // const handleFileChange = (e, name) => {
    //     const files = e.target.files;
    //     if (files && files.length > 0) {
    //         setFieldValue(name, files[0]);
    //     }

    // };
    const handleMultipleFileChange = (event, name) => {
        const files = Array.from(event.target.files);

        // Get existing files from form state
        const existingImages = values.findingImages || [];

        // Process new files
        const newFiles = [];
        const newPreviews = [];

        files.forEach((file, index) => {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                newFiles.push(file);

                const fileId = Date.now() + index;

                if (file.type.startsWith('image/')) {
                    // Create preview for images
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setPreviewFiles(prev => [...prev, {
                            id: fileId,
                            type: 'image',
                            url: e.target.result,
                            name: file.name,
                            file: file
                        }]);
                    };
                    reader.readAsDataURL(file);
                } else if (file.type.startsWith('video/')) {
                    // Create preview for videos
                    const videoUrl = URL.createObjectURL(file);
                    newPreviews.push({
                        id: fileId,
                        type: 'video',
                        url: videoUrl,
                        name: file.name,
                        file: file
                    });
                }
            }
        });

        // Add video previews immediately
        if (newPreviews.length > 0) {
            setPreviewFiles(prev => [...prev, ...newPreviews]);
        }

        // Update form values
        setFieldValue(name, [...existingImages, ...newFiles]);

        // Clear the input
        event.target.value = '';
    };
    const removeFile = (fileId) => {
        setPreviewFiles(prev => {
            const fileToRemove = prev.find(f => f.id === fileId);
            const updatedFiles = prev.filter(f => f.id !== fileId);

            if (fileToRemove) {
                // Update form values
                const updatedImages = values.findingImages?.filter(file => file !== fileToRemove.file) || [];
                setFieldValue('findingImages', updatedImages);

                // Revoke object URL for videos to prevent memory leaks
                if (fileToRemove.type === 'video') {
                    URL.revokeObjectURL(fileToRemove.url);
                }
            }

            return updatedFiles;
        });
    };





    return (
        <>
            <FieldArray name={`report.generalAssets`}>
                {({ push: pushAsset, remove: removeAsset }) => (
                    <>
                        <div className="flex items-center justify-end">
                            <CustomButton
                                size='md'
                                variant='primary'
                                className='mt-2 inline-block'
                                onClick={() => pushAsset({ name: "" })}
                            >
                                + Add General Asset
                            </CustomButton>
                        </div>
                        {previewFiles.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Added General Assets Files:</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {previewFiles.map((file) => (
                                        <div key={file.id} className="relative group">
                                            <div className="relative overflow-hidden rounded-lg border border-gray-200">
                                                {file.type === 'image' ? (
                                                    <img
                                                        src={file.url}
                                                        alt={file.name}
                                                        className="w-full h-24 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-24 bg-gray-100 flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="text-2xl mb-1">🎥</div>
                                                            <div className="text-xs text-gray-600 truncate px-1">
                                                                {file.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Remove button */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(file.id)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                >
                                                    <IoClose size={16} />
                                                </button>
                                            </div>

                                            {/* File name */}
                                            <div className="mt-1 text-xs text-gray-600 truncate">
                                                {file.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            {values?.report?.generalAssets?.map((asset, assetIndex) => (
                                <div key={assetIndex} className="flex gap-2 items-center mt-2 relative w-full">
                                    <FastField
                                        name={`report.generalAssets.${assetIndex}.name`}
                                        placeholder={`Name Asset ${assetIndex + 1}`}
                                        className="border p-2 rounded w-full"
                                    />
                                    <label className="hover:bg-blue-600 focus:outline-none cursor-pointer p-1 text-2xl text-white text-center bg-[var(--defaultBlue)] rounded-md absolute right-[11%]">
                                        <span><CiCamera /></span>
                                        <FieldArray name={`report.generalAssetImages`}>

                                            <FastField name={`report.generalAssetImages.${assetIndex}`}>
                                                {() => (
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        className="sr-only"
                                                        onChange={(e) =>
                                                            handleMultipleFileChange(
                                                                e,
                                                                `report.generalAssetImages.${assetIndex}`,
                                                            )
                                                        }
                                                    />
                                                )}
                                            </FastField>
                                        </FieldArray>
                                    </label>
                                    <CustomButton
                                        type="button"
                                        variant="danger"
                                        onClick={() => removeAsset(assetIndex)}
                                    >
                                        X
                                    </CustomButton>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </FieldArray>

        </>
    )
}

export default AddGeneralAssets