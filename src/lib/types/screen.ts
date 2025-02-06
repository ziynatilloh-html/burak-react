import { Member } from "./member";
import { Product } from "./product";

/!*React-App State*!/;

export interface AppRootState {
  homepage: HomePageState;
}
/!*HomePage*!/;
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/!*ProductPage*!/;
/!*OrderPage*!/;
