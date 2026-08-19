import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        // Frontend validation
        if (!email || !password) {
            setMessage("Please fill all fields.");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            console.log("Login response:", response.data);

            setMessage(response.data.message);

            // Login successful
            if (response.status >= 200 && response.status < 300) {
                setTimeout(() => {
                    navigate("/profile");
                }, 800);
            }

        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                setMessage(
                    error.response.data.message || "Login failed."
                );
            } else {
                setMessage("Cannot connect to server.");
            }
        }
    };

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Welcome Back
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Login to your account
                    </p>
                </div>


                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>


                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>


                    {/* Message */}
                    {message && (
                        <p className="text-center text-sm text-slate-600">
                            {message}
                        </p>
                    )}


                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
                    >
                        Login
                    </button>

                </form>


                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </main>
    );
}

export default Login;