import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../features/products/productSlice';
import ProductList from '../features/products/ProductList';
import ProductForm from '../features/products/ProductForm';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    // Fetch products only if the list is empty
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleAddClick = () => {
    setProductToEdit(null);
    setIsFormVisible(true);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsFormVisible(true);
  };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       dispatch(deleteProduct(id));
//     }
//   };

  // in src/pages/ProductsPage.js

const handleDelete = (id) => {
  // ADD THIS LINE
  console.log('Attempting to delete product with ID:', id); 

  if (window.confirm('Are you sure you want to delete this product?')) {
    dispatch(deleteProduct(id));
  }
};

  const handleFormSubmit = (productData) => {
    if (productToEdit) {
      dispatch(updateProduct({ id: productToEdit.id, ...productData }));
    } else {
      dispatch(addProduct(productData));
    }
    setIsFormVisible(false);
    setProductToEdit(null);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setProductToEdit(null);
  }

  return (
    <div>
      <h1>Product Management</h1>
      <button onClick={handleAddClick} style={{ marginBottom: '20px' }}>
        {isFormVisible ? 'Close Form' : 'Add New Product'}
      </button>

      {isFormVisible && (
        <ProductForm 
          onSubmit={handleFormSubmit} 
          productToEdit={productToEdit} 
          onCancel={handleCancel}
        />
      )}

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {!loading && !error && (
        <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default ProductsPage;