import React, { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import { deleteProduct } from "../services/productService";

const ProductDetail = ({ product, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id); // Gọi hàm deleteProduct từ productService
      onDelete(product.id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    onUpdate(updatedProduct);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={product.image_url} alt={product.name} className="my-4" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <div className="card-actions justify-around">
          <div className="flex space-x-4 mt-4">
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
            <button onClick={handleUpdateClick} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <UpdateProduct
          product={product}
          onClose={handleCloseModal}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default ProductDetail;