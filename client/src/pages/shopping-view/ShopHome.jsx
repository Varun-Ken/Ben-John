import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import {
  Baby,
  ChevronLeft,
  ChevronRight,
  ShirtIcon,
  ShowerHead,
  TowerControl,
  WarehouseIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/shopSlice";
import ShopProductTile from "./ShopProductTile";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";
import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";

const ShopHome = () => {
  const slides = [banner1, banner2, banner3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  
  const { user } = useSelector((state) => state.auth);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: TowerControl },
    { id: "kids", label: "Kids", icon: Baby },
    { id: "accessories", label: "Accessories", icon: WarehouseIcon },
    { id: "footwear", label: "Footwear", icon: ShowerHead },
  ];

  //Auto Changing Slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  //Get Products
  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, []);

  //Featured Products
  useEffect(() => {
    if (productList && productList.length > 0) {
      setFeaturedProducts(productList.slice(0, 4));
    }
  }, [productList]);

  useEffect(() => {
      if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

  const handleProductDetails = (getCurrentProductID) => {
    dispatch(fetchProductDetails(getCurrentProductID));
  };

  const handleAddToCart = (productId) => {
    console.log(user);
    dispatch(addToCart({ userId: user.id, productId, quantity: 1 })).then(
      (data) => {
        console.log(data);
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id)).then((data) => console.log(data));
          toast("🛒Product Added to the Cart");
        }
      }
    );
  };

  const handleNavigateToListingPage = (currentItem,section) => {
    sessionStorage.removeItem("filters")
    navigate("/shop/listing")
    const currentFilter = {
      [section] : [currentItem]
    }
    sessionStorage.setItem("filters",JSON.stringify(currentFilter))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          className="absolute top-1/2 left-3 cursor-pointer"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="absolute top-1/2 right-3 cursor-pointer"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronRight />
        </Button>
      </div>
      <section className="py-5 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-5">
          Shop By Category
        </h2>
        <div className="grid grid-col-2 md:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 p-5">
          {categoriesWithIcon.map((categoriesItem) => (
            <Card onClick={()=> handleNavigateToListingPage(categoriesItem.id,"category")} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-5">
                <categoriesItem.icon className="h-12 w-12 mb-3" />
                <span>{categoriesItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-5 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-5">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4 gap-3 p-5">
          {featuredProducts.map((product) => (
            <ShopProductTile
              product={product}
              handleProductDetails={handleProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
          <ProductDetails
            productDetails={productDetails}
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </section>
    </div>
  );
};

export default ShopHome;
