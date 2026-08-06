import { FoodCategory } from "@/data/foodData";
import { ImageSourcePropType } from "react-native";

export type CategoryMeta = {
  id: FoodCategory;
  label: string;
  image: ImageSourcePropType;
};

export const categories: CategoryMeta[] = [
  {
    id: "burger",
    label: "Burgers",
    image: require("@/assets/images/chicken-burger.png"),
  },
  {
    id: "pizza",
    label: "Pizza",
    image: require("@/assets/images/mag-pizza.png"),
  },
  {
    id: "meat wraps",
    label: "Wraps",
    image: require("@/assets/images/beef-wrap.png"),
  },
  {
    id: "rice",
    label: "Rice",
    image: require("@/assets/images/grilled-wrap.png"),
  },
  {
    id: "soup",
    label: "Soup",
    image: require("@/assets/images/pepperoni-pizza.png"),
  },
  {
    id: "dessert",
    label: "Dessert",
    image: require("@/assets/images/classic-cheeseburger.png"),
  },
  {
    id: "drinks",
    label: "Drinks",
    image: require("@/assets/images/double-burger.png"),
  },
  {
    id: "snacks",
    label: "Snacks",
    image: require("@/assets/images/bbq-pizza.png"),
  },
];
