import React, { useContext, useMemo } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
  emptyCart,
} from "../../../assets/images/index";
import { DataContext } from "../../../context/StoreContext";
import { useLocation } from "react-router-dom";

const SpecialOffers = () => {
  const { products } = useContext(DataContext);
  const location = useLocation();
  const pathname = location.pathname;

  // Memoize the filtered products based on pathname
  const filteredProducts = useMemo(() => {
    if (pathname === "/offer") {
      return products;
    } else {
      return products.slice(10, 14);
    }
  }, [pathname, products]);

  // Memoize the image URLs for better performance
  const getImageUrl = (imageList) => {
    return imageList[0].startsWith("https")
      ? imageList[0]
      : `${process.env.REACT_APP_API_BASE_URL}/uploads/${imageList[0]}`;
  };

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      {products.length ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map(
            ({ _id, title, description, price, imageList }) => (
              <Product
                key={_id}
                _id={_id}
                img={getImageUrl(imageList)}
                productName={title}
                price={price}
                color="Blank and White"
                badge={true}
                des={description}
              />
            )
          )}
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
    </div>
  );
};

export default React.memo(SpecialOffers);
