
import { useForm } from "react-hook-form";
import { updateProduct } from "../services/productService";
import ReactQuill from "react-quill-new";

const UpdateProduct = ({ product, onClose, onUpdate }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.image_url,
    },
  });

  const onSubmit = async (data) => {
    try {
      const updatedProduct = { id: product.id, ...data, image_url: data.imageUrl };
      await updateProduct(product.id, updatedProduct);
      onUpdate(updatedProduct);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-[800px]! h-[500px]">
        <h3 className="font-bold text-lg bg-base-100 p-4">Update Product</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control max-h-[300px] overflow-auto">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <ReactQuill
              theme="snow"
              value={product.description}
              onChange={(value) => setValue("description", value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="PC">PC</option>
              <option value="Laptop">Laptop</option>
              <option value="Smartphone">Smartphone</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              {...register("imageUrl", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action bg-base-100 p-4">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;