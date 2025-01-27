import React, { useContext } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
  emptyCart,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { DataContext } from "../../../context/StoreContext";

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const { products } = useContext(DataContext);

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      {products.length ? (
        <Slider {...settings}>
          {products
            .slice(0, 6)
            .map(({ _id, title, description, price, imageList }) => (
              <div className="px-2" key={_id}>
                <Product
                  _id={_id}
                  img={
                    imageList[0].startsWith("https")
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
        </Slider>
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

export default React.memo(NewArrivals);
