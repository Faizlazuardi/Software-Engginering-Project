import POSManagementLayout from "../../../layouts/POSManagementLayout";

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

export default function Products() {
    return (
        <POSManagementLayout>
            <div className="flex flex-col gap-10 bg-white p-10 rounded-2xl w-full h-full">
                <h1 className="font-bold text-2xl">Product List</h1>
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
        </POSManagementLayout>
    );
}