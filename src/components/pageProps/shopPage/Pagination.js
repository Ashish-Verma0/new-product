import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import axios from "axios";
import { DataContext } from "../../../context/StoreContext";
import { emptyCart } from "../../../assets/images";

function Items({ productData }) {
  return (
    <>
      {productData &&
        productData.map(({ _id, title, price, description, imageList }) => (
          <div key={_id} className="w-full">
            <Product
              _id={_id}
              img={
                imageList[0]?.startsWith("https")
                  ? imageList[0]
                  : `${process.env.REACT_APP_API_BASE_URL}/uploads/${imageList[0]}`
              }
              productName={title}
              price={price}
              color="Black"
              badge={true}
              des={description}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, selectedPriceOrder }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const { selectedCategory } = useContext(DataContext);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const pageCount = useMemo(
    () => Math.ceil(totalProducts / itemsPerPage),
    [totalProducts, itemsPerPage]
  );

  const fetchProductByCategory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products`,
        {
          params: {
            page,
            limit: itemsPerPage,
            seller: process.env.REACT_APP_SHOP_NAME,
            category: selectedCategory,
            priceOrderBy: selectedPriceOrder,
          },
        }
      );
      setProductData(res?.data?.data || []);
      setTotalProducts(res?.data?.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [page, itemsPerPage, selectedCategory, selectedPriceOrder]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchProductByCategory();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [fetchProductByCategory]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  console.log("productData", productData);
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : productData.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
          <Items productData={productData} />
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
          Products from {page * itemsPerPage + 1} to{" "}
          {Math.min((page + 1) * itemsPerPage, totalProducts)} of{" "}
          {totalProducts}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
