import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import axios from "axios";
import { DataContext } from "../../../context/StoreContext";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const { categories, setSelectedCategory } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  const token = localStorage.getItem("token");

  // Memoize category list for performance optimization
  const categoryList = useMemo(() => categories, [categories]);

  // Memoize search query handler
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Memoize filtered products
  const filteredProductsMemo = useMemo(() => {
    return paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    setFilteredProducts(filteredProductsMemo);
  }, [filteredProductsMemo]);

  const handleNavigate = (category) => {
    setSelectedCategory(category);
    navigate("/shop");
  };

  const [filteredProduct, setFilteredProduct] = useState([]);

  const fetchProductBySearch = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products?page=0&limit=20&seller=${process.env.REACT_APP_SHOP_NAME}&search=${searchQuery}`
      );
      setFilteredProduct(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      fetchProductBySearch();
    }
  }, [searchQuery, fetchProductBySearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowUser(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                {categoryList.map(({ category }) => (
                  <li
                    className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                    key={category}
                    onClick={() => handleNavigate(category)}
                  >
                    {category}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {filteredProduct?.map(
                  ({ _id, title, imageList, description, price }) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${title.toLowerCase().split(" ").join("")}`,
                          {
                            state: {
                              item: {
                                _id,
                                productName: title,
                                img: imageList[0].startsWith("https")
                                  ? imageList[0]
                                  : `${process.env.REACT_APP_API_BASE_URL}/uploads/${imageList[0]}`,
                                des: description,
                                price: price,
                              },
                            },
                          }
                        ) &
                        setShowSearchBar(true) &
                        setSearchQuery("")
                      }
                      key={_id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                    >
                      <img
                        className="w-24"
                        src={
                          imageList[0].startsWith("https")
                            ? imageList[0]
                            : `${process.env.REACT_APP_API_BASE_URL}/uploads/${imageList[0]}`
                        }
                        alt="productImg"
                      />
                      <div className="flex flex-col gap-1">
                        <p
                          className="font-semibold text-lg"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px", // Adjust this value as needed
                          }}
                        >
                          {title}
                        </p>
                        <p
                          className="text-xs"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px", // Adjust this value as needed
                          }}
                        >
                          {description}
                        </p>
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            ${price}
                          </span>
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-35 text-[#767676] h-auto p-4 pb-6"
              >
                {token === null ? (
                  <Link to="/signin" onClick={() => setShowUser(false)}>
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Login
                    </li>
                  </Link>
                ) : (
                  <>
                    <Link to="/profile" onClick={() => setShowUser(false)}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Profile
                      </li>
                    </Link>
                    <Link to="/order" onClick={() => setShowUser(false)}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Orders
                      </li>
                    </Link>
                    <Link to="/" onClick={() => setShowUser(false)}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Home
                      </li>
                    </Link>
                    <Link to="/" onClick={handleLogout}>
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        LogOut
                      </li>
                    </Link>
                  </>
                )}
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default React.memo(HeaderBottom);
