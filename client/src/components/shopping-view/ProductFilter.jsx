import React, { Fragment } from "react";
import CommonForm from "../common/CommonForm";
import { filterOptions } from "@/config";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b ">
        <h2 className="text-lg font-semibold">ProductFilter</h2>
        <div className="p-4 space-y-4">
          {Object.keys(filterOptions).map((keyItem) => (
            <Fragment>
              <div>
                <h3 className="text-base font-semibold">{keyItem}</h3>
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex items-center m-2">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
              <Separator />
              
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
