import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveProcessOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useSelector } from "react-redux";
// Redux Slice & Selecto

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);
export default function ProcessOrders() {
  const { processOrders } = useSelector(processOrdersRetriever);

  return (
    <TabPanel value="2">
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img src={imagePath} className="order-dish-img" />
                      <p className="title-dish">{product.productName}</p>
                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" />
                        <p>{item.itemQuantity}</p>
                        <img
                          src="/icons/pause.svg"
                          style={{ marginLeft: "15px" }}
                        />
                        <p>${item.itemQuantity * item.itemPrice}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img
                    src={"/icons/plus.svg"}
                    style={{
                      width: "18px",
                      height: "55px",
                    }}
                  />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{
                      width: "18px",
                      height: "55px",
                    }}
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <p className="data-compl">
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button variant="contained" className="process-payment-button">
                  Verify for process
                </Button>
              </Box>
            </Box>
          );
        })}
        {!processOrders ||
          (processOrders.length === 0 && (
            <Box display="flex" flexDirection="row" justifyContent="center">
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
// function useSelector(
//   processOrdersRetriever: ((
//     state: import("../../../lib/types/screen").AppRootState
//   ) => { processOrders: import("../../../lib/types/order").Order[] }) &
//     import("reselect").OutputSelectorFields<
//       (args_0: import("../../../lib/types/order").Order[]) => {
//         processOrders: import("../../../lib/types/order").Order[];
//       },
//       { clearCache: () => void }
//     > & { clearCache: () => void }
// ): { processOrders: any } {
//   throw new Error("Function not implemented.");
// }
