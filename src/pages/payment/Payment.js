import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Card,
  Divider,
  CardMedia,
  AppBar,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BillingAddAddress from "./BillingAddAddress";
import BillingModal from "./BillingModal";
import { useSelector } from "react-redux";
import { getFetch } from "../../api/Api";
import { DataContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import useData from "../../context/useData";
import { createTransaction, orderCreate } from "../../hook/hook";
import urls from "../../constants/api";
import { emptyCart } from "../../assets/images";

const Payment = () => {
  const {
    setting,
    errorMessage,
    successMessage,
    setIsLoading,
    selectedUserLocations,
  } = useData();
  const { profile } = useContext(DataContext);
  const [addressDrawerOpen, setAddressDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sellerLocation, setSellerLocation] = useState([]);
  const [fetchAddressDataRefresh, setFetchAddressDataRefresh] = useState(false);
  const [hide, setHide] = useState(false);
  const products = useSelector((state) => state?.orebiReducer?.products);
  const addressData = localStorage.getItem("address");
  const addresses = JSON.parse(addressData);

  const sellerAddress = async () => {
    try {
      const res = await getFetch(
        `${process.env.REACT_APP_API_BASE_URL}/setting/${process.env.REACT_APP_SHOP_NAME}`
      );
      setSellerLocation(res.data.data.deliveryLocation);
      if (res.status === "success") {
        alert(res.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  function getDeliveryDetails(address, sellerLocation) {
    for (const location of sellerLocation) {
      if (location?.state === address?.state) {
        for (const city of location.cities) {
          if (
            city?.city === address?.city &&
            city?.pinCode === address?.postalCode &&
            city?.area === address?.area
          ) {
            return {
              deliveryCharge: city?.deliveryCharge,
              time: city?.time,
            };
          }
        }
      }
    }
    return null;
  }

  const deliveryDetails = getDeliveryDetails(addresses, sellerLocation);

  useEffect(() => {
    sellerAddress();
  }, []);

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const Total = subtotal + Number(deliveryDetails?.deliveryCharge);

  const navigate = useNavigate();

  // const handleOrder = () => {
  //   try {
  //     navigate("/order");
  //   } catch (error) {
  //     console.log("first");
  //   }
  // };

  // Razorpay Configuration
  // const loadRazorpayScript = () => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.onload = () => resolve(true);
  //     script.onerror = () => resolve(false);
  //     document.body.appendChild(script);
  //   });
  // };
  // const handlePayNow = async () => {
  //   try {
  //     setIsLoading(true);
  //     console.log(Total);

  //     const res = await orderCreate({ amount: Total, seller: setting?.seller });
  //     if (res?.status === "success") {
  //       const options = {
  //         description: `Purchase from ${urls.appName}`,
  //         image: `${urls.baseurl}${urls.image}${setting?.AppLogo}`,
  //         currency: "INR",
  //         key: setting?.paymentKey,
  //         amount: (Total * 100).toFixed(0),
  //         name: setting?.seller,
  //         order_id: res?.data?.id,
  //         handler: handleVerifyAndCreateOrderAfterPayment,
  //         prefill: {
  //           name: selectedUserLocations?.name,
  //           contact: selectedUserLocations?.phoneNumber,
  //           email: selectedUserLocations?.email,
  //         },
  //         theme: { color: "#007bff" },
  //       };

  //       const isLoaded = await loadRazorpayScript();
  //       if (!isLoaded) {
  //         errorMessage(
  //           "Failed to load Razorpay. Check your internet connection."
  //         );
  //         return;
  //       }

  //       const rzp = new window.Razorpay(options);
  //       rzp.open();

  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //   }
  //   setIsLoading(false);
  // };

  // const handleVerifyAndCreateOrderAfterPayment = async (data) => {
  //   // Capture the signature in the success response
  //   const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;

  //   const transactionData = {
  //     orderId: razorpay_order_id,
  //     userId: profile?._id,
  //     amount: Total,
  //     paymentMethod: "Razor Pay",
  //     razorpayPaymentId: razorpay_payment_id,
  //     razorpayOrderId: razorpay_order_id,
  //     razorpaySignature: razorpay_signature,
  //     paymentGatewayReference: "Razor Pay",
  //     deliveryFee: 6,
  //     subTotal: 6,
  //     total: Total,
  //     seller: setting?.seller,
  //     orderData: {
  //       addressId: selectedUserLocations?._id,
  //       orders: products,
  //       time: 5,
  //     },
  //   };

  //   const transactionRes = await createTransaction(transactionData);
  //   if (transactionRes?.status === "success") {
  //     successMessage("Order Placed successfully ");
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //     errorMessage("Failed to placed order");
  //   }
  //   setIsLoading(false);
  // };

  const handlePlaceOrderCod = async () => {
    setHide(true);
    if (products?.length === 0) {
      errorMessage("No items in the cart to place an order.");
      setHide(false);
      return;
    }
    if (!addresses?._id) {
      errorMessage("Please select an address to place an order.");
      setHide(false);
      return;
    }

    setIsLoading(true);
    try {
      const transactionData = {
        userId: profile?._id,
        amount: Total,
        deliveryFee: deliveryDetails.deliveryCharge,
        subTotal: subtotal,
        total: Total,
        seller: profile?.seller,
        orderData: {
          addressId: addresses?._id,
          orders: products,
          time: deliveryDetails.time,
        },
        mode: "Cash on Delivery",
      };

      const transactionRes = await createTransaction(transactionData);
      if (transactionRes?.status === "success") {
        alert("Order placed successfully.");
        navigate("/order");
        setHide(false);
      } else {
        if (
          Array.isArray(transactionRes?.data?.errors) &&
          transactionRes.data.errors.length > 0
        ) {
          const errorMessages = transactionRes.data.errors.join("\n");
          alert(
            `Failed to place the order due to the following issues:\n${errorMessages}`
          );
        } else {
          alert("Failed to place the order due to an unknown error.");
        }
        errorMessage("Failed to place the order.");
        setHide(false);
      }
    } catch (error) {
      console.log("cjeckl this -->", error);
      errorMessage("Failed to place the order.");
      setHide(false);
    }
    setIsLoading(false);
    setHide(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "83vh",
        bgcolor: "#f5f5f5",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          p: 3,
          borderRadius: 2,
          flex: 1,
        }}
      >
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar style={{ background: "#13a0a8" }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Billing Here
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={4}>
          {/* My Cart Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "370px",
                overflowY: "auto",
                borderRadius: 3,
                padding: 1,
              }}
            >
              {products.length ? (
                products.map((item) => (
                  <Card
                    key={item._id}
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      mb: 2,
                      maxWidth: "100%",
                      borderRadius: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        objectFit: "cover",
                      }}
                      image={item.image}
                      alt={item.name}
                    />
                    <Box sx={{ flex: 1, ml: 2 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        noWrap
                        sx={{
                          maxWidth: "95px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="primary"
                      >
                        ₹{item.price}
                      </Typography>
                    </Box>
                  </Card>
                ))
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
            </Box>
          </Grid>

          {/* Billing Details Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: "8px",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Delivering to Home
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{
                    borderColor: "#13a0a8",
                    color: "#13a0a8",
                  }}
                  onClick={() => setAddressDrawerOpen(true)}
                >
                  Add New Address
                </Button>
              </Box>
              <Box ml={1}>
                <Typography>
                  {addresses?.name || "Dummy Address Add your Address"}
                </Typography>
                <Typography>
                  {addresses?.address || "Eldeco Udyan 2"},{" "}
                  {addresses?.city || "Lucknow"},{" "}
                  {addresses?.state || "Uttar Pradesh"} -
                  {addresses?.postalCode || 226022}
                </Typography>
                <Typography>
                  Mobile: {addresses?.phoneNumber || "+91 872565279"}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />

              <Typography>
                Delivery Charge: ₹{Number(deliveryDetails?.deliveryCharge || 0)}
              </Typography>
              <Typography>
                Delivery Time:
                {Number(deliveryDetails?.time || 0)} min
              </Typography>
              <Typography>Total: ₹{Total || 0}</Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, background: "#13a0a8" }}
                onClick={handlePlaceOrderCod}
                disabled={hide ? true : false}
              >
                {hide ? "please wait..." : "Place Order"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Add Address Modal  */}
      <BillingModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setFetchAddressDataRefresh={setFetchAddressDataRefresh}
        fetchAddressDataRefresh={fetchAddressDataRefresh}
      />
      {addressDrawerOpen ? (
        <BillingAddAddress
          setModalOpen={setModalOpen}
          setAddressDrawerOpen={setAddressDrawerOpen}
          open={addressDrawerOpen}
          fetchAddressDataRefresh={fetchAddressDataRefresh}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default Payment;

// let dataformat = {
//   userId: "676dba5eca915b90dd25ef49",
//   amount: 52,
//   deliveryFee: 5,
//   subTotal: 5,
//   total: 52,
//   seller: "GLOBEL INFO TECH",
//   orderData: {
//     addressId: "6792206a0fd4f316cc5a4bae",
//     orders: [
//       {
//         _id: "678f8a2112d5c663afe551c5",
//         name: ",dhjkvbjdskfhbvhsdfbvsdfijbgvnsdfsdfnvisudbfghibsdfhbvhdbfhjhvdfhjbvhjsdfbvhjsbdfhjvbjhdsfbvhjsdfbvjsbdfjhvbabhjbdfshjvbhdjsfbvjhdsbhvbdshjfbvjhsbdfhjvbshjdbfhjvsbzdProduct 1",
//         quantity: 1,
//         image: "http://localhost:3009/uploads/1737460257715.png",
//         badge: true,
//         price: 50,
//         colors: "Black",
//       },
//     ],
//     time: 5,
//   },
//   mode: "Cash on Delivery",
// };
