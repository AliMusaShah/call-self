import { FastField, Field, FieldArray, useFormikContext } from "formik";
import CustomButton from "../../../components/CustomButton";
import AddGeneralAssets from "./AddGeneralAssets";
import { CiCamera } from "react-icons/ci";
import { PiTrashSimple } from "react-icons/pi";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddArea = ({ onClose, justSave }) => {
    const { setFieldValue, values } = useFormikContext();
    const [previewFiles, setPreviewFiles] = useState([]);
    const handleFileChange = (e, name) => {
        const files = Array.from(e.target.files);

        if (files.length > 0) {
            // Get current array
            const currentImages = name.split('.').reduce((obj, key) => obj?.[key], values) || [];

            // Append new files
            const updatedImages = [...currentImages, ...files];

            setFieldValue(name, updatedImages);

            // Create preview objects from files
            const newPreviewFiles = files.map(file => ({
                id: `${file.name}_${Date.now()}_${Math.random()}`, // Unique ID
                name: file.name,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                url: URL.createObjectURL(file),
                file: file // Keep reference to original file
            }));

            // Add to existing preview files
            setPreviewFiles(prev => [...prev, ...newPreviewFiles]);
        }
    };
    const removeFile = (fileId) => {
        setPreviewFiles(prev => {
            const fileToRemove = prev.find(f => f.id === fileId);
            const updatedFiles = prev.filter(f => f.id !== fileId);

            if (fileToRemove) {
                // Update form values - remove the original file from the form
                const updatedImages = values.findingImages?.filter(file => file !== fileToRemove.file) || [];
                setFieldValue('findingImages', updatedImages);

                // Revoke object URL to prevent memory leaks
                URL.revokeObjectURL(fileToRemove.url);
            }

            return updatedFiles;
        });
    };

    // console.log(values, 'values')
    return (

        <>
            <div className="flex flex-col gap-4">
                <AddGeneralAssets />
                <FieldArray name="report.areas">
                    {() =>
                        values.report.areas.map((area, areaIndex) => {
                            // const imageFieldName = `report.areas.${areaIndex}.${{
                            //     Room: "roomImages",
                            //     Bathroom: "bathroomImages",
                            //     Hall: "hallImages",
                            //     Kitchen: "kitchenImages",
                            // }[area.areaType] || "roomImages"}`;
                            return (
                                <>
                                    <div
                                        key={areaIndex}
                                        className="w-full flex flex-col gap-3 bg-gray-100 rounded-lg px-4 py-3 max-w-md"
                                    >

                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-medium">
                                                {area.areaType}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                <FieldArray name={`report.areas.${areaIndex}.details`}>
                                                    {({ push: pushRoom, remove: removeRoom }) => (
                                                        <div className="flex items-center gap-3">
                                                            <CustomButton
                                                                type="button"
                                                                disabled={area.details.length === 0}
                                                                onClick={() => {
                                                                    if (area.details.length > 0) {
                                                                        removeRoom(area.details.length - 1);
                                                                    }
                                                                }}
                                                            >
                                                                −
                                                            </CustomButton>

                                                            <span className="text-gray-800 font-semibold min-w-[2rem] text-center">
                                                                {area.details.length}
                                                            </span>

                                                            <CustomButton
                                                                type="button"
                                                                onClick={() => {
                                                                    pushRoom({
                                                                        customName: "",
                                                                        assets: [],
                                                                    });
                                                                }}
                                                            >
                                                                +
                                                            </CustomButton>
                                                        </div>
                                                    )}
                                                </FieldArray>


                                            </div>
                                        </div>
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
                                        <FieldArray name={`report.areas.${areaIndex}.details`}>
                                            {() =>
                                                area.details.map((room, roomIndex) => (
                                                    <div key={roomIndex} className=" ">
                                                        <div className="relative w-full">
                                                            <FastField
                                                                name={`report.areas.${areaIndex}.details.${roomIndex}.customName`}
                                                                placeholder={`Room ${roomIndex + 1} Name`}
                                                                className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />

                                                            <FieldArray name={`report.areas.${areaIndex}.areaImages`}>
                                                                {() => (
                                                                    <label className="hover:bg-blue-600 focus:outline-none cursor-pointer p-1 text-2xl text-white text-center bg-[var(--defaultBlue)] rounded-md absolute right-1 top-1">
                                                                        <span><CiCamera /></span>
                                                                        <FastField name={`report.areas.${areaIndex}.areaImages`}>
                                                                            {({ form: { setFieldValue, values } }) => (
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    multiple
                                                                                    className="sr-only"
                                                                                    onChange={(e) =>
                                                                                        handleFileChange(
                                                                                            e,
                                                                                            `report.areas.${areaIndex}.areaImages`,
                                                                                            setFieldValue,
                                                                                            values
                                                                                        )
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </FastField>
                                                                    </label>
                                                                )}
                                                            </FieldArray>
                                                        </div>

                                                        <FieldArray name={`report.areas.${areaIndex}.details.${roomIndex}.assets`}>
                                                            {({ push: pushAsset, remove: removeAsset }) => (
                                                                <>
                                                                    <CustomButton
                                                                        type="button"
                                                                        onClick={() => pushAsset({ name: "", })}
                                                                        size="sm"
                                                                        className="whitespace-nowrap my-2"
                                                                    >
                                                                        Add Asset
                                                                    </CustomButton>


                                                                    <div className="flex flex-col gap-2">
                                                                        {room.assets?.map((asset, assetIndex) => (
                                                                            <div key={assetIndex} className="flex gap-2 items-center mt-2 relative w-full">
                                                                                <FastField
                                                                                    name={`report.areas.${areaIndex}.details.${roomIndex}.assets.${assetIndex}.name`}
                                                                                    placeholder="Asset Name"
                                                                                    className="border p-2 rounded w-full"
                                                                                />
                                                                                <FieldArray name={`report.areas.${areaIndex}.assetImages`}>
                                                                                    {() => (
                                                                                        <label className="hover:bg-blue-600 focus:outline-none cursor-pointer p-1 text-2xl text-white text-center bg-[var(--defaultBlue)] rounded-md absolute right-[11%]">
                                                                                            <span><CiCamera /></span>
                                                                                            <FastField name={`report.areas.${areaIndex}.assetImages`}>
                                                                                                {({ form: { setFieldValue, values } }) => (
                                                                                                    <input
                                                                                                        type="file"
                                                                                                        accept="image/*"
                                                                                                        multiple
                                                                                                        className="sr-only"
                                                                                                        onChange={(e) =>
                                                                                                            handleFileChange(
                                                                                                                e,
                                                                                                                `report.areas.${areaIndex}.assetImages`,
                                                                                                                setFieldValue,
                                                                                                                values
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                )}
                                                                                            </FastField>
                                                                                        </label>
                                                                                    )}
                                                                                </FieldArray>
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


                                                    </div>
                                                ))
                                            }
                                        </FieldArray>
                                    </div>
                                </>
                            )
                        })
                    }
                </FieldArray>
                <div className="flex justify-end my-5">
                    <CustomButton
                        type="button"
                        className="mr-4 px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                        onClick={onClose}
                    >
                        Clear
                    </CustomButton>
                    <CustomButton
                        type="button"
                        className="px-6 py-2 text-white bg-defaultGreen rounded-md"
                        onClick={justSave}
                    >

                        Save
                    </CustomButton>
                </div>

            </div>
        </>

    );
};
{/* <label className=" hover:bg-blue-600 focus:outline-none cursor-pointer p-1 text-2xl text-white text-center bg-[var(--defaultBlue)] rounded-md absolute right-1">
                                                        <span className=" "><CiCamera /></span>
                                                        <input
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange(e, `report.areas.${areaIndex}.details.${roomIndex}.roomImages`)} // Handle file input change with Formik
                                                        />
                                                    </label> */}
export default AddArea;