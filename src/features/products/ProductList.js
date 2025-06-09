import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  const tableStyle = { width: '100%', borderCollapse: 'collapse' };
  const thTdStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left' };
  const buttonStyle = { marginRight: '5px', padding: '5px 10px' };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thTdStyle}>Title</th>
          <th style={thTdStyle}>Brand</th>
          {/* This is the corrected line */}
          <th style={thTdStyle}>Price</th>
          <th style={thTdStyle}>Stock</th>
          <th style={thTdStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td style={thTdStyle}>{product.title}</td>
            <td style={thTdStyle}>{product.brand}</td>
            <td style={thTdStyle}>${product.price}</td>
            <td style={thTdStyle}>{product.stock}</td>
            <td style={thTdStyle}>
              <button onClick={() => onEdit(product)} style={buttonStyle}>Edit</button>
              <button onClick={() => onDelete(product.id)} style={buttonStyle}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;