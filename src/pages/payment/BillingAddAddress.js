import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  Box,
  Card,
  Grid,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { deleteFetch, getFetch } from "../../api/Api";
import { DataContext } from "../../context/StoreContext";

const BillingAddAddress = ({
  open,
  setAddressDrawerOpen,
  setModalOpen,
  fetchAddressDataRefresh,
}) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useContext(DataContext);
  const fetchAddress = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getFetch(
        `${process.env.REACT_APP_API_BASE_URL}/address/`
      );
      if (res?.data?.status === "success") {
        setUserAddress(res?.data?.data || []);
      } else {
        console.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAddress = useCallback(async (id) => {
    try {
      const res = await deleteFetch(
        `${process.env.REACT_APP_API_BASE_URL}/address/`,
        id
      );
      if (res?.data?.status === "success") {
        setUserAddress((prev) => prev.filter((address) => address._id !== id));
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  }, []);

  const handleSelectAddress = useCallback(
    (address, index) => {
      setSelectedIndex(index);
      localStorage.setItem("address", JSON.stringify(address));
      setAddressDrawerOpen(false);
    },
    [setAddressDrawerOpen]
  );

  useEffect(() => {
    if (open) fetchAddress();
  }, [open, fetchAddress, profile, fetchAddressDataRefresh]);

  return (
    <Drawer
      anchor={isLargeScreen ? "right" : "bottom"}
      open={open}
      onClose={() => setAddressDrawerOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: isLargeScreen ? "30%" : "100%",
          height: isLargeScreen ? "100%" : "auto",
          maxHeight: "100%",
          boxShadow: 4,
          borderRadius: isLargeScreen ? 0 : "16px 16px 0 0",
          backgroundColor: "#f4f6fc",
        },
      }}
    >
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            cursor: "pointer",
          }}
          onClick={() => setAddressDrawerOpen(false)}
        >
          <KeyboardBackspaceIcon sx={{ mr: 2 }} />
          <Typography variant="h6" fontWeight="bold">
            Select Delivery Address
          </Typography>
        </Box>

        {/* Add New Address Section */}
        <Card
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            p: 1.5,
            cursor: "pointer",
            border: "1px dashed #13a0a8",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={() => setModalOpen(true)}
        >
          <AddLocationIcon sx={{ color: "#13a0a8", mr: 2 }} />
          <Typography
            sx={{
              textTransform: "none",
              color: "#13a0a8",
              fontWeight: "bold",
            }}
          >
            Add a New Address
          </Typography>
        </Card>

        {/* Address List Section */}
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            borderRadius: 3,
            p: 1,
            backgroundColor: "#f9f9f9",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
          }}
        >
          {loading ? (
            <Typography align="center">Loading addresses...</Typography>
          ) : userAddress.length > 0 ? (
            <Grid container spacing={2}>
              {userAddress.map((address, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      justifyContent: "space-between",
                      borderRadius: 2,
                      cursor: "pointer",
                      borderColor:
                        selectedIndex === index ? "primary.main" : "grey.300",
                      boxShadow: selectedIndex === index ? 4 : 1,
                    }}
                    onClick={() => handleSelectAddress(address, index)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HomeIcon
                        sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {address.name}
                        </Typography>
                        <Typography variant="body2">
                          {address.address}, {address.city}, {address.state} -{" "}
                          {address.postalCode}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      sx={{ backgroundColor: "#f8d7da" }}
                      onClick={() => deleteAddress(address?._id)}
                    >
                      <DeleteIcon sx={{ color: "#c00" }} />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography align="center" color="textSecondary">
              No saved addresses found. Add one!
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default React.memo(BillingAddAddress);
