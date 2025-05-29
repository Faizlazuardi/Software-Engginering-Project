export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-gray-100 w-screen h-screen">
            <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 border-2 rounded-lg w-128 h-130">
                <h1 className="font-bold text-3xl">SuperMart POS Login</h1>
                <h1 className="font-thin text-gray-500 text-xl">Enter your credentials to access the system</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="email">Email</label>
                        <input className="p-2 border-2 rounded-md w-110 h-10" type="email" name="email" id="email" placeholder="Enter Your Email"/>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="password">Password</label>
                        <input className="p-2 border-2 rounded-md w-110 h-10" type="password" name="password" id="password" placeholder="Enter Your Password"/>
                    </div>
                </div>
                <div className="flex justify-between items-center w-110 h-10">
                    <div className="flex items-center gap-3">
                        <input className="w-6 h-6" type="checkbox" name="remember me" id="remember me"/>
                        <label className="text-md" htmlFor="remember me">Remember Me</label>
                    </div>
                    <a href="" className="font-bold text-md">Forgot Password?</a>
                </div>
                <button className="bg-black rounded-md w-110 h-10 text-white" type="submit">Sign In</button>
                <p>Need help? Contact <strong>System Administrator</strong></p>
            </div>
        </div>
    );
}