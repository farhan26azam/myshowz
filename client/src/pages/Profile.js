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
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || "",
    age: user.age || 0,
    bio: user.bio || "",
    gender: user?.gender || "",
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
    console.log({profileData});
  }, [profileData]);

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
                <div className="grid grid-cols-2 gap-3">

                  <div className="block mt-4 border-2 border-[var(--brown)] rounded-md">
                    <div className="w-full bg-[var(--brown)] text-white p-2 text-center">Name</div>
                    <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        required
                        className=" text-center block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--brown)] focus:ring-opacity-50 p-2"
                    />
                  </div>

                  <div className="block mt-4 border-2 border-[var(--brown)] rounded-md">
                    <div className="w-full bg-[var(--brown)] text-white p-2 text-center">Email</div>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        required
                        className=" text-center block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--brown)] focus:ring-opacity-50 p-2"
                    />
                  </div>

                  <div className="block mt-4 border-2 border-[var(--brown)] rounded-md">
                    <div className="w-full bg-[var(--brown)] text-white p-2 text-center">Phone</div>
                    <input
                        type="text"
                        name="phone"
                        value={profileData?.phone}
                        onChange={handleChange}
                        required
                        className="text-center block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--brown)] focus:ring-opacity-50 p-2"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="Format: 123-456-7890"
                    />
                  </div>

                  <div className="block mt-4 border-2 border-[var(--brown)] rounded-md">
                    <div className="w-full bg-[var(--brown)] text-white p-2 text-center">Age</div>
                    <input
                        type="number"
                        name="age"
                        min={1}
                        max={120}
                        value={profileData?.age}
                        onChange={handleChange}
                        required
                        className="text-center block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--brown)] focus:ring-opacity-50 p-2"
                    />
                  </div>

                  <div className="block mt-4 border-2 border-[var(--brown)] rounded-md">
                    <div className="w-full bg-[var(--brown)] text-white p-2 text-center">Gender</div>
                    <select
                        name="gender"
                        onChange={handleChange}
                        value={profileData?.gender}
                        className="text-center block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--brown)] focus:ring-opacity-50 p-2"
                    >
                      <option value="">
                        Select
                      </option>
                      <option value="male">
                        Male
                      </option>
                      <option value="female">
                        Female
                      </option>
                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>

                  <div className="col-span-2 block mt-4 border-2 border-[var(--brown)] rounded-md">
                    <div className="w-full bg-[var(--brown)] text-white p-2 text-center">Bio</div>
                    <textarea name="bio"
                              minLength={10}
                              maxLength={200}
                              value={profileData?.bio}
                              onChange={handleChange}
                              required
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[var(--brown)] focus:ring-opacity-50 p-2"
                    />

                  </div>
                </div>

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
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <h2 className="mb-6 text-2xl font-bold text-brown-700">
                  Profile Preview
                </h2>
                <p className="mb-2">
                  <strong className="text-brown-700">Name:</strong> {user.name}
                </p>
                <p className="mb-2">
                  <strong className="text-brown-700">Role:</strong> {profileData.role}
                </p>
                <p className="mb-2">
                  <strong className="text-brown-700">Email:</strong> {profileData.email}
                </p>
                <p className="mb-2">
                  <strong className="text-brown-700">Phone:</strong> {profileData.phone}
                </p>
                <p className="mb-2">
                  <strong className="text-brown-700">Age:</strong> {profileData.age}
                </p>
                <p className="mb-2">
                  <strong className="text-brown-700">Gender:</strong> {profileData.gender}
                </p>
                <p className="mb-2">
                  <strong className="text-brown-700">Bio:</strong> {profileData.bio}
                </p>
                {
                    profileData.role === "writer" && (
                        <p className="mb-2">
                          <strong className="text-brown-700">Score:</strong> {user.score}
                        </p>
                    )
                }
              </div>
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
