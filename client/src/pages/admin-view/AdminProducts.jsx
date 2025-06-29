import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { Fragment, useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { useDispatch } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice";
import AdminProductTile from "./AdminProductTile";
import { toast } from "sonner";

const AdminProducts = () => {
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

  const errorState = {
    target: "",
    message: "",
  };

  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [uploadedImageURL,setUploadedImageURL] = useState("")
  const [listOfProducts, setListOfProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [currentEditID, setCurrentEditID] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [errorArr, setErrorArr] = useState(errorState);
  

  const dispatch = useDispatch();
  console.log(currentEditID, formData);

  const loadProductsPage = () => {
    dispatch(fetchAllProducts()).then((data) => {
      if (data?.payload?.success)
        setListOfProducts(data?.payload?.listOfProducts);
    });
  };

  const addProductSubmit = (e) => {
    e.preventDefault();
    if (currentEditID !== null) {
      dispatch(editProduct({ id: currentEditID, formData })).then((data) => {
        if (data?.payload?.success) {
          console.log(data);
          toast(`✅ Product is updated successfully`);
          setOpenCreateProduct(false);
          loadProductsPage()
        } else {
          toast(`❌ Failed to update product`);
          console.log(data);
        }
      });
    } else {
      dispatch(addNewProduct(formData)).then((data) => {
        if (data?.payload?.success) {
          console.log(data);
          toast(`✅ New Product is added successfully`);
          setOpenCreateProduct(false);
        } else {
          toast(`❌ Failed to add a new product`);
          console.log(data);
        }
      });
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)).then((data) => {
      console.log(data);
      dispatch(fetchAllProducts());
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts()).then((data) => {
      if (data?.payload?.success) {
        console.log(data);
        setListOfProducts(data?.payload?.listOfProducts);
      } else {
        console.log(data);
      }
    });
  }, [dispatch]);

  return (
    <Fragment>
      <div className="w-full flex">
        <div className=" grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {listOfProducts.map((product) => (
            <AdminProductTile
              key={product._id}
              product={product}
              setCurrentEditID={setCurrentEditID}
              handleDeleteProduct={handleDeleteProduct}
              openCreateProduct={openCreateProduct}
              setOpenCreateProduct={setOpenCreateProduct}
              setFormData={setFormData}
            />
          ))}
        </div>
        <div className="flex-1/5 w-1/5 flex flex-col items-end">
          <Button
            onClick={() => {
              setOpenCreateProduct(!openCreateProduct),
                setFormData({}),
                setCurrentEditID(null);
            }}
          >
            Add New Product
          </Button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet open={openCreateProduct} onOpenChange={setOpenCreateProduct}>
        <SheetContent side="right" className="overflow-auto p-5">
          <SheetHeader>
            <SheetTitle onClick={() => setOpenCreateProduct(false)}>
              Add New Product
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <ImageUploader
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setUploadedImageURL={setUploadedImageURL}
            isEditMode={currentEditID !== null}
          />
          <CommonForm
            formControls={addProductFormElements}
            formData={formData}
            setFormData={setFormData}
            errorArr={errorArr}
            setErrorArr={setErrorArr}
            onSubmit={(e) => addProductSubmit(e)}
            buttonText={
              currentEditID !== null ? "Update Product" : "Add Product"
            }
          />
        </SheetContent>
      </Sheet>
      {/*console.log(formData)*/}
    </Fragment>
  );
};

export default AdminProducts;
