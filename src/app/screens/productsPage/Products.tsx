import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import {
  ProductCollection,
  ProductOrder,
} from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useHistory } from "react-router-dom";
import { StringifyOptions } from "querystring";
import { CartItem } from "../../../lib/types/search";

//TODO  e.stopPropagation to check this out;
/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data);
        console.log("useEffect called", productSearch);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, []);
  /*Handlers*/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };
  const searchOrderHandler = (order: ProductOrder) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };
  const searchProductHandler = () => {
    setProductSearch({
      ...productSearch,
      search: searchText,
      page: 1,
    });
  };
  const handleClear = () => {
    setSearchText("");
    setProductSearch({ ...productSearch, search: "" });
  };
  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const choseDishHandler = (id: string) => {
    // id is now used
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Box className="category-title">Burak Restruant</Box>
            <Box className="search-container">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Type here"
                  className="search-input"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchProductHandler();
                    }
                  }}
                />
                <Button
                  className="clear-icon"
                  onClick={handleClear}
                  sx={{ ml: -4 }}
                >
                  <BackspaceIcon /> {/* Use DeleteForeverIcon */}
                </Button>
                <Button
                  className="search-icon"
                  endIcon={<SearchIcon />}
                  variant="contained"
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </div>
            </Box>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button
                variant="contained"
                color={
                  productSearch.order === ProductOrder.NEW
                    ? "primary"
                    : "secondary"
                }
                className="order"
                onClick={() => searchOrderHandler(ProductOrder.NEW)}
              >
                New
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.order === ProductOrder.PRICE
                    ? "primary"
                    : "secondary"
                }
                className="order"
                onClick={() => searchOrderHandler(ProductOrder.PRICE)}
              >
                Price
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.order === ProductOrder.VIEWS
                    ? "primary"
                    : "secondary"
                }
                className="order"
                onClick={() => searchOrderHandler(ProductOrder.VIEWS)}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Dessert
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Dish
                </Button>
              </div>
            </Stack>
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "litr"
                      : product.productSize + "size";
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => choseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOnIcon className="price-icon" />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Box className="brands-title">Our Family Brands</Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="brands-container"
          spacing={4}
        >
          <Box className="brand-item"></Box>
          <Box className="brand-item"></Box>
          <Box className="brand-item"></Box>
          <Box className="brand-item"></Box>
        </Stack>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3325.331824071805!2d69.24149577142389!3d41.32514777356473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2skr!4v1737116037868!5m2!1sen!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
