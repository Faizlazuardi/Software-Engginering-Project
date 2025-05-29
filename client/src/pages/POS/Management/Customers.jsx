import POSManagementLayout from "../../../layouts/POSManagementLayout";

const customers = [
    {
        img: "https://images.pexels.com/photos/2876486/pexels-photo-2876486.png?auto=compress&cs=tinysrgb&dpr=1&w=500",
        title: "Asep Suratman",
        TransactionId: "A471691",
    }
];

const CustomerRow = ({ item, isLast }) => {
    const rowBorderClass = isLast ? "" : "border-b-2";
    return (
        <tr className="hover:bg-gray-100 py-6">
            <td className={`flex items-center gap-2 py-4 ${rowBorderClass}`}>
                <img  className="max-w-10 max-h-10" src={item.img} alt="" />
                
                {item.title}
            </td>
            <td className={`py-4 ${rowBorderClass}`}>{item.TransactionId}</td>
        </tr>
    );
};

export default function Customers() {
    return (
        <POSManagementLayout>
            <div className="flex flex-col gap-10 bg-white p-10 rounded-2xl w-full h-full">
                <h1 className="font-bold text-2xl">Customer List</h1>
                <table className="w-full text-lg text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Customer Name</th>
                            <th className="py-2">ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((item, index) => (
                            <CustomerRow
                            key={index}
                            item={item}
                            isLast={index === customers.length - 1}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </POSManagementLayout>
    );
}