import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoanHistory } from '../features/loanSlice';

const LoanHistory = () => {
    const dispatch = useDispatch();
    const { loanHistory } = useSelector((state) => state.loans);

    React.useEffect(() => {
        dispatch(fetchLoanHistory());
    }, [dispatch]);

    return (
        <div className="bg-white p-6 border border-gray-300 rounded shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Loan History</h3>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 text-sm text-left font-medium text-gray-700">Book Title</th>
                        <th className="py-2 px-4 text-sm text-left font-medium text-gray-700">User</th>
                        <th className="py-2 px-4 text-sm text-left font-medium text-gray-700">Date Borrowed</th>
                        <th className="py-2 px-4 text-sm text-left font-medium text-gray-700">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loanHistory.map((loan) => (
                        <tr key={loan._id}>
                            <td className="py-2 px-4 text-sm text-gray-700">{loan.book.title}</td>
                            <td className="py-2 px-4 text-sm text-gray-700">{loan.user.name}</td>
                            <td className="py-2 px-4 text-sm text-gray-700">{loan.borrowedDate}</td>
                            <td className="py-2 px-4 text-sm text-gray-700">{loan.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanHistory;
