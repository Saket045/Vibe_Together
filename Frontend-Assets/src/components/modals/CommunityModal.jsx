import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useDispatch } from "react-redux";
import { fetchAllCommunities, fetchYourCommunities } from "../../redux/thunks/communityThunk";

export default function CommunityModel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    profileImg: null, // Store file as an object, not a string
  });
  const [isLoading , setIsLoading] = useState(false);

  const isFormValid =
    formData.name.trim() &&
    formData.category.trim() &&
    formData.profileImg &&
    formData.description.trim();

  const createCommunity = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      setIsLoading(true);
      const response=await fetch("/api/community/createCommunity",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Community created:", data);
      setIsLoading(false);
      dispatch(fetchAllCommunities());
      dispatch(fetchYourCommunities());
      navigate("/communityPage"); // Redirect after success

      return data;
    } catch (err) {
      setIsLoading(false);
      console.error("Error creating community:", err.message);
      throw new Error(err.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.1, // Max size 100KB
          maxWidthOrHeight: 600, // Resize if larger than 600px
          useWebWorker: true,
        };
  
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, profileImg: reader.result })); // Store base64
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };
  

  return (
    <div className="flex max-h-screen items-center p-6">
      <div className="w-1/2 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Profile</h2>
        <form className="space-y-5" onSubmit={createCommunity}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="category"
            placeholder="Your Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-gray-50"
          />
          <textarea
            name="description"
            placeholder="Tell us about yourself..."
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex justify-between items-center mt-5">
            <button
              type="button"
              onClick={() => navigate("/communityPage")}
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow-md transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-5 py-2 rounded-lg shadow-md transition-all text-white ${
                isFormValid ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Creating": "Create"}
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img src="/path/to/your/image.jpg" alt="Profile" className="w-3/4 rounded-xl shadow-lg" />
      </div>
    </div>
  );
}
