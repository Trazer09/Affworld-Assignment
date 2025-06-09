import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- ASYNC THUNKS ---

export const fetchProducts = createAsyncThunk(
'products/fetchProducts',
async (_, { getState, rejectWithValue }) => {
try {
// NOTE: We fetch from the public endpoint here for a full list
// The auth endpoint from dummyjson only returns a subset of products.
const response = await axios.get('https://dummyjson.com/products');
return response.data.products;
} catch (error) {
return rejectWithValue(error.response.data);
}
}
);

export const addProduct = createAsyncThunk(
'products/addProduct',
async (productData, { rejectWithValue }) => {
try {
// DummyJSON doesn't actually add to the database, but it simulates a successful response.
const response = await axios.post('https://dummyjson.com/products/add', productData);
return response.data;
} catch (error) {
return rejectWithValue(error.response.data);
   }
}
);

export const updateProduct = createAsyncThunk(
'products/updateProduct',
async ({ id, ...productData }, { rejectWithValue }) => {
try {
const response = await axios.put(`https://dummyjson.com/products/${id}`, productData);
return response.data;
} catch (error) {
return rejectWithValue(error.response.data);
   }
}
);

export const deleteProduct = createAsyncThunk(
'products/deleteProduct',
async (productId, { rejectWithValue }) => {
try {
await axios.delete(`https://dummyjson.com/products/${productId}`);
return productId; // Return the id to know which product to remove from state
} catch (error) {
return rejectWithValue(error.response.data);
}
}
);

// --- SLICE DEFINITION ---

const productSlice = createSlice({
name: 'products',
initialState: {
items: [],
loading: false,
error: null,
},
reducers: {},
extraReducers: (builder) => {
builder
// Fetch Products
    .addCase(fetchProducts.pending, (state) => {
state.loading = true;
})
.addCase(fetchProducts.fulfilled, (state, action) => {
state.loading = false;
state.items = action.payload;
})
.addCase(fetchProducts.rejected, (state, action) => {
state.loading = false;
state.error = action.payload;
})
// Add Product
.addCase(addProduct.fulfilled, (state, action) => {
// DummyJSON returns the new product with a new ID
state.items.unshift(action.payload); // Add to the beginning of the list
})
   // Update Product
.addCase(updateProduct.fulfilled, (state, action) => {
const index = state.items.findIndex((item) => item.id === action.payload.id);
if (index !== -1) {
state.items[index] = action.payload;
}
})
// Delete Product
.addCase(deleteProduct.fulfilled, (state, action) => {
state.items = state.items.filter((item) => item.id !== action.payload);
});
},
});

export default productSlice.reducer;

