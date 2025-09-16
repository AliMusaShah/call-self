import { useEffect, useState } from "react";
import NextBtn from '../assets/next.png';
import PreviosBtn from '../assets/previos.png';

const Pagination = ({ totalCount, totalPages, currentPage, onPageChange, }) => {
    const [currentPageState, setCurrentPageState] = useState(currentPage);
    const postsPerPage = 10;

    useEffect(() => {
        setCurrentPageState(currentPage);
    }, [currentPage]);

    const indexOfLastPost = currentPageState * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginateFront = () => {
        if (currentPageState < totalPages) {
            const newPage = currentPageState + 1;
            setCurrentPageState(newPage);
            onPageChange(newPage);
        }
    };

    const paginateBack = () => {
        if (currentPageState > 1) {
            const newPage = currentPageState - 1;
            setCurrentPageState(newPage);
            onPageChange(newPage);
        }
    };


    const setPage = (pageNumber) => {
        setCurrentPageState(pageNumber);
        onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPageState - 1 && i <= currentPageState + 1)) {
                pageNumbers.push(
                    <li key={i}>
                        <button
                            onClick={() => setPage(i)}
                            className={`px-3 py-2 leading-tight cursor-pointer ${i === currentPageState ? 'text-white bg-[var(--defaultBlue)]  rounded-[8px]' : 'text-gray-500 bg-white '} `}
                        >
                            {i}
                        </button>
                    </li>
                );
            } else if (i === currentPageState - 2 || i === currentPageState + 2) {
                pageNumbers.push(
                    <li key={i}>
                        <span className="px-3 py-2 leading-tight text-gray-500">...</span>
                    </li>
                );
            }
        }
        return pageNumbers;
    };
    return (
        totalCount != 0 ? (<div className="py-2">
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-700 flex gap-1">
                    Showing
                    <span className="font-medium">{indexOfFirstPost + 1}</span> to{" "}
                    <span className="font-medium">
                        {Math.min(indexOfLastPost, totalCount)}
                    </span>{" "}
                    of <span className="font-medium">{totalCount}</span> Lists
                </p>

                <div className="flex justify-center mt-4">
                    <nav aria-label="Pagination">
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <button
                                    onClick={paginateBack}
                                    disabled={currentPageState === 1}
                                    className={`px-3 py-2 ml-0 leading-tight text-lightBlue text-3xl bg-white rounded-l-lg ${currentPageState === 1 && 'cursor-not-allowed opacity-50'}`}
                                >
                                    <img src={PreviosBtn} alt="Previous" />
                                </button>
                            </li>
                            {renderPageNumbers()}
                            <li>
                                <button
                                    onClick={paginateFront}
                                    disabled={currentPageState === totalPages}
                                    className={`px-3 py-2 leading-tight text-gray-500 bg-white rounded-r-lg ${currentPageState === totalPages && 'cursor-not-allowed opacity-50'}`}
                                >
                                    <img src={NextBtn} alt="Next" />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>) : (<p className="text-center p-4">No data Found </p>)
    );
};
export default Pagination;
