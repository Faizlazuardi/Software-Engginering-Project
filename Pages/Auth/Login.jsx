export default function Login() {
    return (
        <div className="flex justify-center items-center bg-gray-100 w-screen h-screen">
            <div className="flex flex-col justify-center items-center gap-3 bg-white shadow-xl w-128 h-125">
                <h1 className="font-bold text-4xl">Super Mart POS Login</h1>
                <h1 className="font-thin text-gray-500 text-xl">Enter your credentials to access the system</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="employee ID">Employee ID</label>
                        <input className="p-2 border-2 rounded-md w-110 h-10" type="text" name="employee ID" id="employee ID" placeholder="Enter Your Employee ID"/>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="font-bold text-xl" htmlFor="password">Password</label>
                        <input className="p-2 border-2 rounded-md w-110 h-10" type="password" name="password" id="password" placeholder="Enter Your Password"/>
                    </div>
                </div>
                <div className="flex justify-between items-center w-110 h-10">
                    <div className="flex items-center">
                        <input className="w-4.5 h-4.5" type="checkbox" name="remember me" id="remember me"/>
                        <label className="text-sm" htmlFor="remember me">Remember Me</label>
                    </div>
                    <p className="font-bold text-sm">Forgot Password?</p>
                </div>
                <button className="bg-black rounded-md w-110 h-10 text-white" type="submit">Sign In</button>
                <p>Need Help? Contact <strong>System Administrator</strong></p>
            </div>
        </div>
    );
}