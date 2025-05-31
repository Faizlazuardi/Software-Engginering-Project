import { useState, useRef, useEffect } from "react";
import POSLayout from "../../../layouts/POSLayout";
import { useCart } from '../../../contexts/cartContext';
import { useAuth } from '../../../contexts/authContext';
import { productAPI, transactionAPI } from '../../../services/apiService';

const transactionId = "A9461F";

// Categories function - ADD THIS
const Categories = () => {
    return ["Fruit", "Beverage", "Snack", "Dairy", "Meat", "Vegetable", "Bakery", "Frozen"];
};

// Keep hardcoded products as fallback
const Products = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cavendish_Banana_DS.jpg/1200px-Cavendish_Banana_DS.jpg",
        title: "Banana",
        category: "Fruit",
        price: 1.99,
        id: 1,
        stock: 50
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg",
        title: "Apple",
        category: "Fruit", 
        price: 2.49,
        id: 2,
        stock: 30
    },
    {
        image: "https://via.placeholder.com/150",
        title: "Orange Juice",
        category: "Beverage",
        price: 2.99,
        id: 3,
        stock: 25
    },
    {
        image: "https://via.placeholder.com/150",
        title: "Potato Chips",
        category: "Snack",
        price: 1.99,
        id: 4,
        stock: 40
    }
];

export default function HomePage() {
    const inputRef = useRef();
    const [products, setProducts] = useState(Products);
    const [selectedProducts, setSelectedProducts] = useState(Products);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productAPI.getAll();
                if (response.data.products && response.data.products.length > 0) {
                    // Transform API data to match your component structure
                    const apiProducts = response.data.products.map(product => ({
                        image: "https://via.placeholder.com/150",
                        title: product.productname,
                        category: product.categoryname || "General",
                        price: product.productprice, // Remove /100 if storing as dollars
                        id: product.productid,
                        stock: product.productstock
                    }));
                    setProducts(apiProducts);
                    setSelectedProducts(apiProducts);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
                // Keep using hardcoded products as fallback
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const updateProductListByCategory = (category) => {
        if (category === "All") {
            setSelectedProducts(products);
            setSelectedCategory("All");
            return;
        }
        const filteredProducts = products.filter(product => product.category === category);
        setSelectedProducts(filteredProducts);
        setSelectedCategory(category);
    };

    const { cart, addToCart, removeFromCart, subTotal, tax, total, clearCart } = useCart();

    const handlePayment = async (paymentMethod) => {
        if (cart.length === 0) {
            alert('Please add items to cart first');
            return;
        }

        try {
            const transactionData = {
                userId: user?.userid || user?.id,
                paymentMethod: paymentMethod,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            const response = await transactionAPI.create(transactionData);
            clearCart();
            alert('Payment successful! Transaction ID: ' + response.data.transactionId);
            
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <POSLayout>
            <div className="flex w-full h-full">
                <div className="flex-[2] bg-gray-50">
                    <div className="flex justify-between items-center p-10">
                        <div className="flex items-center gap-5">
                            <button 
                                className={`hover:bg-gray-600 px-5 py-3 rounded-full text-white text-xl ${selectedCategory === "All" ? "bg-black": "bg-gray-400"}`}
                                onClick={() => updateProductListByCategory("All")}
                            >
                                All Items
                            </button>
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
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-xl">Loading products...</div>
                        </div>
                    ) : (
                        <div className="gap-5 grid grid-cols-4 p-10">
                            {selectedProducts.map((item, index) => (
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
                                            <p className="text-sm text-gray-400">Stock: {item.stock || 0}</p>
                                        </div>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="flex justify-center items-center hover:bg-gray-200 px-1.5 pt-0.5 pb-1.5 border-2 border-black rounded-full w-5 h-5 text-2xl cursor-pointer select-none disabled:bg-gray-300 disabled:cursor-not-allowed"
                                            disabled={!item.stock || item.stock === 0}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col flex-[1] justify-between bg-white border-l-2">
                    <div className="flex flex-col flex-grow overflow-hidden">
                        <div className="flex justify-between items-center p-10">
                            <h1 className="font-bold text-3xl">Current Order</h1>
                            <p>Transaction {transactionId}</p>
                        </div>
                        <div className="flex flex-col flex-grow gap-5 px-10 max-w-full overflow-y-auto overscroll-y-none">
                            {cart.length !== 0 ? (
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
                                            <p className="text-gray-500">${item.price}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 rounded w-8 h-8 text-xl cursor-pointer"
                                                    onClick={() => removeFromCart(item)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2 font-semibold">{item.quantity}</span>
                                                <button
                                                    className="bg-gray-300 hover:bg-gray-400 rounded w-8 h-8 text-xl cursor-pointer"
                                                    onClick={() => addToCart(item)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <p className="font-bold text-xl">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-10">No items in cart.</p>
                            )}
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
                            <button 
                                className="bg-black hover:bg-gray-800 px-5 py-3 rounded-md w-full font-medium text-white text-xl cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
                                onClick={() => handlePayment('face_payment')}
                                disabled={cart.length === 0}
                            >
                                Pay with Face Payment
                            </button>
                        </div>
                        <div className="flex gap-3 p-5">
                            <button 
                                className="bg-black hover:bg-gray-800 py-3 rounded-md w-full font-medium text-white text-xl cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
                                onClick={() => handlePayment('card')}
                                disabled={cart.length === 0}
                            >
                                Card
                            </button>
                            <button 
                                className="bg-black hover:bg-gray-800 py-3 rounded-md w-full font-medium text-white text-xl cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
                                onClick={() => handlePayment('cash')}
                                disabled={cart.length === 0}
                            >
                                Cash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </POSLayout>
    );
}