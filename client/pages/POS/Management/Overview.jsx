import POSManagementLayout from "../../../layouts/POSManagementLayout";

const cards = [
    { title: "Total Sales", amount: "$4,200", growth: "+ 12.5% from last month" },
    { title: "Products", amount: "1.234 Items" },
    { title: "Transaction", amount: 125, growth: "+ 10% from last month" },
    { title: "New Member", amount: 120, growth: "+ 5% from last month" },
];

const products = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cavendish_Banana_DS.jpg/1200px-Cavendish_Banana_DS.jpg",
        title: "Banana",
        stock: 45,
        price: "$1.99",
        status: "In Stock",
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s",
        title: "Apple",
        stock: 0,
        price: "$2.99",
        status: "Out Of Stock",
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6GoLpPXoOkT0lAuFcxXwJSQ7nxtRQqVJLg&s",
        title: "Orange",
        stock: 2,
        price: "$1.59",
        status: "Low On Stock",
    },
];

const recentActivity = [
    { title: "New Product Added", time: "2 minutes ago" },
    { title: "New Transaction", time: "10 minutes ago" },
    { title: "Stock Updated", time: "24 minutes ago" },
];

const Card = ({ title, amount, growth }) => (
    <div className="flex flex-col gap-1 bg-white shadow-sm px-4 py-4 rounded-2xl w-1/4 h-35">
        <h1 className="font-medium text-xl">{title}</h1>
        <p className="font-semibold text-4xl">{amount}</p>
        {growth && <p>{growth}</p>}
    </div>
);

const ProductRow = ({ item, isLast }) => {
    const rowBorderClass = isLast ? "" : "border-b-2";
    return (
        <tr className="hover:bg-gray-100 py-6">
            <td className={`flex items-center gap-2 py-4 ${rowBorderClass}`}>
                <div className="border rounded-md w-10 h-10">
                    <img
                        src={item.image}
                        alt="product"
                        className="rounded-md w-full h-full object-cover"
                    />
                </div>
                {item.title}
            </td>
            <td className={`py-4 ${rowBorderClass}`}>{item.stock}</td>
            <td className={`py-4 ${rowBorderClass}`}>{item.price}</td>
            <td className={`py-4 ${rowBorderClass}`}>{item.status}</td>
        </tr>
    );
};

const ActivityItem = ({ title, time }) => (
    <div className="flex items-center gap-3">
        <div className="bg-black rounded-full w-10 h-10" />
        <div>
        <h1>{title}</h1>
        <p>{time}</p>
        </div>
    </div>
);

export default function Overview() {
    return (
        <POSManagementLayout>
        <div className="flex flex-col gap-10 w-full h-full">
            <div className="flex gap-5">
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
            <div className="flex flex-col gap-3 bg-white shadow-sm p-5 rounded-2xl w-full h-90">
                <h1 className="pb-3 border-b-2 font-semibold text-2xl">Recent Product</h1>
                <table className="w-full text-lg text-left">
                    <thead>
                        <tr>
                            <th className="py-2">Products</th>
                            <th className="py-2">Stocks</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <ProductRow
                            key={index}
                            item={item}
                            isLast={index === products.length - 1}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex gap-5 w-full">
                <div className="flex flex-col gap-3 bg-white shadow-sm p-5 rounded-2xl w-1/2">
                    <h1 className="text-2xl">Quick Add Product</h1>
                    <form className="flex flex-col gap-2">
                    <label className="flex flex-col font-semibold">
                        Product Name
                        <input type="text" placeholder="Product Name" className="p-2 border rounded" />
                    </label>
                    <div className="flex gap-2">
                        <label className="flex flex-col flex-1 font-semibold">
                        Product Price
                        <input
                            type="number"
                            placeholder="Product Price"
                            className="p-2 border rounded w-full"
                        />
                        </label>
                        <label className="flex flex-col flex-1 font-semibold">
                        Product Category
                        <input
                            type="text"
                            placeholder="Product Category"
                            className="p-2 border rounded w-full"
                        />
                        </label>
                    </div>
                    <button type="submit" className="bg-blue-500 p-2 rounded text-white cursor-pointer">
                        Add Product
                    </button>
                    </form>
                </div>
                <div className="flex flex-col gap-3 bg-white shadow-sm p-5 rounded-2xl w-1/2">
                    <h1 className="text-2xl">Recent Activity</h1>
                    {recentActivity.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                    ))}
                </div>
            </div>
        </div>
        </POSManagementLayout>
    );
    }
