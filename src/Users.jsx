import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { devUrl, token, useLocalStorage } from './utils'
const Users = () => {

    const [keywordValue, setKeywordValue] = useState("");

    const dateFoemate = (date_time) => {
        const dateObject = new Date(date_time);

        // Extract year, month, and day components
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');

        // Create the formatted date string
        return `${year}-${month}-${day}`;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const [localPage, setLocalPage] = useState(currentPage);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const item = localStorage.getItem('user');
    const user = item ? JSON.parse(item) : '';
    const [users, setUsers] = useState(null);

    const [name] = useLocalStorage('user')
    useEffect(() => {
        setLocalPage(currentPage);
    }, [currentPage]);
    const pageChange = (currentPage) => {
        setCurrentPage(currentPage);
    }
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== localPage) {
            setLocalPage(pageNumber);
            pageChange(pageNumber);
        }
    };

    const nextPage = () => {
        if (localPage < totalPages) {
            goToPage(localPage + 1);
        }
    };

    const previousPage = () => {
        if (localPage > 1) {
            goToPage(localPage - 1);
        }
    };


    useEffect(() => {
        fetchUsers({ search: keywordValue, pageNumber: currentPage, pageSize: itemsPerPage });
    }, []);
    useEffect(() => {
        fetchUsers({ search: keywordValue, pageNumber: currentPage, pageSize: itemsPerPage });
    }, [keywordValue]);



    useEffect(() => {
        setCurrentPage(1)
    }, [keywordValue])


    useEffect(() => {
        fetchUsers({ search: keywordValue, pageNumber: currentPage, pageSize: itemsPerPage })
    }, [currentPage]);

    // Fetch users from API
    const fetchUsers = async (params) => {
        try {
            const queryString = Object.keys(params)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join('&');

            // Append the query string to the URL
            const url = `${devUrl}users/list?${queryString}`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${user?.api_key}`,
                    'ngrok-skip-browser-warning': true
                },
            });
            const data = await response.json();
            setUsers(data);
            setTotalItems(data?.totalCount);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    return (
        <div className='min-h-full overflow-hidden'>

            <div className='container px-5 pb-24 pt-7 mx-auto '>

                <div className="col-span-full xl:col-span-8  shadow-lg rounded-sm ">
                    <div className="">
                        {/* Table */}
                        <div>
                            <h1 className='text-center font-bold text-xl text-black mb-10'>Users Table</h1>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full ">
                                {/* Table header */}
                                <thead className="text-xs uppercase">
                                    <tr>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="font-semibold whitespace-nowrap text-left">Acc. Name</div>
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="font-semibold whitespace-nowrap text-left">Acc. Number</div>
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="font-semibold whitespace-nowrap text-leftr">Acc. Balance</div>
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="font-semibold whitespace-nowrap text-left">Acc. Equilty</div>
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="font-semibold whitespace-nowrap text-left">Total P/L</div>
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="font-semibold whitespace-nowrap text-left">Buy Lot</div>
                                        </th>
                                        <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <div className="font-semibold whitespace-nowrap text-left">Sell Lot</div>
                                        </th>
                                    </tr>
                                </thead>
                                {/* Table body */}
                                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                    {/* Row */}
                                    {users?.data?.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                                    <div className="flex items-center">

                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-nowrap">
                                                                {item?.account_name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                                    <p className="text-gray-900 whitespace-nowrap">{item?.account_number}</p>
                                                </td>
                                                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                                    <p className="text-gray-900 whitespace-nowrap">
                                                        {item?.account_balance}
                                                    </p>
                                                </td>
                                                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                                    <p className="text-gray-900 whitespace-nowrap">{item?.account_equity}</p>
                                                </td>
                                                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                                    <p className="text-gray-900 whitespace-nowrap">{item?.total_pl}</p>
                                                </td>
                                                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                                    <p className="text-gray-900 whitespace-nowrap">{item?.buy_lot}</p>
                                                </td>
                                                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                                    <p className="text-gray-900 whitespace-nowrap">{item?.sell_lot}</p>
                                                </td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <>
                    <div className='flex justify-end'>
                        <nav aria-label="Pagination" className="inline-flex  -space-x-px rounded-md mt-3 shadow-sm bg-gray-300 dark:text-gray-100">

                            <button onClick={previousPage} className={`inline-flex items-center ${localPage === 1 ? 'disable' : ''} px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-700`}>
                                <span className="sr-only">Previous</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            {localPage > 1 && (
                                <button onClick={() => goToPage(1)} aria-current="page" className={`inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700 ${localPage === 1 ? 'bg-indigo-400' : ''}`}>1</button>
                            )}
                            {localPage > 3 && (
                                <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700">...</button>
                            )}
                            {localPage > 2 && (
                                <button onClick={() => goToPage(localPage - 1)} className={`inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700 ${localPage - 1 === currentPage ? 'bg-indigo-400' : ''}`}>{localPage - 1}</button>
                            )}
                            <button className={`inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700 ${localPage === currentPage ? 'bg-indigo-400' : ''}`}>{localPage}</button>

                            {localPage < totalPages - 1 && (
                                <button onClick={() => goToPage(localPage + 1)} className={`inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700 ${localPage + 1 === currentPage ? 'bg-indigo-400' : ''}`}>{localPage + 1}</button>
                            )}
                            {localPage < totalPages - 2 && (
                                <button className="inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700">...</button>
                            )}
                            {localPage < totalPages && (
                                <button onClick={() => goToPage(totalPages)} className={`inline-flex items-center px-4 py-2 text-sm font-semibold border dark:border-gray-700 ${totalPages === currentPage ? 'bg-indigo-400' : ''}`}>{totalPages}</button>
                            )}
                            <button onClick={nextPage} className={`inline-flex items-center px-2 py-2 text-sm ${localPage === totalPages ? 'disable' : ''} font-semibold border rounded-r-md dark:border-gray-700`}>
                                <span className="sr-only">Next</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </nav>
                    </div>
                </>
            </div>

        </div>
    )
}

export default Users;