import { Children } from "react";
import MeterReadingsReport from "./MeterReadingsReport";

export default function FindingsReport({ data, children }) {
    // console.log(data, 'MeterReadingsReport Data');
    const { standardInfo } = data;
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg ">
            <div className="flex gap-6">
                {/* Image Section */}
                <div className="flex-shrink-0">
                    <img
                        src={data?.image}
                        alt="Meter Device"
                        className="h-full  object-center rounded"
                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-4">
                    {/* <MeterReadingsReport /> */}
                    {children}
                    {/* {Object.entries(standardInfo).map(([sectionName, count]) => (
                        <div className="flex items-center gap-1">
                            <h3 className="font-semibold text-gray-800 mb-2">{sectionName}:</h3>
                            <p className="text-sm text-gray-700">
                                {count}
                            </p>
                        </div>
                    ))} */}
                    {/* Findings */}
                    {standardInfo?.findings && (
                        <div className="flex gap-1 mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Findings:</h3>
                            <p className="text-sm text-gray-700 text-justify leading-relaxed">
                                {standardInfo.findings}
                            </p>
                        </div>
                    )}

                    {/* Root Causes */}
                    {standardInfo?.possibleRootCause && <div className="flex  gap-1">
                        <div className="flex gap-1 mb-4">
                            <h3 className="font-semibold text-gray-800 mb-2">possibleRootCause:</h3>
                            <p className="text-sm text-gray-700 text-justify leading-relaxed">
                                {standardInfo?.possibleRootCause}
                            </p>
                        </div>
                    </div>}

                    {/* Recommendations */}
                    {standardInfo?.recommendations && (
                        <div className="flex gap-1">
                            <h3 className="font-semibold text-gray-800 mb-2">Recommendations:</h3>
                            <div className=" rounded-lg">
                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                                    {standardInfo.recommendations
                                        .split(/\d+\.\s/)
                                        .filter(item => item.trim() !== '')
                                        .map((rec, index) => (
                                            <li key={index} className="leading-relaxed">
                                                {rec.trim()}
                                            </li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>

    );
}