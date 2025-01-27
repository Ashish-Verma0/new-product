import {
  deleteFetch,
  getFetch,
  getOneFetch,
  postFetch,
  putFetch,
} from "../api/api-small";
import urls from "../constants/api";

// export const getAppSettinglist = (id) => getOneFetch(urls.setting, id);

export const getProductlistWithCategory = (category, limit = 10, page = 0) =>
  getFetch(
    `${urls.products}?seller=${
      urls.appName
    }&limit=${limit}&page=${page}&category=${category?.replaceAll("&", "---")}`
  );

export const getProductlistWithCategoryAndSub = (
  category,
  subCategory,
  limit = 10,
  page = 0
) =>
  getFetch(
    `${urls.products}?seller=${
      urls.appName
    }&limit=${limit}&page=${page}&category=${category?.replaceAll(
      "&",
      "---"
    )}&subCategory=${subCategory?.replaceAll("&", "---")}`
  );

export const addLocation = (data) => postFetch(urls.address, data);

export const deleteAddress = (id) => deleteFetch(urls.address, id);

export const getLocations = () => getFetch(urls.address);

export const getOrders = (id, page = 0) =>
  getFetch(`${urls.order}?limit=${10}&page=${page}&id=${id}`);

export const getProductlist = (limit = 10, page = 0) =>
  getFetch(
    `${urls.products}?seller=${urls.appName}&limit=${limit}&page=${page}`
  );

export const createTransaction = (data) => postFetch(urls.transaction, data);
export const createOrderData = (data) => postFetch(urls.order, data);

export const getSelectedProduct = (id) => getOneFetch(urls.products, id);

export const getAllProductBySeller = (seller, limit = 10, page = 0) => {
  let url = `${urls.products}?limit=${limit}&page=${page}&plat=abd`;
  if (seller) {
    url += `&seller=${seller}`;
  }
  return getFetch(url);
};

export const getAllUsers = (seller, limit = 10, page = 0) => {
  let url = `${urls.users}?limit=${limit}&page=${page}`;
  if (seller) {
    url += `&seller=${seller}`;
  }
  return getFetch(url);
};

export const getAllSellers = (limit = 10, page = 0, isVerified = "APPROVED") =>
  getFetch(
    `${urls.sellers}?limit=${limit}&page=${page}&isVerified=${isVerified}`
  );

export const getAllContactUs = (limit = 10, page = 0, seller) => {
  let url = `${urls.contact}?limit=${limit}&page=${page}`;
  if (seller) {
    url += `&seller=${seller}`;
  }

  return getFetch(url);
};

export const getAllRechargeTransactions = (
  limit = 10,
  page = 0,
  seller,
  type
) => {
  let url = `${urls.rechargeTransaction}?limit=${limit}&page=${page}`;

  if (seller) {
    url += `&seller=${seller}`;
  }

  if (type) {
    url += `&type=${type}`;
  }

  return getFetch(url);
};

export const postLogin = (data) => postFetch(urls.login, data);

export const signup = (data) => postFetch(urls.signup, data);
export const verify = (data) => postFetch(urls.verify, data);

export const getProfile = () => getFetch(urls.profile);

export const getConfig = () => getFetch(urls.config);
export const appSetting = (data, isForm) =>
  postFetch(urls.setting, data, isForm);

export const getSetting = (seller) => getFetch(`${urls.setting}${seller}`);

export const getSellerList = () => getFetch(urls.sellerList);

export const getReport = (seller) =>
  getFetch(`${urls.report}?seller=${seller}`);

export const getAdminReport = (seller) => getFetch(urls.adminreport);

export const editSetting = (data, id, isForm) =>
  putFetch(`${urls.setting}/${id}`, data, isForm);

export const editAppsetingWithLogo = (id, data, isForm) =>
  putFetch(`${urls.editsetting}${id}`, data, isForm);

export const verifySeller = (id, data, isForm) =>
  putFetch(`${urls.verifySeller}${id}`, data, isForm);

export const bulkProductUpload = (data, seller, isForm) =>
  postFetch(`${urls.bulkProducts}?seller=${seller}`, data, isForm);

export const uploadApk = (data, isForm) =>
  postFetch(urls.uploadApp, data, isForm);

export const bulkCategoryUpload = (data, seller, isForm) =>
  postFetch(`${urls.bulkCategory}?seller=${seller}`, data, isForm);

export const editOrder = (data) => postFetch(urls.editorder, data);

export const editContact = (id, data) => putFetch(`${urls.contact}${id}`, data);

export const editUser = (id, data) => putFetch(`${urls.editUsers}${id}`, data);

export const deleteUser = (id) => deleteFetch(urls.users, id);

export const deleteTicket = (id) => deleteFetch(urls.case, id);

export const deleteSeller = (id) => deleteFetch(urls.setting, id);

export const deleteProduct = (id) => deleteFetch(urls.products, id);
export const deleteContact = (id) => deleteFetch(urls.contact, id);

export const mySetting = (seller) =>
  getFetch(`${urls.settingByname}?seller=${seller}`);

export const manageRecharge = (data) =>
  postFetch(urls.rechargeTransaction, data);

export const manageAddCash = (data) => postFetch(urls.addCash, data);

export const changePlan = (data) => postFetch(urls.changePlan, data);

export const orderCreate = (data) =>
  postFetch(`${urls.transaction}${urls.CREATE_ORDER}`, data);
