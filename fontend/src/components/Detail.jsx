import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <h1 className="text-3xl font-bold my-8">Product Detail</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image_url} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="mt-4">
            <span className="text-lg font-semibold">Price: {product.price}đ</span>
          </div>
          <div className="mt-4">
            <span className="text-lg font-semibold">Category: {product.category}</span>
          </div>
          <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Buy Now
          </button>
        </div>
      </div>
      <h1 className="text-3xl font-bold my-8">Thông tin sản phẩm</h1>
      <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
    </div>
  );
}

export default Detail;