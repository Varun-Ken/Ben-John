import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select,
  SelectTrigger,
  SelectValue,
  SelectItem,SelectContent } from "../ui/select";

const types = {
  INPUT: "input",
  SELECT: "select",
};

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  errorArr ={},
  setErrorArr,
  onSubmit,
  buttonText,
}) => {
  const renderInputs = (controlItem) => {
    let element = null;
    const value = formData[controlItem.name] || "";
    switch (controlItem.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        <Input
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          id={controlItem.name}
          type={controlItem.type}
          value={value}
          onChange={(e) =>
            setFormData({ ...formData, [controlItem.name]: e.target.value })
          }
        />;
        break;
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-2">
            <label className="text-left">{controlItem.label}</label>
            {renderInputs(controlItem)}
            {errorArr.target === controlItem.name && (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorArr.message}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full cursor-pointer">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
