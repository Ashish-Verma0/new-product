import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getFetch } from "../api/Api";

export const DataContext = createContext({
  categories: [],
  products: [],
  selectedCategory: "",
  setSelectedCategory: "",
  profile: {},
});

const StoreContext = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState({});
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/setting/${process.env.REACT_APP_SHOP_NAME}`
      );
      setCategories(res.data.data.categories);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products?page=0&limit=20&seller=${process.env.REACT_APP_SHOP_NAME}`
      );
      setProducts(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await getFetch(
        `${process.env.REACT_APP_API_BASE_URL}/user/profile`
      );
      setProfile(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    getUserDetails();
  }, []);

  return (
    <DataContext.Provider
      value={{
        categories,
        products,
        selectedCategory,
        setSelectedCategory,
        profile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default StoreContext;
