import POSManagementLayout from "../../../layouts/POSManagementLayout";
const transactions = [
    {
        title: "Trans #716341A",
        total: "$2.99",
    }
];

const TransactionRow = ({ item, isLast }) => {
    const rowBorderClass = isLast ? "" : "border-b-2";
    return (
        <tr className="hover:bg-gray-100 py-6">
            <td className={`py-4 ${rowBorderClass}`}>{item.title}</td>
            <td className={`py-4 ${rowBorderClass}`}>{item.total}</td>
        </tr>
    );
};

export default function Transaction() {
    return (
        <POSManagementLayout>
            <div className="flex flex-col gap-10 bg-white p-10 rounded-2xl w-full h-full">
                <h1 className="font-bold text-2xl">Product List</h1>
                <table className="w-full text-lg text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Transaction ID</th>
                            <th className="py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((item, index) => (
                            <TransactionRow
                            key={index}
                            item={item}
                            isLast={index === transactions.length - 1}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </POSManagementLayout>
    );
}