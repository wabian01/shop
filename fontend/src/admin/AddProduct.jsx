import React from "react";
import { useForm } from "react-hook-form";
import { addProduct } from "../services/productService";

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await addProduct(data); // Gọi hàm addProduct từ productService
      reset();
    } catch (error) {
      console.error("Failed to create Product", error);
    }
  };

  return (
    <div className="px-20 mt-20">
      <span className="text-5xl font-bold mb-5">Add Product</span>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered w-full"
          />
          {errors.description && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.price && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            {...register('category', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="PC">PC</option>
            <option value="Laptop">Laptop</option>
            <option value="Smartphone">Smartphone</option>
          </select>
          {errors.category && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            {...register('image_url', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.image_url && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;