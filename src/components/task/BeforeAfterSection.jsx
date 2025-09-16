import BeforeScopeOfWork from "../../features/inspector/components/BeforeScopeOfWork";
import { isImageUrl } from "../../utils/Helper";
import Card from "./Card";

const BeforeAfterSection = ({ data, children, }) => {
    console.log(data, ' post pre data');
    const { standardInfo } = data
    // console.log(sow, 'sow');
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  p-4 bg-[#F6F6F6]">
                <div className="relative">
                    <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-5 py-3 rounded">Before</div>
                    <Card>
                        <div className="flex gap-2 mb-4">
                            {/* {[1, 2, 3].map((i) => ( */}
                            <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                                <img src={data?.image} alt="" />
                            </div>
                            {/* ))} */}
                        </div>
                        <div className="space-y-6">
                            {data?.questions?.map((item, index) => (
                                <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                        Question#{index + 1}: {item.question}
                                    </h4>

                                    {isImageUrl(item.answer) ? (
                                        <img
                                            src={item.answer}
                                            alt="Answer image"
                                            width={200}
                                            height={150}

                                        />
                                    ) : (
                                        <p className="text-sm text-gray-700 leading-relaxed ">
                                            <span className="font-medium text-gray-800">Answer:</span> {item.answer}
                                        </p>)

                                    }
                                </div>
                            ))}
                        </div>

                        {data?.meterReadings && <div className="mb-4">
                            <div className="font-medium mb-2">Meter Readings:</div>
                            <div className="flex justify-around mb-1">
                                {data?.meterReadings?.co && <p className="text-sm text-gray-500">Carbon Monoxide (CO) <span className="font-medium">{data?.meterReadings?.co} ppmv</span></p>}
                                {data?.meterReadings?.co2 && <p className="text-sm text-gray-500">Carbon Dioxide (CO2) <span className="font-medium">{data?.meterReadings?.co2} ppmv</span></p>}
                                {data?.meterReadings?.h2o && <p className="text-sm text-gray-500">Water Content (H2O) <span className="font-medium">{data?.meterReadings?.h2o} ppmv</span></p>}
                                {data?.meterReadings?.ntp && <p className="text-sm text-gray-500">Oil Mist (at NTP) <span className="font-medium">{data?.meterReadings?.ntp} ppmv</span></p>}
                            </div>

                        </div>}

                        {standardInfo?.findings && <div className="mb-4">
                            <div className="font-medium mb-1">Findings:</div>
                            <p className="text-gray-700">{standardInfo?.findings}</p>
                        </div>}

                        {standardInfo?.possibleRootCause && <div className="mb-4">
                            <div className="font-medium mb-1">Possible root cause(s):</div>
                            <p className="text-gray-700">{standardInfo?.possibleRootCause}</p>
                        </div>}

                        {standardInfo?.recommendations && (
                            <div className="">
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
                    </Card>
                </div>
                <div className="relative">
                    <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-5 py-3 rounded">After</div>
                    <Card>

                        <div className="space-y-6">
                            {children}
                        </div>

                    </Card>
                </div>
            </div>
            {/* <div>
                <BeforeScopeOfWork data={sow} />
            </div> */}
        </>
    );
};
export default BeforeAfterSection;