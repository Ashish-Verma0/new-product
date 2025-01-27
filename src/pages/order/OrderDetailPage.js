import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { emptyCart } from "../../assets/images";

const OrderDetailPage = () => {
  const location = useLocation();
  const orderDetail = location.state;

  const totalAmount = useMemo(
    () => orderDetail?.price * orderDetail?.quantity || 0,
    [orderDetail?.price, orderDetail?.quantity]
  );

  const discountedTotal = useMemo(
    () =>
      Number(totalAmount * process.env.REACT_APP_THIRTY_PERCENT_EXTRA) -
        totalAmount || 0,
    [totalAmount]
  );

  const finalTotal = useMemo(() => totalAmount + 50, [totalAmount]);

  if (!orderDetail?.productId?.title?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] bg-white rounded-lg shadow-md">
        <img
          src={emptyCart}
          alt="No Products"
          className="w-40 h-40 object-contain mb-4"
        />
        <p className="text-gray-500 text-lg font-semibold text-center">
          No Products Available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F5F3] py-8">
      <div className="max-w-container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-primeColor mb-8 break-words">
          Order Details - {orderDetail._id}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div
              className="space-y-6"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              <div
                key={orderDetail.productId._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    className="w-20 h-20 object-cover rounded-md mr-4"
                    src={
                      orderDetail.productId.imageList[0].startsWith("https")
                        ? orderDetail.productId.imageList[0]
                        : `${process.env.REACT_APP_API_BASE_URL}/uploads/${orderDetail.productId.imageList[0]}`
                    }
                    alt={orderDetail.productId.title}
                  />
                  <div>
                    <h3 className="text-lg font-semibold break-words">
                      {orderDetail.productId.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {orderDetail.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ₹{orderDetail.price}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 break-words">
                  ₹{orderDetail.price * orderDetail.quantity}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 break-words">
                <strong>Name:</strong> {orderDetail.addressId.name}
              </p>
              <p className="text-sm text-gray-600 break-words">
                <strong>Address:</strong> {orderDetail.addressId.address}
              </p>
              <p className="text-sm text-gray-600 break-words">
                <strong>Phone:</strong> {orderDetail.addressId.phoneNumber}
              </p>
              <p className="text-sm text-gray-600 break-words">
                <strong>Postal Code:</strong> {orderDetail.addressId.postalCode}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Pricing Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-sm text-gray-600">
                ₹{totalAmount + discountedTotal}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Discount</p>
              <p className="text-sm text-gray-600">
                -₹{discountedTotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Shipping Fee</p>
              <p className="text-sm text-gray-600">+₹{50}</p>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <p>Total</p>
              <p>₹{finalTotal}</p>
            </div>
          </div>
        </div>

        {/* Back to Orders */}
        <div className="mt-8 text-center">
          <Link
            to="/order"
            className="bg-primeColor text-white font-semibold py-2 px-6 rounded-md hover:bg-black duration-300"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
