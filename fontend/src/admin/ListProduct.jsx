import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import { getProducts } from "../services/productService";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProducts(); // Gọi hàm getProducts từ productService
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleDeleteProduct = (deletedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId)
    );
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>Product not found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductDetail
          key={product.id}
          product={product}
          onDelete={handleDeleteProduct}
          onUpdate={handleUpdateProduct}
        />
      ))}
    </div>
  );
};

export default ListProduct;