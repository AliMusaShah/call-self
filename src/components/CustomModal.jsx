import { RxCross2 } from 'react-icons/rx';
import CustomButton from '../components/CustomButton';
// import Cross from '../assets/cross.png'

const CustomModal = ({ isOpen, title, children, onClose, }) => {

    if (!isOpen) return null;

    return (
        <div
            className="fixed  left-0 top-0 z-[1055] bord h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            aria-labelledby="modalTitle"
            aria-modal="true"
            role="dialog">
            <div
                className="pointer-events-none  relative flex min-h-[calc(100%-1rem)] w-auto items-center min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                <div
                    className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4">
                        {/* Modal title */}
                        <div className='flex items-center'>
                            <div className='w-4 h-8 bg-[var(--defaultBlue)] rounded-md mr-2'></div>
                            <h5
                                className="text-xl font-medium leading-normal text-gray-800"
                                id="modalTitle">
                                {title}
                            </h5>
                        </div>
                        {/* Close button */}
                        <CustomButton
                            type="button"
                            onClick={onClose}
                            variant="cross"
                        >
                            <RxCross2 size={22} />

                        </CustomButton>
                    </div>

                    {/* Modal body */}
                    <div className="relative p-4">
                        {children}
                    </div>

                    {/* Modal footer */}
                    {/* <div
                        className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4">
                        <button
                            type="button"
                            className="inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-200 focus:bg-blue-200 focus:outline-none focus:ring-0 active:bg-blue-200"
                            onClick={onClose}>
                            Close
                        </button>
                        <button
                            type="button"
                            className="ms-1 inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
                            Save changes
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};



export default CustomModal;
