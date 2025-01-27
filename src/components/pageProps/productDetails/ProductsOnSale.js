import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsOnSale = () => {
  const [products, setProducts] = useState([]);
  const isFetched = useRef(false);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products?page=0&limit=20&seller=${process.env.REACT_APP_SHOP_NAME}`
      );
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (elem) => {
      const data = {
        badge: true,
        color: "Blank and White",
        des: elem.description,
        img: elem.imageList?.[0]?.startsWith("https")
          ? elem.imageList[0]
          : `${process.env.REACT_APP_API_BASE_URL}/uploads/${elem.imageList[0]}`,
        price: elem.price,
        productName: elem.title,
        _id: elem._id,
      };

      navigate(`/product/${elem._id}`, {
        state: { item: data },
      });
    },
    [navigate]
  );

  const displayedProducts = useMemo(() => products.slice(0, 6), [products]);

  useEffect(() => {
    if (!isFetched.current) {
      fetchProducts();
      isFetched.current = true;
    }
  }, [fetchProducts]);

  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-col gap-2">
        {displayedProducts.map((elem) => (
          <div
            key={elem._id}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleNavigate(elem)}
          >
            <div>
              <img
                className="w-24"
                src={
                  elem.imageList?.[0]?.startsWith("https")
                    ? elem.imageList[0]
                    : elem.imageList?.[0]
                    ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${elem.imageList[0]}`
                    : "/placeholder.png"
                }
                alt={elem.title || "Product Image"}
              />
            </div>
            <div className="flex flex-col gap-2 font-titleFont">
              <p className="text-base font-medium truncate max-w-[100px]">
                {elem.title || "No title available"}
              </p>
              <p className="text-sm font-semibold">${elem.price || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductsOnSale);
