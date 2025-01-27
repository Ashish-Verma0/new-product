import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Breadcrumbs = ({ prevLocation, title }) => {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState("");

  useEffect(() => {
    setLocationPath(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <div className="w-full py-10 xl:py-10 flex flex-col gap-3">
      {/* Title with Ellipsis */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primeColor font-titleFont font-bold truncate overflow-hidden whitespace-nowrap">
        {title}
      </h1>

      {/* Breadcrumb Path with Ellipsis */}
      <p className="text-sm font-normal text-lightText capitalize flex items-center truncate overflow-hidden whitespace-nowrap">
        <span className="truncate overflow-hidden whitespace-nowrap">
          {prevLocation === "" ? "Home" : prevLocation}
        </span>
        <span className="px-1">
          <HiOutlineChevronRight />
        </span>
        <span className="capitalize font-semibold text-primeColor truncate overflow-hidden whitespace-nowrap">
          {locationPath}
        </span>
      </p>
    </div>
  );
};

export default React.memo(Breadcrumbs);
