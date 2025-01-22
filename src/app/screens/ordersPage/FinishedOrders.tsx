import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ProcessOrders() {
  return (
    <TabPanel value="3">
      <Stack>
        {[1, 2].map((ele, index) => {
          return (
            <Box key={index} className="order-main-box">
              <Box className="order-box-scroll">
                {[1, 2, 3].map((ele2, index2) => {
                  return (
                    <Box key={index2} className="orders-name-price">
                      <img
                        src="/img/kebab-fresh.webp"
                        className="order-dish-img"
                      />
                      <p className="title-dish">Kebab</p>
                      <Box className="price-box">
                        <p>$12</p>
                        <img src="/icons/close.svg" />
                        <p>x2</p>
                        <img
                          src="/icons/pause.svg"
                          style={{ marginLeft: "15px" }}
                        />
                        <p>$24</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>$22</p>
                  <img
                    src={"/icons/plus.svg"}
                    style={{
                      width: "18px",
                      height: "55px",
                    }}
                  />
                  <p>Delivery cost</p>
                  <p>$2</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{
                      width: "18px",
                      height: "55px",
                    }}
                  />
                  <p>Total</p>
                  <p>$24</p>
                </Box>
                <p className="data-compl">
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  variant="contained"
                  className="completed-payment-button"
                >
                  <CheckCircleIcon className="completed-icon" />
                  Order Completed
                </Button>
              </Box>
            </Box>
          );
        })}
        {false && (
          <Box display="flex" flexDirection="row" justifyContent="center">
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
