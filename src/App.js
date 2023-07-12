// CSS
import "./App.css";

// Router
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Components
import Header from "./components/Header/Header";

// firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Hooks
import { useState, useEffect } from "react";

// Pages
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import MakeAWish from "./Pages/MakeAWish/MakeAWish";
import Orders from "./Pages/Orders/Orders";
import DetailOrder from "./Pages/DetailOrder/DetailOrder";
import EditOrder from "./Pages/EditOrder/EditOrder";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Category from "./Pages/Category/Category";
import EditCategory from "./Pages/EditCategory/EditCategory";
import CreateCategory from "./Pages/CreateCategory/CreateCategory";
import Products from "./Pages/Products/Products";
import CreateProduct from "./Pages/CreateProduct/CreateProduct";
import Collaborator from "./Pages/Collaborator/Collaborator";

function App() {
  // All states for messages in pages
  // Categorys
  const [categorySaveMessage, setCategorySaveMessage] = useState(false);
  const [categoryDeleteMessage, setCategoryDeleteMessage] = useState(false);
  const [categoryCreateMessage, setCategoryCreateMessage] = useState(false);
  // Products
  const [productSaveMessage, setProductSaveMessage] = useState(false);
  const [productDeleteMessage, setProductDeleteMessage] = useState(false);
  const [productCreateMessage, setProductCreateMessage] = useState(false);

  const [user, setUser] = useState("");

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth, user]);


  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, [pathname]);

    return null;
  };

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Header />}
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/create_order"
            element={user ? <MakeAWish user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={user ? <Orders /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders/detail_order/:id"
            element={user ? <DetailOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders/edit_order/:id"
            element={user ? <EditOrder /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={
              user ? (
                <Products
                  productSaveMessage={productSaveMessage}
                  setProductSaveMessage={setProductSaveMessage}
                  productDeleteMessage={productDeleteMessage}
                  setProductDeleteMessage={setProductDeleteMessage}
                  productCreateMessage={productCreateMessage}
                  setProductCreateMessage={setProductCreateMessage}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/products/create_product"
            element={
              user ? (
                <CreateProduct
                  setProductCreateMessage={setProductCreateMessage}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/category/create_category"
            element={
              user ? (
                <CreateCategory
                  setCategoryCreateMessage={setCategoryCreateMessage}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/category"
            element={
              user ? (
                <Category
                  categorySaveMessage={categorySaveMessage}
                  setCategorySaveMessage={setCategorySaveMessage}
                  categoryDeleteMessage={categoryDeleteMessage}
                  setCategoryDeleteMessage={setCategoryDeleteMessage}
                  categoryCreateMessage={categoryCreateMessage}
                  setCategoryCreateMessage={setCategoryCreateMessage}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/category/edit_category/:id"
            element={
              user ? (
                <EditCategory
                  setCategorySaveMessage={setCategorySaveMessage}
                  setCategoryDeleteMessage={setCategoryDeleteMessage}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="register"
            element={user ? <Collaborator /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
