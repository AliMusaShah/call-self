import { useFormikContext } from 'formik';
import React, { useState } from 'react'
import { CiCamera } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
const ImageVideoUploader = () => {
    const { setFieldValue, values } = useFormikContext();
    const [previewFiles, setPreviewFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        // Get existing files from form state
        const existingImages = values.report?.addedImages || [];
        const existingVideos = values.report?.addedVideos || [];

        // Separate new files into images and videos
        const newImages = [];
        const newVideos = [];
        const newPreviews = [];

        files.forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                newImages.push(file);
                // Create preview for images
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewFiles(prev => [...prev, {
                        id: Date.now() + index,
                        type: 'image',
                        url: e.target.result,
                        name: file.name,
                        file: file
                    }]);
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('video/')) {
                newVideos.push(file);
                // Create preview for videos
                const videoUrl = URL.createObjectURL(file);
                newPreviews.push({
                    id: Date.now() + index,
                    type: 'video',
                    url: videoUrl,
                    name: file.name,
                    file: file
                });
            }
        });

        // Add video previews immediately (no need for FileReader)
        if (newPreviews.length > 0) {
            setPreviewFiles(prev => [...prev, ...newPreviews]);
        }

        // Update form values
        setFieldValue('report.addedImages', [...existingImages, ...newImages]);
        setFieldValue('report.addedVideos', [...existingVideos, ...newVideos]);

        // Clear the input
        event.target.value = '';
    };

    const removeFile = (fileId) => {
        setPreviewFiles(prev => {
            const fileToRemove = prev.find(f => f.id === fileId);
            const updatedFiles = prev.filter(f => f.id !== fileId);

            if (fileToRemove) {
                // Update form values
                if (fileToRemove.type === 'image') {
                    const updatedImages = values.report.addedImages.filter(img => img !== fileToRemove.file);
                    setFieldValue('report.addedImages', updatedImages);
                } else if (fileToRemove.type === 'video') {
                    const updatedVideos = values.report.addedVideos.filter(vid => vid !== fileToRemove.file);
                    setFieldValue('report.addedVideos', updatedVideos);
                    // Revoke object URL to prevent memory leaks
                    URL.revokeObjectURL(fileToRemove.url);
                }
            }

            return updatedFiles;
        });
    };
    return (
        <>
            <div className='flex justify-between items-center gap-2'>
                <h3 className="font-bold">Premises Details</h3>
                <div className="inline-flex gap-4 justify-center sm:justify-start">
                    <label className="flex items-center gap-1 p-2 text-white text-center bg-[var(--defaultBlue)] rounded-md focus:outline-none cursor-pointer hover:bg-blue-600 transition-colors">
                        <CiCamera color='white' size={22} />
                        <span>Add Image / Video</span>
                        <input
                            type="file"
                            className="sr-only"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>
            {/* File Previews */}
            {previewFiles.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Added Files:</h4>
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
        </>
    )
}

export default ImageVideoUploader