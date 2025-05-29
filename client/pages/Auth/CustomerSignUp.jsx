import { handleCustomerSignUp } from '../../utils/handleCustomerSignUp';
export default function CustomerSignUp() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-100 w-screen h-screen">
            <form className="flex flex-col justify-center items-center gap-4 bg-white p-8 border-2 rounded-lg w-128 h-180" onSubmit={handleCustomerSignUp}>
                <div className="bg-gray-500 rounded-2xl w-25 h-25"></div>
                <h1 className="font-bold text-3xl">Welcome To SuperMart</h1>
                <h1 className="font-thin text-gray-500 text-xl">Let’s Set up your account</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="username">Username</label>
                        <input className="p-2 border-2 rounded-md w-110 h-10" type="text" name="username" id="username" placeholder="Enter Your Username"/>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="username">Email</label>
                        <input className="p-2 border-2 rounded-md w-110 h-10" type="email" name="email" id="email" placeholder="Enter Your Email"/>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="password">Password</label>
                        <input className="p-2 border-2 rounded-md w-110 h-10" type="password" name="password" id="password" placeholder="Enter Your Password"/>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="password">DOB</label>
                        <input className="p-2 border-2 rounded-md w-110 h-10" type="date" name="dob" id="dob"/>
                    </div>
                    <button className="bg-black rounded-md w-110 h-10 text-white hover:cursor-pointer" type="submit">Sign Up</button>
                </div>
            </form>
            <p>Or Continue With</p>
            <div className="flex gap-5">
                <button className="bg-white hover:bg-black border-2 rounded-md w-45 h-12 hover:text-white text-xl cursor-pointer" type="submit"><i className="fa-brands fa-google"></i> Google</button>
                <button className="bg-white hover:bg-black border-2 rounded-md w-45 h-12 hover:text-white text-xl cursor-pointer" type="submit"><i className="fa-brands fa-facebook"></i> Facebook</button>
            </div>
            <p className="cursor-pointer">Already have an account? <strong><a href="/login">Sign In</a></strong></p>
        </div>
    );
}