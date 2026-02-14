# AgroMart - E-Commerce Platform

A full-stack e-commerce platform for agricultural products with user authentication, cart management, wishlist, and seller features.

## Features

- **User Authentication**: Login and Signup with MongoDB
- **User Types**: Customer and Seller accounts
- **Shopping Cart**: User-specific cart stored in MongoDB
- **Wishlist**: User-specific wishlist stored in MongoDB
- **Product Management**: Sellers can add, edit, and delete products
- **Earnings Tracking**: Sellers can view their earnings and sales
- **Order Management**: Complete order processing system

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# Or start manually:
mongod

# On Linux/Mac:
sudo systemctl start mongod
# or
mongod
```

### 3. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 4. Access the Application

- Open your browser and navigate to `http://localhost:3000`
- You'll be redirected to the login/signup page
- Create an account (choose Customer or Seller)
- Start shopping or selling!

## Project Structure

```
pro2modified/
├── server.js              # Express server with MongoDB
├── package.json            # Dependencies
├── public/                # Frontend pages
│   ├── index.html         # Login/Signup page
│   ├── home.html          # Home page
│   ├── profile.html       # User/Seller profile
│   ├── cart.html          # Shopping cart
│   ├── checkout.html      # Checkout page
│   ├── wishlist.html      # Wishlist page
│   └── [category pages]   # Category pages
├── src/
│   ├── components/        # Header and Footer components
│   ├── js/                # JavaScript modules
│   │   ├── cart.js        # Cart management
│   │   └── wishlist.js    # Wishlist management
│   └── styles/            # CSS files
└── node_modules/          # Dependencies
```

## API Endpoints

### Authentication
- `POST /api/signup` - Create new account
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/user` - Get current user

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update quantity
- `DELETE /api/cart/:productId` - Remove item

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add/remove from wishlist
- `DELETE /api/wishlist/:productId` - Remove item

### Products (Seller)
- `GET /api/products` - Get all products
- `POST /api/products` - Add product (seller only)
- `GET /api/products/seller` - Get seller's products
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders` - Get orders

### Seller Earnings
- `GET /api/seller/earnings` - Get seller earnings

## MongoDB Collections

- **users**: User accounts (customers and sellers)
- **products**: Products listed by sellers
- **orders**: Order history

## Notes

- All cart and wishlist data is stored per user in MongoDB
- Sellers can manage their products and view earnings
- Customers can shop, add to cart, and place orders
- Authentication is required for most features


check live : http://56.228.16.118:5000
ADMIN :
username : lokesh2004
password:Admin@12

USERS:
SELLER:
username:Lokesh12
password:Lokesh@12

CUSTOMER:
username:Vennela
password: Vennela@12


