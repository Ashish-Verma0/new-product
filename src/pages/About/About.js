import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      {/* Breadcrumbs Component */}
      <Breadcrumbs title="About" prevLocation={prevLocation} />

      <div className="pb-10">
        {/* Intro Section */}
        <h1 className="max-w-[600px] text-base text-lightText mb-4">
          <span className="text-primeColor font-semibold text-lg">
            Globel Info Tech
          </span>{" "}
          is one of the world's leading ecommerce brands and is internationally
          recognized for celebrating the essence of classic worldwide cool
          looking style.
        </h1>
        <p className="text-base text-lightText mb-6">
          At{" "}
          <span className="text-primeColor font-semibold">
            Globel Info Tech
          </span>
          , we are committed to leveraging cutting-edge technology to deliver a
          seamless shopping experience for our customers. Our platform combines
          innovation and elegance to redefine the way people shop for their
          favorite products.
        </p>

        {/* Key Points Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-4">What We Do:</h2>
          <ul className="list-disc list-inside text-lightText space-y-2">
            <li>
              <span className="text-primeColor font-semibold">
                Ecommerce Innovation:
              </span>{" "}
              Offering a wide range of products, from clothing to electronics,
              through an intuitive and user-friendly platform.
            </li>
            <li>
              <span className="text-primeColor font-semibold">
                Global Reach:
              </span>{" "}
              Delivering products to customers worldwide with a focus on timely
              and efficient logistics.
            </li>
            <li>
              <span className="text-primeColor font-semibold">
                Customer Focus:
              </span>{" "}
              Providing personalized shopping experiences tailored to individual
              preferences and needs.
            </li>
            <li>
              <span className="text-primeColor font-semibold">
                Sustainability:
              </span>{" "}
              Committed to sourcing products ethically and ensuring our
              operations are environmentally friendly.
            </li>
            <li>
              <span className="text-primeColor font-semibold">
                Technology Integration:
              </span>{" "}
              Utilizing the latest tech innovations, including AI-driven
              recommendations and secure payment gateways, to enhance customer
              satisfaction.
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
