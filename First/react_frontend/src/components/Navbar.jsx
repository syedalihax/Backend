import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-slate-900 text-white shadow-lg">

            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <NavLink
                    to="/"
                    className="text-2xl font-bold tracking-wide"
                >
                    Auth<span className="text-blue-400">App</span>
                </NavLink>


                {/* Navigation */}
                <div className="flex items-center gap-6">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-400 font-semibold"
                                : "text-gray-300 hover:text-white transition"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-400 font-semibold"
                                : "text-gray-300 hover:text-white transition"
                        }
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-400 font-semibold"
                                : "text-gray-300 hover:text-white transition"
                        }
                    >
                        Register
                    </NavLink>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;