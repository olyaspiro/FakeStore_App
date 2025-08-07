ADME 

Thursday, August 7, 2025
6:48 PM


I have built a modern, responsive E-Commerce web application using React, Redux Toolkit, Firebase Authentication, and Firestore as the backend. This project replaces FakeStoreAPI with full Firestore CRUD functionality, while sessionStorage is used to persist cart data across sessions.

Authentication Features:
- Users can register with email and password via Firebase Authentication.
- Upon registration, a new user document is created in the Firestore users collection.
- Users can log in and log out securely.
- A Profile page displays user info (email, name, address) and allows them to update or delete their account.
- Account deletion removes both the Firebase Auth user and the Firestore user document.

Product Catalog Features:
- All product data is stored in the Firestore products collection.
- The app fetches products in real-time from Firestore using getDocs.
Users can:
- View products with title, price, category, description, and image.
- Create, edit, and delete products directly in the app.
- Add products to the cart from the product list view.

The Shopping Cart is managed by Redux Toolkit and updates live in the UI.
Users can:
- Add items to the cart,
- Update quantities,
- Remove individual items or clear the cart entirely.
- Cart data is persisted in sessionStorage so the state survives browser refreshes or reloads.
- Toast notifications provide immediate feedback for actions like adding to cart or checkout.

Order History. On checkout, cart contents are saved to Firestore in the orders collection.
- Each order stores: Product list with quantities and prices, Total price, User ID, Timestamp of order creation.
- Logged-in users can access a history of all previous orders, which includes: Order ID, Creation date, Total price.
- Clicking an order opens a detailed view showing the list of items and pricing.

Final Touches:
- I have installed and configured all necessary dependencies.
- All features are fully tested.
- The app is responsive across all screen sizes using a combination of Bootstrap and custom CSS.
- All user data and product inventory handled via Firebase<img width="942" height="1069" alt="image" src="https://github.com/user-attachments/assets/f713ceaf-7be3-48d6-964c-ab0a598d7e7d" />
