import QRCode from "react-qr-code";
import { useGetCertificateByIdQuery } from "../../../api/apiSlice";
import CustomLoader from "../../../components/CustomLoader";
import StarRating from "../components/StarRating";

const CertificateDetail = ({ id }) => {
    const { data: certificateDetial, isLoading } = useGetCertificateByIdQuery(id)
    // console.log(certificateDetial?.data, 'customer_address')
    return (
        <>
            {isLoading ? <CustomLoader /> : (<div className=" p-6 bg-white rounded-2xl ">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Clear IEQ</h2>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Customer:</span>
                        <span>{certificateDetial?.data?.customer?.data?.customer_first_name} {certificateDetial?.data?.customer?.data?.customer_last_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Address:</span>
                        <span>{`${certificateDetial?.data?.customer?.data?.customer_address?.street} ${certificateDetial?.data?.customer?.data?.customer_address?.city} `}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Certification Type:</span>
                        <span>{certificateDetial?.data?.certificateType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-500">Current Rating:</span>
                        <span className="flex items-center">
                            <StarRating rating={certificateDetial?.data?.currentRating} />
                            <span className="text-gray-800 ml-2">
                                {certificateDetial?.data?.currentRating || 0}/5
                            </span>
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Status:</span>
                        <span className="text-green-600 font-semibold">{certificateDetial?.data?.ratingType}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Created Date:</span>
                        <span>{certificateDetial?.data?.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Expired Date:</span>
                        <span>{certificateDetial?.data?.expiredDate}</span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <div className="flex justify-center">
                        <QRCode value={certificateDetial?.data?.QRCode || 0} size={100} />
                    </div>
                    <p className="text-sm text-gray-600">Scan me</p>
                </div>
            </div>
            )
            }
        </>
    );
}

export default CertificateDetail