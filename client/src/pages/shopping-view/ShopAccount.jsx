import React from "react";
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShopOrders from "@/components/shopping-view/ShopOrders";
import ShopAddress from "@/components/shopping-view/ShopAddress";

const ShopAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={accImg}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-7 py-7">
        <div className="flex flex-col rounded-lg border bg-background p-5 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders"><ShopOrders/></TabsContent>
            <TabsContent value="address"><ShopAddress/></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShopAccount;
