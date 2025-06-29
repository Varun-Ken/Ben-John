import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { setProductDetails } from "@/store/shop/shopSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ProductDetails = ({ open, setOpen, productDetails,handleAddToCart }) => {
  const userRating = 2;
  const userRatingArr = [];
  for (let rate = 1; rate <= 5; rate++) {
    userRatingArr.push(rate);
  }

  const dispatch = useDispatch()

  const handleDetailClose = () => {
    setOpen(false)
    dispatch(setProductDetails())
  }
  
  return (
    <Dialog open={open} onOpenChange={handleDetailClose} className="">
      <DialogTitle />
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            width={500}
            height={500}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-2xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground">
              {productDetails?.description}
            </p>
            <p className="my-1.5">
              <span className="text-muted-foreground line-through mr-2">
                ${productDetails?.price}
              </span>
              ${productDetails?.salePrice}
            </p>

            <div className="flex">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-black-400 mx-0.5"
                  aria-label="1 star"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-black-400 mx-0.5"
                  aria-label="2 star"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-black-400 mx-0.5"
                  aria-label="3 star"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-black-400 mx-0.5"
                  aria-label="4 star"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star-2 bg-black-400 mx-0.5"
                  aria-label="5 star"
                />
              </div>
              <p className="ml-2">(432)</p>
            </div>
            <div className="mt-5">
              <Button onClick={() => handleAddToCart(productDetails._id)} className="cursor-pointer">Add to Cart</Button>
            </div>
          </div>
          <Separator className="mt-5" />
          <div className="">
            <h3 className="text-xl font-semibold my-3">Reviews</h3>
            <div className="flex items-center">
              <Avatar>
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              <p className="ml-2">Tester</p>
            </div>
            <div className="rating my-3">
              {userRatingArr.map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-black-400 mx-0.5"
                  aria-label={`${star} star`}
                  defaultChecked={userRating === star}
                />
              ))}
            </div>
            <div>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
