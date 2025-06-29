import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ImageUploader = ({
  imageFile,
  setImageFile,
  uploadedImageURL,
  setUploadedImageURL,
  isEditMode
}) => {


  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    console.log(e.target.files);
    const selectedFile = e.target.files[0];
    if (selectedFile) setImageFile(selectedFile);
    console.log(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0]
    if(droppedFile) setImageFile(droppedFile)
    console.log(droppedFile);
  }

  const handleRemoveImage = (e) => {
    setImageFile(null)
    if(inputRef.current)  inputRef.current.value = ""
  }

  const uploadImageCloudinary = async() => {
    const data = new FormData()
    data.append("my_file",imageFile)
    const response = await axios.post("http://localhost:5001/api/admin/products/upload-image",data)
    if(response) setUploadedImageURL(response.data)
    console.log(response);
  }
console.log(isEditMode);
  // useEffect(() => {
  //   if(imageFile !== null)
  //   {
  //     uploadImageCloudinary()
  //   }
  // },[imageFile])
  
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dotted">
        <Input
          disabled={isEditMode}
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label className="flex flex-col items-center h-25 cursor-pointer mt-5">
            <UploadCloudIcon size={40} />
            <span className={`${isEditMode ? "opacity-25" : "opacity-100"}`}>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="h-8 w-8 mr-2 text-primary" /> 
              <span>{imageFile.name}</span>
              <Button variant="ghost" onClick={handleRemoveImage}>
                <XIcon  />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
