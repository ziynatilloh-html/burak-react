import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css";
import { Dispatch } from "@reduxjs/toolkit";
import { Order } from "../../../lib/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
// Redux Slice & Selector
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});
export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());

  /**Handlers**/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={"/icons/default-user.svg"}
                  className={"order-user-avatar"}
                />
              </div>
              <div className={"order-user-icon-box"}>
                <img
                  src={"/icons/user-badge.svg"}
                  className={"order-user-prof-img"}
                />
              </div>
              <span className={"order-user-name"}>Justin</span>
              <span className={"order-user-prof"}>User</span>
              <Box className={"liner"}></Box>
              <Box className="order-user-address">
                <LocationOnIcon className="location-icon" />
                <span>South Korea, Busan</span>
              </Box>
            </Box>
          </Box>

          <Box className={"order-payment-box"}>
            <Box className={"payment-details"}>
              <div className={"payment-input-group"}>
                <label htmlFor="card-number" className={"payment-label"}>
                  Card number:
                </label>
                <input
                  type="text"
                  id="card-number"
                  placeholder="5243 4090 2002 7495"
                  className={"payment-input"}
                />
              </div>

              <div className={"payment-input-row"}>
                <div className={"payment-input-group"}>
                  <label htmlFor="expiry-date" className={"payment-label"}>
                    Expiry date:
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    placeholder="07/24"
                    className={"payment-input"}
                  />
                </div>
                <div className={"payment-input-group"}>
                  <label htmlFor="cvv" className={"payment-label"}>
                    CVV:
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="010"
                    className={"payment-input"}
                  />
                </div>
              </div>

              <div className={"payment-input-group"}>
                <label htmlFor="cardholder-name" className={"payment-label"}>
                  Cardholder name:
                </label>
                <input
                  type="text"
                  id="cardholder-name"
                  placeholder="Justin Robertson"
                  className={"payment-input"}
                />
              </div>
            </Box>

            <Box className={"payment-icons"}>
              <img src={"/icons/master-card.svg"} alt="MasterCard" />
              <img src={"/icons/paypal-card.svg"} alt="PayPal" />
              <img src={"/icons/visa-card.svg"} alt="Visa" />{" "}
              <img src={"/icons/western-card.svg"} alt="western" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
