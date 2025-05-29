import CustomerDisplayNavigation from '../../components/CustomerDisplayNavigation';
import { useCart } from '../../contexts/cartContext';

const transactionId = "A9461F";{/*Example transaction number*/}

export default function Summary() {
    const { cart, subTotal, tax, total } = useCart();
    return (
        <div className="flex flex-col items-center gap-10 bg-gray-100 w-screen h-screen select-none">
            <CustomerDisplayNavigation />
            <div className="flex flex-col justify-center items-center gap-5 bg-white shadow-lg p-8 rounded-lg w-250">
                <div className="flex justify-between items-center gap-2 w-full">
                    <h1 className="font-bold text-2xl">Item List</h1>
                    <h1 className="text-xl">Transaction {transactionId}</h1>
                </div>
                {cart.length === 0 ? (
                    <p className="text-gray-500">No items in cart</p>
                ) : (
                    <div className="flex flex-col gap-4 w-full">
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between items-center mb-2 pb-2 border-b w-full">
                                <div className="flex items-center gap-5">
                                    <p className="font-bold text-2xl">x{item.quantity}</p>
                                    <div className="flex flex-col justify-between">
                                        <p className="font-bold text-2xl">{item.title}</p>
                                        <p className="text-xl">$ {(item.price).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <p className="font-bold text-2xl">Total</p>
                                    <p className="text-xl">$ {item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-gray-400 text-2xl">Subtotal</p>
                            <p className="font-bold text-gray-400 text-2xl">$ {subTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-gray-400 text-2xl">Tax (10%)</p>
                            <p className="font-bold text-gray-400 text-2xl">$ {tax.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-2xl">Total</p>
                            <p className="font-bold text-2xl">$ {total.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}