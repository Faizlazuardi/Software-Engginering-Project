export default function Register() {
    
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}