import React, { useState } from "react";
import "../style/AdminDashboard.css";
import EditProduct from "../components/EditProduct.jsx";
import "font-awesome/css/font-awesome.min.css"; 
import AddProduct from "../components/AddProduct.jsx";

// Imported images from src/assets
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.png";
import footerimg from "../assets/footerimg.jpg";

const productsData = [
  { 
    id: 1, 
    name: "Chocolate Cake", 
    category: "Cake", 
    price: "₱20", 
    description: "A delicious chocolate cake.",
    image: image2
  },
  { 
    id: 2, 
    name: "Sugar Cookie", 
    category: "Cookie", 
    price: "₱5", 
    description: "Sweet and crunchy sugar cookie.",
    image: image3
  },
  { 
    id: 3, 
    name: "Strawberry Cake", 
    category: "Cake", 
    price: "₱25", 
    description: "A fresh strawberry-flavored cake.",
    image: image1
  },
  { 
    id: 4, 
    name: "Oatmeal Cookie", 
    category: "Cookie", 
    price: "₱4", 
    description: "A healthy oatmeal cookie.",
    image: image1
  }
];

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Product"); 
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isUserAccountVisible, setIsUserAccountVisible] = useState(false);
  const [products, setProducts] = useState(productsData);

  const [showAddForm, setShowAddForm] = useState(false);
  

  const filteredProducts = products.filter((product) =>
    (selectedCategory === "All Products" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserAccount = () => {
    setIsUserAccountVisible((prevState) => !prevState);
  };

  const handleAddProduct = (product) => {
    if (!product.name || !product.price || !product.description) return;
    
    // Format price to 2 decimal places and add ₱ symbol
    const formattedPrice = `₱${parseFloat(product.price || 0).toFixed(2)}`;
    
    const newProductData = { 
      ...product, 
      id: products.length + 1,
      price: formattedPrice,
      image: product.image || image1 // Fallback to default image
    };
    setProducts([...products, newProductData]);
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setSelectedProduct(null);
  };

  const handleUpdate = () => {
    setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)));
    setEditProduct(null);
    setShowPopup(false);
  };

  const handleLogoClick = () => {
    setSelectedTab("Product");
    setSelectedProduct(null);
    setEditProduct(null);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="header">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          Al <span className="heart">♥</span> Che Pastry
        </div>
        <div className="header-buttons">
          <button className={`header-button ${selectedTab === "Product" ? "active" : ""}`} onClick={() => setSelectedTab("Product")}>Product</button>
          <button className={`header-button ${selectedTab === "Accounts" ? "active" : ""}`} onClick={() => setSelectedTab("Accounts")}>Accounts</button>
          <button className={`header-button ${selectedTab === "Orders" ? "active" : ""}`} onClick={() => setSelectedTab("Orders")}>Orders</button>
        </div>
        <div className="user-account">
          <button className="user-icon" onClick={toggleUserAccount}>
            <i className="fa fa-user"></i>
          </button>
          {isUserAccountVisible && (
            <div className="account-details">
              <p>User: Admin</p>
              <p>Email: admin@example.com</p>
            </div>
          )}
        </div>
      </header>

      {/* Product Tab */}
      {selectedTab === "Product" && !selectedProduct && (
        <>
          <h2 className="title">Product List</h2>
          <div className="product-section">
            <div className="product-list">
              <div className="controls">
                <select className="dropdown" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option>All Products</option>
                  <option>Cake</option>
                  <option>Cookie</option>
                </select>
                
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="add-product-button" onClick={() => setShowAddForm(true)}>
                  Add Product
                </button>
              </div>

              <div className="products-container">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-card-image"
                    />
                    <h3>{product.name}</h3>
                    <p className="category">{product.category}</p>
                    <p className="price">{product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Form Side */}
            {showAddForm && (
              <AddProduct
                setShowAddForm={setShowAddForm}
                handleAdd={handleAddProduct}
              />
            )}
          </div>
        </>
      )}

      {/* Product Detail View */}
      {selectedTab === "Product" && selectedProduct && (
            <div className="product-section" style={{ gap: '5px' }}>
              <div className="product-detail-view">
                <button className="back-button" onClick={() => setSelectedProduct(null)}>Back</button>
                <div className="product-detail">
                  <div className="product-image-container">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                  </div>
                  <div className="product-info">
                    <h2>{selectedProduct.name}</h2>
                    <p className="category">Category: {selectedProduct.category}</p>
                    <p className="price">Price: {selectedProduct.price}</p>
                    <p className="description">{selectedProduct.description}</p>
                    <div className="product-actions">
                      <button onClick={() => setEditProduct(selectedProduct)}>Edit</button>
                      <button onClick={() => handleDelete(selectedProduct.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            {/* Edit Product Form */}
            {editProduct && <EditProduct editProduct={editProduct} setEditProduct={setEditProduct} handleUpdate={handleUpdate} />}
          </div>
        )}
        
      {/* Popup Confirmation */}
      {showPopup && (
        <div className="popup">
          <p>Update Pastry?</p>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      {/* Accounts Tab */}
      {selectedTab === "Accounts" && (
        <div className="accounts-section">
          <h2 className="title">Manage Accounts</h2>
          <p>Account management content goes here...</p>
        </div>
      )}

      {/* Orders Tab */}
      {selectedTab === "Orders" && (
        <div className="orders-section">
          <h2 className="title">Manage Orders</h2>
          <p>Order management content goes here...</p>
        </div>
      )}

<footer className="footer">
  <img src={footerimg} alt="Footer" className="footer-image" />
</footer>
    </div>

  );
};

export default AdminDashboard;
