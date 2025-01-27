import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart } from "../../assets/images";
import { motion } from "framer-motion";
import { getFetch } from "../../api/Api";
import { DataContext } from "../../context/StoreContext";
import ReactPaginate from "react-paginate";

const Order = () => {
  const { profile } = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [totalProducts, setTotalProducts] = useState(10);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const isFetched = useRef(false);

  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    if (!profile?._id || !profile?.seller) return;
    setLoading(true);
    try {
      const res = await getFetch(
        `${process.env.REACT_APP_API_BASE_URL}/order?page=${page}&limit=${itemsPerPage}&id=${profile._id}&seller=${profile.seller}`
      );
      if (Array.isArray(res?.data?.data)) {
        setOrders(res.data.data);
      } else {
        setOrders([]);
      }
      setTotalProducts(res?.data?.total || 0);
      console.log("Orders fetched:", res);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [page, itemsPerPage, profile]);

  const handleNavigate = useCallback(
    (order) => {
      try {
        navigate(`/order-detail/${order._id}`, { state: order });
      } catch (error) {
        console.error("Error navigating:", error);
      }
    },
    [navigate]
  );

  const pageCount = useMemo(
    () => Math.ceil(totalProducts / itemsPerPage),
    [totalProducts, itemsPerPage]
  );

  const handlePageClick = useCallback((event) => {
    setPage(event.selected);
  }, []);

  useEffect(() => {
    if (!isFetched.current && profile?._id) {
      fetchOrders();
      isFetched.current = true;
    }
  }, [fetchOrders, profile]);

  return (
    <div className="w-full bg-[#F5F5F3] py-8">
      <div className="max-w-container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-primeColor mb-8">
          Your Order History
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="loader border-t-4 border-primeColor rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : orders?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order?._id}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-between"
              >
                <img
                  className="w-32 h-32 object-cover rounded-md mb-4"
                  src={
                    order.productId.imageList[0].startsWith("https")
                      ? order.productId.imageList[0]
                      : `${process.env.REACT_APP_API_BASE_URL}/uploads/${order.productId.imageList[0]}`
                  }
                  alt={order?.productId?.title}
                />
                <div className="flex flex-col gap-2 w-full">
                  <h3 className="text-lg font-semibold text-center max-w-[200px] truncate">
                    {order?.productId?.title}
                  </h3>
                  <p className="text-sm text-gray-600 max-w-[200px] truncate">
                    Transaction ID: {order?.transactionId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {order?.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ₹{order?.price}
                  </p>
                  <p
                    className={`text-sm font-semibold text-center ${
                      order?.status === "Delivered"
                        ? "text-green-500"
                        : order?.status === "Shipped"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {order?.status}
                  </p>
                </div>
                <div
                  onClick={() => handleNavigate(order)}
                  className="mt-4 text-primeColor font-semibold text-sm hover:underline"
                >
                  View Details
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <img
              src={emptyCart}
              alt="No Products"
              className="w-40 h-40 object-contain mb-4"
            />
            <p className="text-gray-500 text-lg font-semibold">
              No Products Available
            </p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
            <ReactPaginate
              nextLabel=""
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel=""
              pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
              pageClassName="mr-6"
              containerClassName="flex text-base font-semibold font-titleFont py-10"
              activeClassName="bg-black text-white"
            />
            <p className="text-base font-normal text-lightText">
              Products from {page === 0 ? 1 : page * itemsPerPage + 1} to{" "}
              {Math.min((page + 1) * itemsPerPage, totalProducts)} of{" "}
              {totalProducts}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Order);
