import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const AdminProductTile = ({
  product,
  setCurrentEditID,
  handleDeleteProduct,
  openCreateProduct,
  setOpenCreateProduct,
  setFormData
}) => {
  return (
    <Card className="w-full max-w-sm mx-3 h-32">
      <div>
        <div className="relative">
          <img />
        </div>
        <CardContent>
          <h2>{product?.title}</h2>
          <button
            className="btn btn-outline btn-primary mr-3"
            onClick={() => {
              setOpenCreateProduct(true), setFormData(product),setCurrentEditID(product?._id);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-active btn-error"
            onClick={() => handleDeleteProduct(product._id)}
          >
            Delete
          </button>
        </CardContent>
      </div>
    </Card>
  );
};

export default AdminProductTile;
