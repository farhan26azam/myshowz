import { useEffect, useState } from "react";
import { store } from "../store";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { url } from "../utils";
import axios from "axios";

const Profile = () => {
  const user = store().user;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };


  const updateProfile = async () => {
    const response = await axios.put(`${url}/user`, profileData);
    console.log(response);
    if(response.status===200){
        toast.success("Profile updated successfully");
    }else{
        toast.error("Error updating profile");
    }
    setIsFormVisible(false);
  };

  const editProfile = () => {
    setIsFormVisible(true);
  };

  const goToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div>
      <header className="bg-[var(--brown)] text-white text-center py-4">
        <h1>Personalized Profile Settings</h1>
      </header>

      <section className="mt-8 p-4 mx-auto max-w-lg bg-white bg-opacity-50 rounded-lg shadow-lg">
        <h2 className="text-center text-[var(--brown)] text-2xl font-bold">
          My Profile
        </h2>
        <div className="flex justify-center items-center">
          {isFormVisible && (
            <div className="profile-details">
              <form id="profile-form" className="max-w-md">
                <label className="block mt-4">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    required
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--brown)] focus:ring-opacity-50 p-2"
                  />
                </label>

                {/* Add other input fields similarly */}

                <button
                  type="button"
                  onClick={updateProfile}
                  className="mt-4 bg-[var(--brown)] text-white font-semibold py-2 px-4 rounded-md w-full"
                >
                  Update Profile
                </button>
              </form>
            </div>
          )}
        </div>


        {!isFormVisible && (
          <div id="profile-preview" className="mt-8">
            <h2 className="text-[var(--brown)] text-2xl font-bold">
              Profile Preview
            </h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Role:</strong> {profileData.role}
            </p>
            <p className="mt-2">
              <strong>Email:</strong> {profileData.email}
            </p>
            {
              profileData.role === "writer" && (
                <p>
                  <strong>Score:</strong> {user.score}
                </p>
              )
            }
            <button
              type="button"
              onClick={editProfile}
              className="mt-4 bg-[var(--brown)] text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Edit Profile
            </button>
            {/* Add other preview fields similarly */}
          </div>
        )}

        <button
          onClick={goToHome}
          className="mt-8 bg-[var(--brown)] text-white font-semibold py-2 px-4 rounded-md w-full transition duration-300 hover:bg-[rgb(139, 69, 19)]"
        >
          Go back to Home Screen
        </button>
      </section>
    </div>
  );
};

export default Profile;
