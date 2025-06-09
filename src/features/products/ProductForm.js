 import React, { useState, useEffect } from 'react';

    const ProductForm = ({ onSubmit, productToEdit, onCancel }) => {
      const [product, setProduct] = useState({ title: '', brand: '', price: '', stock: '' });

      useEffect(() => {
        if (productToEdit) {
          setProduct(productToEdit);
        } else {
          setProduct({ title: '', brand: '', price: '', stock: '' });
        }
      }, [productToEdit]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(product);
        setProduct({ title: '', brand: '', price: '', stock: '' });
      };

      const formStyle = { border: '1px solid #ccc', padding: '20px', marginTop: '20px' };
      const inputGroupStyle = { marginBottom: '10px' };

      return (
        <div style={formStyle}>
          <h2>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={inputGroupStyle}>
              <label>Title: </label>
              <input type="text" name="title" value={product.title} onChange={handleChange} required />
            </div>
            <div style={inputGroupStyle}>
              <label>Brand: </label>
              <input type="text" name="brand" value={product.brand} onChange={handleChange} />
            </div>
            <div style={inputGroupStyle}>
              <label>Price: </label>
              <input type="number" name="price" value={product.price} onChange={handleChange} required />
            </div>
            <div style={inputGroupStyle}>
              <label>Stock: </label>
              <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
            </div>
            <button type="submit">{productToEdit ? 'Update' : 'Add'}</button>
            <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</button>
          </form>
        </div>
      );
    };

export default ProductForm;