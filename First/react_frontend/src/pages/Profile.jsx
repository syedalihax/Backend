import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getProfile = async () => {

            try {

                const response = await api.get("/api/auth/profile");

                console.log("Profile response:", response.data);

                setUser(response.data.data);

            } catch (error) {

                console.error("Profile error:", error);

                // JWT invalid / missing
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }

            } finally {

                setLoading(false);

            }
        };

        getProfile();

    }, [navigate]);


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    if (loading) {
        return (
            <main className="min-h-screen bg-slate-100 flex items-center justify-center">

                <h1 className="text-2xl font-semibold text-slate-700">
                    Loading...
                </h1>

            </main>
        );
    }


    if (!user) {
        return null;
    }


    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <div className="flex justify-center mb-6">

                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

                        <span className="text-3xl font-bold text-blue-600">
                            {user.name.charAt(0).toUpperCase()}
                        </span>

                    </div>

                </div>


                <h1 className="text-3xl font-bold text-slate-800 text-center">
                    Profile
                </h1>


                <div className="mt-8 space-y-4">

                    <div className="bg-slate-50 rounded-lg p-4">

                        <p className="text-sm text-slate-500">
                            Name
                        </p>

                        <p className="font-semibold text-slate-800">
                            {user.name}
                        </p>

                    </div>


                    <div className="bg-slate-50 rounded-lg p-4">

                        <p className="text-sm text-slate-500">
                            Email
                        </p>

                        <p className="font-semibold text-slate-800">
                            {user.email}
                        </p>

                    </div>


                    <div className="bg-slate-50 rounded-lg p-4">

                        <p className="text-sm text-slate-500">
                            Role
                        </p>

                        <p className="font-semibold text-slate-800 capitalize">
                            {user.role}
                        </p>

                    </div>

                </div>


                <button
                    onClick={handleLogout}
                    className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Logout
                </button>

            </div>

        </main>
    );
}

export default Profile;