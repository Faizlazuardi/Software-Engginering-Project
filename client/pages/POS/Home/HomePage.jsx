import { useState, useRef } from "react";
import POSLayout from "../../../layouts/POSLayout";
import { useCart } from '../../../contexts/cartContext';

const transactionId = "A9461F";

const Products = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cavendish_Banana_DS.jpg/1200px-Cavendish_Banana_DS.jpg",
        title: "Banana",
        category: "Fruit",
        price: 1.99,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg",
        title: "Apple",
        category: "Fruit",
        price: 2.49,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Orange-Whole.jpg/800px-Orange-Whole.jpg",
        title: "Orange",
        category: "Fruit",
        price: 1.79,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Coca-Cola_logo.svg/1200px-Coca-Cola_logo.svg.png",
        title: "Coca-Cola",
        category: "Beverage",
        price: 1.29,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Pepsi_logo_2015.svg/1200px-Pepsi_logo_2015.svg.png",
        title: "Pepsi",
        category: "Beverage",
        price: 1.29,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Mountain_Dew_logo.svg/1200px-Mountain_Dew_logo.svg.png",
        title: "Mountain Dew",
        category: "Beverage",
        price: 1.29,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Coffee_cup_icon.svg/1200px-Coffee_cup_icon.svg.png",
        title: "Coffee",
        category: "Beverage",
        price: 2.49,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chocolate_bar_icon.svg/1200px-Chocolate_bar_icon.svg.png",
        title: "Chocolate Bar",
        category: "Snack",
        price: 1.99,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Potato_chips_icon.svg/1200px-Potato_chips_icon.svg.png",
        title: "Potato Chips",
        category: "Snack",
        price: 1.49,
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cookie_icon.svg/1200px-Cookie_icon.svg.png",
        title: "Cookie",
        category: "Snack",
        price: 0.99,
    }
];

const Categories = () => {
    return Products.reduce((acc, product) => {
        if (!acc.includes(product.category)) {
            acc.push(product.category);
        }
        return acc;
    }, []);
};

export default function HomePage() {
    const inputRef = useRef();
    const [selectedProducts, setSelectedProducts] = useState(Products);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const updateProductListByCategory = (category) => {
        if (category === "All") {
            setSelectedProducts(Products);
            setSelectedCategory("All");
            return Products;
        }
        const filteredProducts = Products.filter(product => product.category === category);
        setSelectedProducts(filteredProducts);
        setSelectedCategory(category);
    };

    const { cart, addToCart, removeFromCart, subTotal, tax, total } = useCart();

    return (
        <POSLayout>
            <div className="flex w-full h-full">
                <div className="flex-[2] bg-gray-50">
                    <div className="flex justify-between items-center p-10">
                        <div className="flex items-center gap-5">
                            <button 
                                className={` hover:bg-gray-600 px-5 py-3 rounded-full text-white text-xl ${selectedCategory === "All" ? "bg-black": "bg-gray-400"}`}
                                onClick={() => updateProductListByCategory("All")}
                            >All Items</button>
                            {Categories().map((category, index) => (
                                <button
                                    key={index}
                                    className={`hover:bg-gray-600 px-5 py-3 rounded-full text-white text-xl ${selectedCategory === category ? "bg-black": "bg-gray-400"}`}
                                    onClick={() => updateProductListByCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-5 px-6 py-4 border-2 rounded-full cursor-text" onClick={() => inputRef.current.focus()}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input ref={inputRef} className="border-0 outline-none w-full" type="text" name="" id="" placeholder="Search..." />
                        </div>
                    </div>
                    <div className="gap-5 grid grid-cols-4 p-10">
                        {
                            selectedProducts.map((item, index) => (
                                <div key={index} className="flex flex-col gap-2 bg-white shadow-lg p-4 rounded-2xl w-60 h-50">
                                    <div className="border rounded-md w-50 h-25">
                                        <img
                                            src={item.image}
                                            alt="product"
                                            className="rounded-md w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col gap-1">
                                            <h1 className="font-bold text-xl">{item.title}</h1>
                                            <p className="text-gray-500">${item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="flex justify-center items-center hover:bg-gray-200 px-1.5 pt-0.5 pb-1.5 border-2 border-black rounded-full w-5 h-5 text-2xl cursor-pointer select-none"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col flex-[1] justify-between bg-white border-l-2">
                    <div className="flex flex-col flex-grow overflow-hidden">
                        <div className="flex justify-between items-center p-10">
                            <h1 className="font-bold text-3xl">Current Order</h1>
                            <p>Transaction {transactionId}</p>
                        </div>
                        <div className="flex flex-col flex-grow gap-5 px-10 max-w-full overflow-y-auto overscroll-y-none">
                            {
                                cart.length !== 0 ? 
                                (
                                    cart.map((item, index) => (
                                        <div className="flex items-center gap-5 p-5 border-b" key={index}>
                                            <div className="border rounded-md w-20 h-20">
                                                <img
                                                    src={item.image}
                                                    alt="product"
                                                    className="rounded-md w-full h-full object-cover pointer-events-none"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-grow gap-2">
                                                <h1 className="font-bold text-xl">{item.title}</h1>
                                                <p className="text-gray-500">{item.price}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        className="bg-gray-300 rounded w-8 h-8 text-xl cursor-pointer"
                                                        onClick={() => removeFromCart(item)}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className="bg-gray-300 rounded w-8 h-8 text-xl cursor-pointer"
                                                        onClick={() => addToCart(item)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (<p className="text-gray-500">No items in cart.</p>)
                            }
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col justify-between gap-2 p-5 border-t">
                            <div className="flex justify-between items-center">
                                <h1 className="text-gray-800 text-xl">SubTotal</h1>
                                <p>${subTotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1>Tax (10%)</h1>
                                <p>${tax.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold text-xl">Total</h1>
                                <p className="font-bold text-2xl">${total.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="px-5">
                            <button className="bg-black hover:bg-gray-800 px-5 py-3 rounded-md w-full font-medium text-white text-xl cursor-pointer">
                                Pay with Face Payment
                            </button>
                        </div>
                        <div className="flex gap-3 p-5">
                            <button className="bg-black hover:bg-gray-800 py-3 rounded-md w-full font-medium text-white text-xl cursor-pointer">
                                Card
                            </button>
                            <button className="bg-black hover:bg-gray-800 py-3 rounded-md w-full font-medium text-white text-xl cursor-pointer">
                                Cash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </POSLayout>
    );
}
