import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

const ShopProductTile = ({
  product,
  handleProductDetails,
  handleAddToCart,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleProductDetails(product._id)}>
        <div className="relative mx-3">
          <img className="w-full h-[300px] object-cover rounded-lg" />
          {product.salePrice ? (
            <Badge
              variant="outline"
              className="absolute top-2 bg-red-500 text-sm m-2"
            >
              On Sale
            </Badge>
          ) : null}
        </div>
        <CardContent>
          <h2 className="text-xl font-bold my-2">{product?.title}</h2>
          <div className="flex justify-between items-center text-muted-foreground">
            <span>{product?.category}</span>
            <span>{product?.brand}</span>
          </div>
          {product?.salePrice > 0 ? (
            <span className="font-semibold">
              {" "}
              <span className="font-base line-through text-gray-400 mr-2">
                ${product?.price}
              </span>
              ${product.salePrice}
            </span>
          ) : <span className="font-semibold">${product.price}</span>}
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddToCart(product?._id)}
          className="w-full mt-2 cursor-pointer"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShopProductTile;
