// import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../../redux/orebiSlice";

// const ProductInfo = ({ productInfo }) => {
//   const dispatch = useDispatch();
//   return (
//     <div className="flex flex-col gap-5">
//       <h2 className="text-4xl font-semibold ">{productInfo.productName}</h2>
//       <p className="text-xl font-semibold">${productInfo.price}</p>
//       <p className="text-base text-gray-600">{productInfo.des}</p>
//       <p className="text-sm">Be the first to leave a review.</p>
//       <p className="font-medium text-lg">
//         <span className="font-normal">Colors:</span> {productInfo.color}
//       </p>
//       <button
//         onClick={() =>
//           dispatch(
//             addToCart({
//               _id: productInfo.id,
//               name: productInfo.productName,
//               quantity: 1,
//               image: productInfo.img,
//               badge: productInfo.badge,
//               price: productInfo.price,
//               colors: productInfo.color,
//             })
//           )
//         }
//         className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
//       >
//         Add to Cart
//       </button>
//       <p className="font-normal text-sm">
//         <span className="text-base font-medium"> Categories:</span> Spring
//         collection, Streetwear, Women Tags: featured SKU: N/A
//       </p>
//     </div>
//   );
// };

// export default ProductInfo;

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      {/* Dynamic Product Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold break-words">
        {productInfo.productName}
      </h2>

      {/* Product Price */}
      <p className="text-xl font-semibold">${productInfo.price}</p>

      {/* Dynamic Product Description */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 break-words">
        {productInfo.des}
      </p>

      <p className="text-sm">Be the first to leave a review.</p>

      {/* Product Color */}
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo._id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: productInfo.price,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>

      {/* Categories and Tags */}
      <p className="font-normal text-sm">
        <span className="text-base font-medium">Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default React.memo(ProductInfo);
