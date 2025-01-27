import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getLocations,
  getOrders,
  getProductlist,
  getProductlistWithCategory,
  getProductlistWithCategoryAndSub,
  getProfile,
  getSelectedProduct,
  getSetting,
} from "../hook/hook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import urls from "../constants/api";

const DataContext = createContext({
  isLoading: false,
  hasProductNextPage: false,
  categories: [],
  productList: [],
  sellerLocation: [],
  productDetail: [],
  userAddress: [],
  searchProductList: [],
  searchQuery: "",
  searchHasNextPage: false,
  profile: {},
  setting: {},
  categoriesProductList: [],
  subCategories: [],
  myOrders: [],
  cart: [],
  handleRemoveCartItem: () => {},
  handleSetIncCartItem: () => {},
  setSearchQuery: () => {},
  setIsLoading: () => {},
  fetchProductNextPage: () => {},
  fetchSearchProductNextPage: () => {},
  successMessage: () => {},
  errorMessage: () => {},
  infoMessage: () => {},
  getProfileData: () => {},
  getProductWithCategoryData: () => {},
  getProductData: () => {},
  handleSetSubCategory: () => {},
  handleSelectedProduct: () => {},
  getSelectedProductData: () => {},
  getProductWithCategoryAndSubData: () => {},
  geMyOrders: () => {},
  handleSetCartItem: () => {},
});

export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [searchProductList, setSearchProductList] = useState([]);
  const [categoriesProductList, setCategoriesProductList] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [hasProductNextPage, setHasProductNextPage] = useState(false);
  const [sellerLocation, setSellerLocation] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHasNextPage, setSearchHasNextPage] = useState(false);
  const [profile, setProfile] = useState({});
  const [setting, setSetting] = useState({});
  const [cart, setCart] = useState([]);

  const getUserLocations = async () => {
    const locations = await getLocations();

    if (locations?.status == "success") {
      setUserAddress(locations.data);
    }
  };

  useEffect(() => {
    getSellerData();
    getProfileData();
    getProductData();
  }, []);

  const getProductWithCategoryData = async (category) => {
    if (category?.length > 0) {
      const productListData = await getProductlistWithCategory(category);
      if (productListData?.status == "success") {
        setCategoriesProductList(productListData.data);
      }
    }
  };
  const getProductWithCategoryAndSubData = async (category, subCategory) => {
    if (category?.length > 0) {
      const productListData = await getProductlistWithCategoryAndSub(
        category,
        subCategory
      );
      if (productListData?.status == "success") {
        setCategoriesProductList(productListData.data);
      }
    }
  };

  const getProductData = async () => {
    const productListData = await getProductlist();

    if (productListData?.status == "success") {
      setProductList(productListData.data);
    }
  };

  const geMyOrders = async (page = 0) => {
    const ordersData = await getOrders(profile?._id, page);

    if (ordersData?.status == "success") {
      setMyOrders(ordersData.data);
    }
  };

  const getProfileData = async () => {
    const res = await getProfile();
    if (res?.status == "success") {
      setProfile(res.data);
    }
  };

  const getSellerData = async () => {
    const res = await getSetting(urls.appName);
    if (res?.status == "success") {
      setSetting(res.data);
      setCategories(res.data?.categories);
    }
  };

  const getSelectedProductData = async (id) => {
    const res = await getSelectedProduct(id);
    if (res?.status == "success") {
      setProductDetail(res.data);
    }
  };

  const handleSetSubCategory = (data) => {
    setSubCategories(data);
  };

  const handleSelectedProduct = (data) => {
    setProductDetail(data);
  };

  const handleSetIncCartItem = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleSetCartItem = (data) => {
    setCart((prevCart) => [...data, ...prevCart]);
  };

  const handleRemoveCartItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const fetchProductNextPage = () => {};
  const fetchSearchProductNextPage = () => {};

  const successMessage = (message = "Operation succesful!") =>
    toast.success(message);
  const errorMessage = (message = "Operation unsuccesful!") =>
    toast.error(message);
  const infoMessage = (message = "It may risky") => toast.info(message);

  const value = {
    isLoading,
    setIsLoading,
    categories,
    fetchProductNextPage,
    hasProductNextPage,
    productList,
    productDetail,
    sellerLocation,
    userAddress,
    searchQuery,
    setSearchQuery,
    searchProductList,
    fetchSearchProductNextPage,
    searchHasNextPage,
    profile,
    setting,
    successMessage,
    errorMessage,
    infoMessage,
    getProfileData,
    getProductWithCategoryData,
    categoriesProductList,
    getProductData,
    subCategories,
    handleSetSubCategory,
    handleSelectedProduct,
    getSelectedProductData,
    getProductWithCategoryAndSubData,
    myOrders,
    geMyOrders,
    cart,
    handleSetIncCartItem,
    handleRemoveCartItem,
    handleSetCartItem,
    getUserLocations,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom Hook to Use Data Context
const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};

export default useData;
