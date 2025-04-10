import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <h1>List Product</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map(product => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <Card item={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;