import React, { useContext, useEffect, useState, useCallback } from "react";
import { DataContext } from "../../context/StoreContext";
import { putFetchData } from "../../api/Api";

const Profile = () => {
  const { profile } = useContext(DataContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUser({
      name: profile.name,
      email: profile.email,
      phone: profile.phone || "0000000000",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
    });
  }, [profile]);

  const handleEdit = useCallback(async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const res = await putFetchData(
        `${process.env.REACT_APP_API_BASE_URL}/user`,
        {
          name: user.name,
          phone: user.phone,
        }
      );

      if (res.data.status === "success") {
        alert("User Updated Successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }, [isEditing, user]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    },
    [setUser]
  );

  const randomizeImage = useCallback(() => {
    setUser((prevUser) => ({
      ...prevUser,
      image: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 100
      )}.jpg`,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Your Profile
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={user.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
        </div>

        <div className="space-y-4">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              {isEditing ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={user[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-lg text-gray-800">{user[field]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleEdit}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>

          {isEditing && (
            <button
              onClick={randomizeImage}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Randomize Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
