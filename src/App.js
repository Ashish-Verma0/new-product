// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
//   createRoutesFromElements,
//   Route,
//   ScrollRestoration,
// } from "react-router-dom";
// import Footer from "./components/home/Footer/Footer";
// import FooterBottom from "./components/home/Footer/FooterBottom";
// import Header from "./components/home/Header/Header";
// import HeaderBottom from "./components/home/Header/HeaderBottom";
// import SpecialCase from "./components/SpecialCase/SpecialCase";
// import About from "./pages/About/About";
// import SignIn from "./pages/Account/SignIn";
// import SignUp from "./pages/Account/SignUp";
// import Cart from "./pages/Cart/Cart";
// import Contact from "./pages/Contact/Contact";
// import Home from "./pages/Home/Home";
// import Journal from "./pages/Journal/Journal";
// import Offer from "./pages/Offer/Offer";
// import Payment from "./pages/payment/Payment";
// import ProductDetails from "./pages/ProductDetails/ProductDetails";
// import Shop from "./pages/Shop/Shop";
// import Otp from "./pages/Account/Otp";
// import Order from "./pages/order/Order";
// import OrderDetailPage from "./pages/order/OrderDetailPage";
// import Profile from "./pages/Account/Profile";
// import VerifyEmail from "./pages/Account/VerifyEmail";
// import ResetPassword from "./pages/Account/ResetPassword ";
// import VerifySignupOtp from "./pages/Account/VerifySignupOtp";

// const Layout = () => {
//   const token = "jdshvcjhsdv";
//   return (
//     <div>
//       <Header />
//       <HeaderBottom />
//       <SpecialCase />
//       <ScrollRestoration />
//       <Outlet />
//       <Footer />
//       <FooterBottom />
//     </div>
//   );
// };
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       {/* if token available then show it */}
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />}></Route>
//         <Route path="/shop" element={<Shop />}></Route>
//         <Route path="/about" element={<About />}></Route>
//         <Route path="/contact" element={<Contact />}></Route>
//         <Route path="/journal" element={<Journal />}></Route>
//         <Route path="/offer" element={<Offer />}></Route>
//         <Route path="/product/:_id" element={<ProductDetails />}></Route>
//         <Route path="/cart" element={<Cart />}></Route>
//         <Route path="/paymentgateway" element={<Payment />}></Route>
//         <Route path="/order" element={<Order />}></Route>
//         <Route path="/order-detail/:id" element={<OrderDetailPage />}></Route>
//         <Route path="/profile" element={<Profile />}></Route>
//       </Route>

//       {/* if token not available then show it */}
//       <Route path="/signup" element={<SignUp />}></Route>
//       <Route path="/signin" element={<SignIn />}></Route>
//       <Route path="/verify-signup" element={<VerifySignupOtp />}></Route>
//       <Route path="/verify-email" element={<VerifyEmail />}></Route>
//       <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
//       <Route path="/otp" element={<Otp />}></Route>
//     </Route>
//   )
// );

// function App() {
//   return (
//     <div className="font-bodyFont">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Otp from "./pages/Account/Otp";
import Order from "./pages/order/Order";
import OrderDetailPage from "./pages/order/OrderDetailPage";
import Profile from "./pages/Account/Profile";
import VerifyEmail from "./pages/Account/VerifyEmail";
import ResetPassword from "./pages/Account/ResetPassword ";
import VerifySignupOtp from "./pages/Account/VerifySignupOtp";

const Layout = () => (
  <div>
    <Header />
    <HeaderBottom />
    <SpecialCase />
    <ScrollRestoration />
    <Outlet />
    <Footer />
    <FooterBottom />
  </div>
);

// A function to check token and render routes accordingly
const ProtectedRoute = ({ element, token }) => {
  return token ? element : <Navigate to="/signin" />;
};

const PublicRoute = ({ element, token }) => {
  return token ? <Navigate to="/" /> : element;
};

const App = () => {
  const token = localStorage.getItem("token"); // Fetch token from local storage or other source

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Protected routes (Require token) */}
        <Route
          path="/"
          element={<ProtectedRoute element={<Layout />} token={token} />}
        >
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/product/:_id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/paymentgateway" element={<Payment />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-detail/:id" element={<OrderDetailPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Public routes (No token required) */}
        <Route
          path="/signup"
          element={<PublicRoute element={<SignUp />} token={token} />}
        />
        <Route
          path="/signin"
          element={<PublicRoute element={<SignIn />} token={token} />}
        />
        <Route
          path="/verify-signup"
          element={<PublicRoute element={<VerifySignupOtp />} token={token} />}
        />
        <Route
          path="/verify-email"
          element={<PublicRoute element={<VerifyEmail />} token={token} />}
        />
        <Route
          path="/reset-password/:token"
          element={<PublicRoute element={<ResetPassword />} token={token} />}
        />
        <Route
          path="/otp"
          element={<PublicRoute element={<Otp />} token={token} />}
        />
      </Route>
    )
  );

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
