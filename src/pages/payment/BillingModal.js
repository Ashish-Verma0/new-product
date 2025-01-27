import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { DataContext } from "../../context/StoreContext";
import { postFetchData } from "../../api/Api";

const BillingModal = ({
  modalOpen,
  setModalOpen,
  setFetchAddressDataRefresh,
  fetchAddressDataRefresh,
}) => {
  const { profile } = useContext(DataContext);

  const [sellerLocation, setSellerLocation] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    area: "",
    postalCode: "",
  });
  const [hide, setHide] = useState(false);
  const fetchLocation = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/setting/${process.env.REACT_APP_SHOP_NAME}`
      );
      setSellerLocation(res.data.data.deliveryLocation || []);
    } catch (error) {
      console.error("Error fetching seller locations:", error);
    }
  };

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        userId: profile._id || "",
        name: profile.name || "",
        phoneNumber: profile.phone || "",
      }));
    }
  }, [profile]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: "",
      area: "",
      postalCode: "",
    }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
      area: "",
      postalCode: "",
    }));
  };

  const handleAreaChange = (e) => {
    const selectedArea = e.target.value;
    const selectedCityData = sellerLocation
      .find((item) => item.state === formData.state)
      ?.cities.find((city) => city.city === formData.city);

    if (selectedCityData) {
      setFormData((prev) => ({
        ...prev,
        area: selectedArea,
        postalCode: selectedCityData.pinCode,
      }));
    }
  };

  const getAreasForSelectedCity = () => {
    const selectedCityData = sellerLocation
      .find((item) => item.state === formData.state)
      ?.cities.find((city) => city.city === formData.city);
    return selectedCityData?.area ? [selectedCityData.area] : [];
  };

  const addAddress = async () => {
    try {
      setHide(true);
      const res = await postFetchData(
        `${process.env.REACT_APP_API_BASE_URL}/address/`,
        formData
      );

      if (res.status === "success") {
        alert(res.message);
        setFetchAddressDataRefresh(!fetchAddressDataRefresh);
        setModalOpen(false);
        setHide(false);
      }
      setHide(false);
    } catch (error) {
      console.error("Error adding address:", error);
      setHide(false);
    }
  };

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          width: { xs: "90%", sm: 400 },
          maxWidth: 600,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Add Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              size="small"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              size="small"
            >
              {sellerLocation.map((item) => (
                <MenuItem key={item.state} value={item.state}>
                  {item.state}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleCityChange}
              size="small"
              disabled={!formData.state}
            >
              {sellerLocation
                .find((item) => item.state === formData.state)
                ?.cities.map((city) => (
                  <MenuItem key={city.city} value={city.city}>
                    {city.city}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Area"
              name="area"
              value={formData.area}
              onChange={handleAreaChange}
              size="small"
              disabled={!formData.city}
            >
              {getAreasForSelectedCity().map((area) => (
                <MenuItem key={area} value={area}>
                  {area}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, backgroundColor: "#13a0a8" }}
          onClick={addAddress}
          disabled={hide ? true : false}
        >
          {hide ? "please wait..." : "Add Address"}
        </Button>
      </Box>
    </Modal>
  );
};

export default BillingModal;
