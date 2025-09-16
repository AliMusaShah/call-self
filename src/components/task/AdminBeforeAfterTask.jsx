import React from "react";
import Card from "./Card";
import Apartment from "../../assets/Apartment.png";

// Extracted MeterReading component for reusability
const MeterReading = ({ label, value, unit = "ppmv" }) => (
    <p className="text-sm text-gray-500">
        {label} <span className="font-medium">{value} {unit}</span>
    </p>
);

// Extracted InfoSection component for reusability
const InfoSection = ({ title, content }) => (
    <div className="mb-4">
        <div className="font-medium mb-1">{title}:</div>
        <p className="text-gray-700">{content}</p>
    </div>
);

// Extracted Question component for reusability
const Question = ({ question, answer, questionNumber }) => (
    <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Question#{questionNumber}: {question}
        </h4>
        <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-medium text-gray-800">Answer:</span> {answer}
        </p>
    </div>
);

// Extracted Finding component for reusability
const Finding = ({ finding, findingIndex }) => (
    <div>
        {/* Questions */}
        {finding?.questions?.map((question, questionIndex) => (
            <Question
                key={`${findingIndex}-${questionIndex}`}
                question={question.question}
                answer={question.answer}
                questionNumber={`${findingIndex + 1}.${questionIndex + 1}`}
            />
        ))}

        {/* Meter Readings */}
        {finding?.meterReadings && (
            <div className="mb-4">
                <div className="font-medium mb-2">Meter Readings:</div>
                <div className="flex justify-around mb-1">
                    {finding.meterReadings.co && (
                        <MeterReading label="Carbon Monoxide (CO)" value={finding.meterReadings.co} />
                    )}
                    {finding.meterReadings.co2 && (
                        <MeterReading label="Carbon Dioxide (CO2)" value={finding.meterReadings.co2} />
                    )}
                    {finding.meterReadings.h2o && (
                        <MeterReading label="Water Content (H2O)" value={finding.meterReadings.h2o} />
                    )}
                    {finding.meterReadings.ntp && (
                        <MeterReading label="Oil Mist (at NTP)" value={finding.meterReadings.ntp} />
                    )}
                </div>
            </div>
        )}

        {/* Standard Info Sections */}
        {finding?.standardInfo?.findings && (
            <InfoSection title="Findings" content={finding.standardInfo.findings} />
        )}
        {finding?.standardInfo?.recommendations && (
            <InfoSection title="Recommendations" content={finding.standardInfo.recommendations} />
        )}
        {finding?.standardInfo?.possibleRootCause && (
            <InfoSection title="Possible root cause(s)" content={finding.standardInfo.possibleRootCause} />
        )}
    </div>
);

// Extracted ReportSection component for reusability
const ReportSection = ({ item, index }) => (
    <React.Fragment key={index}>
        {/* Section Header */}
        <div className="flex justify-between items-center bg-[#F6F6F6] py-2">
            <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                    <img src={item?.image || Apartment} alt={item?.sectionName || "Section"} />
                </div>
                <h3 className="text-lg font-medium">{item?.sectionName}</h3>
            </div>
        </div>

        {/* Image Gallery */}
        <div className="flex gap-2 mb-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                    <img src={item?.image} alt={`Gallery ${i}`} />
                </div>
            ))}
        </div>

        {/* Findings */}
        {item?.findings?.map((finding, findingIndex) => (
            <Finding
                key={findingIndex}
                finding={finding}
                findingIndex={findingIndex}
            />
        ))}
    </React.Fragment>
);

// Extracted ReportCard component for reusability
const ReportCard = ({ data, label }) => (
    <div className="relative">
        <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-5 py-3 rounded">
            {label}
        </div>
        <Card>
            <div className="space-y-6">
                {data?.report?.map((item, index) => (
                    <ReportSection key={index} item={item} index={index} />
                ))}
            </div>
        </Card>
    </div>
);

// Main component
const AdminBeforeAfterTask = ({ preData, postData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#F6F6F6]">
            <ReportCard data={preData} label="Before" />
            <ReportCard data={postData} label="After" />
        </div>
    );
};

export default AdminBeforeAfterTask;