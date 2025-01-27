import React, { useContext } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  emptyCart,
} from "../../../assets/images/index";
import { DataContext } from "../../../context/StoreContext";

const BestSellers = () => {
  const { products } = useContext(DataContext);
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      {products.length ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {products
            .slice(6, 10)
            .map(({ _id, title, description, price, imageList }) => (
              <div key={_id}>
                <Product
                  _id={_id}
                  img={
                    imageList[0].startsWith("https")
                      ? imageList[0]
                      : `${process.env.REACT_APP_API_BASE_URL}/uploads/${imageList[0]}`
                  }
                  productName={title}
                  price={price}
                  color="Blank and White"
                  badge={true}
                  des={description}
                />
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
    </div>
  );
};

export default React.memo(BestSellers);
