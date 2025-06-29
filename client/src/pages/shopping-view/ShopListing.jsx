import ProductFilter from "@/components/shopping-view/ProductFilter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopProductTile from "./ShopProductTile";
import {
  fetchFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/shopSlice";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";

const ShopListing = () => {
  const initialState = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [currentEditID, setCurrentEditID] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    //console.log(queryParams);
    return queryParams.join("&");
  };

  useEffect(() => {
    setSortBy("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sortBy !== null)
      dispatch(
        fetchFilteredProducts({ filterParams: filters, sortParams: sortBy })
      ).then((data) => {
        if (data?.payload?.success) {
          setListOfProducts(data?.payload?.data);
        } else {
          console.log(data);
        }
      });
  }, [dispatch, sortBy, filters]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
      console.log(createQueryString);
    }
  }, [filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, []);

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleFilter = (getSectionID, getCurrentOption) => {
    console.log(getSectionID, getCurrentOption);

    let copyFilter = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionID);
    //console.log(indexOfCurrentSection);
    if (indexOfCurrentSection === -1) {
      copyFilter = {
        ...copyFilter,
        [getSectionID]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilter[getSectionID].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        copyFilter[getSectionID].push(getCurrentOption);
      else copyFilter[getSectionID].splice(indexOfCurrentOption, 1);
    }
    setFilters(copyFilter);
    sessionStorage.setItem("filters", JSON.stringify(copyFilter));
  };

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

  // console.log("Sort", sortBy);
  // console.log("Filter", filters);
  //console.log("Search Params", searchParams);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 p-5 ">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {listOfProducts.length > 0 ? listOfProducts.length :0} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="cursor-pointer">
                  <ArrowUpDown />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={handleSort}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-3">
          {listOfProducts.map((product) => (
            <ShopProductTile
              key={product._id}
              product={product}
              handleProductDetails={handleProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <ProductDetails
        productDetails={productDetails}
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShopListing;
