Internship 2025 Projects
This repository contains two Angular 19 projects developed as part of my internship work: a Food Ordering System and a Movie Booking System. Both projects use standalone components, Bootstrap 5 for styling, and modern Angular features for a responsive, user-friendly experience.
Projects
1. Food Ordering System
A web application for browsing menus, adding items to a cart, checking out, authenticating users, and submitting reviews, with dark mode support.
Features

Menu Display: Browse food items with search and category filters.
Cart Management: Add, update, or remove items; view total cost.
Checkout: Place orders and clear the cart.
Authentication: Login/signup with email and password (stored in memory).
Reviews: Add and view reviews for menu items.
Dark Mode: Toggle between light and dark themes.
Responsive Design: Mobile-friendly interface using Bootstrap 5.
Food Images: Displayed via Unsplash URLs or local assets.

Folder Structure
food-ordering-system/
├── src/
│   ├── app/
│   │   ├── home/
│   │   ├── menu/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── auth/
│   │   ├── reviews/
│   │   ├── services/
│   │   │   ├── cart.service.ts
│   │   │   ├── menu.service.ts
│   │   │   ├── auth.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.config.ts
│   ├── assets/
│   │   ├── images/ (optional local images)
│   ├── styles.css
├── angular.json
├── package.json

2. Movie Booking System (Optional)
A web application for selecting movie seats, booking tickets, and viewing booking details, with dynamic seat selection.
Features

Seat Selection: Choose a variable number of consecutive seats (prioritizes right, then left).
Dynamic Booking: Input desired seat count (1–10) and select available seats.
Booking Summary: View selected seats and total cost.
Responsive Design: Mobile-friendly with Bootstrap 5.
Row-Based Layout: Seats organized in rows (A, B, C, D, E) with statuses (booked, fast-selling).

Folder Structure (if included)
movie-booking-system/
├── src/
│   ├── app/
│   │   ├── booking/
│   │   ├── services/
│   │   │   ├── booking.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.config.ts
│   ├── styles.css
├── angular.json
├── package.json

Prerequisites

Node.js: v18.x or later
Angular CLI: v19.x (npm install -g @angular/cli@19)
Git: For cloning the repository
Browser: Chrome, Firefox, or Edge for testing

Setup Instructions

Clone the Repository:
cd E:\workspace
git clone https://github.com/krish4114329/internship-2025.git
cd internship-2025


If cloning fails due to network issues, try:git config --global http.postBuffer 524288000
git clone https://github.com/krish4114329/internship-2025.git

Or download the ZIP from GitHub and extract to E:\workspace\internship-2025.


Install Dependencies:

For Food Ordering System:cd food-ordering-system
npm install


For Movie Booking System (if present):cd movie-booking-system
npm install




Run the Application:

For Food Ordering System:cd food-ordering-system
ng serve


For Movie Booking System (if present):cd movie-booking-system
ng serve


Open http://localhost:4200 in your browser.


Verify Setup:

Ensure angular.json includes Bootstrap:"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]


Confirm src/styles.css has dark mode styles (Food Ordering System):body.dark {
  background-color: #212529;
  color: #f8f9fa;
}
body.dark .navbar {
  background-color: #343a40 !important;
}
body.dark .card, body.dark .form-control, body.dark .btn {
  background-color: #343a40;
  color: #f8f9fa;
  border-color: #495057;
}





Usage
Food Ordering System

Home: View the landing page (/).
Menu: Browse items, filter by search or category, and click "Add to Cart" (/menu).
Cart: View, update, or remove items; proceed to checkout (/cart).
Checkout: Place an order, clearing the cart (/checkout).
Login/Signup: Authenticate using email/password (/auth).
Reviews: View or add reviews for items (/reviews/:id, e.g., /reviews/1).
Dark Mode: Toggle via the navbar button.

Movie Booking System (if included)

Seat Selection: Choose a seat and input desired seat count (1–10).
Booking: Select consecutive available seats and confirm.
Summary: View booked seats and total cost.

Troubleshooting

Git Clone Error:
Use SSH: git clone git@github.com:krish4114329/internship-2025.git.
Try shallow clone: git clone --depth 1 https://github.com/krish4114329/internship-2025.git.


Navbar Issues (Food Ordering System):
Check console errors (F12) when clicking Menu, Cart, or Login/Signup.
Ensure app.config.ts has all routes:provideRouter([
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  { path: '**', redirectTo: '' }
])


Verify app.component.ts imports RouterLink, RouterLinkActive.


Dependencies:
Clear npm cache:npm cache clean --force
rmdir /s /q node_modules
del package-lock.json
npm install




Food Images: Ensure MenuService uses valid URLs or local images in src/assets/images.

Contributing

Fork the repository.
Create a branch: git checkout -b feature/your-feature.
Commit changes: git commit -m "Add your feature".
Push: git push origin feature/your-feature.
Submit a pull request.

License
MIT License. See LICENSE for details.
