import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Sidebar = ({ setComponent }) => {
  const handleComponents = (value) => {
    setComponent(value);
  };

  const navigateTo = useNavigate();
  const gotoHome = () => {
    navigateTo("/");
  };


  return (
    <div className="h-full bg-gray-50 shadow-lg p-4">
      <h1 className="text-5xl text-center">Admin</h1>
      <ul className="space-y-6 mt-10">
        <button
          onClick={() => handleComponents("Product List")}
          className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Product List
        </button>
        <button
          onClick={() => handleComponents("Add Product")}
          className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </button>
        <button
          onClick={gotoHome}
          className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          HOME
        </button>
        <div className="flex justify-center">
        <Logout />
        </div>
          
      </ul>
    </div>
  );
};

export default Sidebar;