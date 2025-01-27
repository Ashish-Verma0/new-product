import React, { useContext, useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import axios from "axios";
import { DataContext } from "../../../../context/StoreContext";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);

  const { categories, setSelectedCategory } = useContext(DataContext);
  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categories.map(({ category }) => (
            <li
              key={category}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
              onClick={() => setSelectedCategory(category)}
              style={{ cursor: "pointer" }}
            >
              {category}
              {/* {icons && ( */}
              <span
                onClick={() => setShowSubCatOne(!showSubCatOne)}
                className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
              >
                <ImPlus />
              </span>
              {/* // )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(Category);
