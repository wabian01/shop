import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddProduct from "../admin/AddProduct";
import ListProduct from "../admin/ListProduct";

function Admin() {
  const { isAuthenticated } = useAuth();
  const [component, setComponent] = useState("List Product");

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-3">
          <Sidebar component={component} setComponent={setComponent} />
        </div>
        <div className="col-span-9">
          {component === "Add Product" ? <AddProduct /> : <ListProduct />}
        </div>
      </div>
    </div>
  );
}

export default Admin;
