import { ImageSourcePropType } from "react-native";

export type FoodCategory =
  | "drinks"
  | "burger"
  | "pizza"
  | "meat wraps"
  | "rice"
  | "soup"
  | "dessert"
  | "snacks";

export interface FoodItem {
  id: string;
  name: string;
  price: number; // in USD
  rating: number; // out of 5
  image: ImageSourcePropType;
  description: string;
  kcal: number;
  category: FoodCategory;
}

export const foodData: FoodItem[] = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    price: 8.99,
    rating: 4.6,
    image: require("@/assets/images/classic-cheeseburger.png"),
    description:
      "Juicy beef patty with melted cheddar, lettuce, tomato and house sauce in a toasted bun.",
    kcal: 540,
    category: "burger",
  },
  {
    id: "2",
    name: "Double Beef Burger",
    price: 11.99,
    rating: 4.8,
    image: require("@/assets/images/double-burger.png"),
    description:
      "Two grilled beef patties stacked with pickles, onions and smoky BBQ sauce.",
    kcal: 780,
    category: "burger",
  },
  {
    id: "3",
    name: "Pepperoni Pizza",
    price: 14.99,
    rating: 4.7,
    image: require("@/assets/images/pepperoni-pizza.png"),
    description:
      "Classic tomato base topped with mozzarella and spicy pepperoni slices.",
    kcal: 890,
    category: "pizza",
  },
  {
    id: "4",
    name: "Beef Shawarma Wrap",
    price: 8.49,
    rating: 4.7,
    image: require("@/assets/images/beef-wrap.png"),
    description:
      "Spiced shredded beef with pickles, onions and tahini sauce in a warm wrap.",
    kcal: 620,
    category: "meat wraps",
  },
  {
    id: "5",
    name: "Chicken Burger",
    price: 7.49,
    rating: 4.4,
    image: require("@/assets/images/chicken-burger.png"),
    description:
      "Crispy fried chicken breast with mayo, lettuce and a soft brioche bun.",
    kcal: 490,
    category: "burger",
  },
  {
    id: "6",
    name: "Margherita Pizza",
    price: 12.99,
    rating: 4.5,
    image: require("@/assets/images/mag-pizza.png"),
    description:
      "Simple and classic, with fresh basil, mozzarella and San Marzano tomato sauce.",
    kcal: 720,
    category: "pizza",
  },
  {
    id: "7",
    name: "BBQ Chicken Pizza",
    price: 15.99,
    rating: 4.6,
    image: require("@/assets/images/bbq-pizza.png"),
    description:
      "Grilled chicken chunks, red onions and smoky BBQ sauce on a crispy crust.",
    kcal: 860,
    category: "pizza",
  },
  {
    id: "8",
    name: "Grilled Chicken Wrap",
    price: 7.99,
    rating: 4.5,
    image: require("@/assets/images/grilled-wrap.png"),
    description:
      "Grilled chicken strips, lettuce and garlic sauce rolled in a soft tortilla.",
    kcal: 460,
    category: "meat wraps",
  },

  // {
  //   id: "9",
  //   name: "Spicy Lamb Wrap",
  //   price: 9.49,
  //   rating: 4.3,
  //   image: "https://picsum.photos/seed/lambwrap/400/300",
  //   description:
  //     "Marinated lamb strips with chili sauce, onions and fresh herbs.",
  //   kcal: 680,
  //   category: "meat wraps",
  // },
  // {
  //   id: "10",
  //   name: "Jollof Rice with Chicken",
  //   price: 6.99,
  //   rating: 4.9,
  //   image: "https://picsum.photos/seed/jollofrice/400/300",
  //   description:
  //     "Smoky party-style jollof rice served with a grilled chicken thigh.",
  //   kcal: 610,
  //   category: "rice",
  // },
  // {
  //   id: "11",
  //   name: "Fried Rice with Beef",
  //   price: 7.49,
  //   rating: 4.6,
  //   image: "https://picsum.photos/seed/friedrice/400/300",
  //   description:
  //     "Colorful vegetable fried rice served with tender strips of beef.",
  //   kcal: 590,
  //   category: "rice",
  // },
  // {
  //   id: "12",
  //   name: "Coconut Rice with Fish",
  //   price: 8.99,
  //   rating: 4.4,
  //   image: "https://picsum.photos/seed/coconutrice/400/300",
  //   description:
  //     "Fragrant coconut-infused rice paired with lightly seasoned fried fish.",
  //   kcal: 570,
  //   category: "rice",
  // },
  // {
  //   id: "13",
  //   name: "Egusi Soup with Pounded Yam",
  //   price: 9.99,
  //   rating: 4.8,
  //   image: "https://picsum.photos/seed/egusisoup/400/300",
  //   description:
  //     "Rich melon seed soup with assorted meat, served with smooth pounded yam.",
  //   kcal: 750,
  //   category: "soup",
  // },
  // {
  //   id: "14",
  //   name: "Pepper Soup (Goat Meat)",
  //   price: 8.29,
  //   rating: 4.5,
  //   image: "https://picsum.photos/seed/peppersoup/400/300",
  //   description:
  //     "A hot and spicy broth loaded with tender goat meat and native spices.",
  //   kcal: 420,
  //   category: "soup",
  // },
  // {
  //   id: "15",
  //   name: "Chicken Noodle Soup",
  //   price: 6.49,
  //   rating: 4.2,
  //   image: "https://picsum.photos/seed/noodlesoup/400/300",
  //   description:
  //     "A comforting bowl of noodles, shredded chicken and vegetables in broth.",
  //   kcal: 380,
  //   category: "soup",
  // },
  // {
  //   id: "16",
  //   name: "Fresh Orange Juice",
  //   price: 3.49,
  //   rating: 4.6,
  //   image: "https://picsum.photos/seed/orangejuice/400/300",
  //   description: "Freshly squeezed oranges, no added sugar, served chilled.",
  //   kcal: 110,
  //   category: "drinks",
  // },
  // {
  //   id: "17",
  //   name: "Chapman",
  //   price: 3.99,
  //   rating: 4.7,
  //   image: "https://picsum.photos/seed/chapman/400/300",
  //   description:
  //     "A refreshing mix of soda, grenadine, bitters and fresh fruit slices.",
  //   kcal: 150,
  //   category: "drinks",
  // },
  // {
  //   id: "18",
  //   name: "Iced Caramel Latte",
  //   price: 4.99,
  //   rating: 4.5,
  //   image: "https://picsum.photos/seed/icedlatte/400/300",
  //   description: "Chilled espresso with milk and caramel syrup over ice.",
  //   kcal: 190,
  //   category: "drinks",
  // },
  // {
  //   id: "19",
  //   name: "Zobo Drink",
  //   price: 2.99,
  //   rating: 4.4,
  //   image: "https://picsum.photos/seed/zobo/400/300",
  //   description:
  //     "Hibiscus leaf drink infused with ginger, pineapple and cloves.",
  //   kcal: 90,
  //   category: "drinks",
  // },
  // {
  //   id: "20",
  //   name: "Smoothie Bowl",
  //   price: 5.99,
  //   rating: 4.3,
  //   image: "https://picsum.photos/seed/smoothiebowl/400/300",
  //   description: "Blended mixed berries topped with granola, banana and honey.",
  //   kcal: 320,
  //   category: "dessert",
  // },
  // {
  //   id: "21",
  //   name: "Chocolate Lava Cake",
  //   price: 6.49,
  //   rating: 4.9,
  //   image: "https://picsum.photos/seed/lavacake/400/300",
  //   description:
  //     "Warm chocolate cake with a rich molten center, served with ice cream.",
  //   kcal: 450,
  //   category: "dessert",
  // },
  // {
  //   id: "22",
  //   name: "Vanilla Cheesecake",
  //   price: 5.99,
  //   rating: 4.6,
  //   image: "https://picsum.photos/seed/cheesecake/400/300",
  //   description: "Creamy baked cheesecake on a buttery biscuit base.",
  //   kcal: 410,
  //   category: "dessert",
  // },
  // {
  //   id: "23",
  //   name: "Puff Puff (6 pcs)",
  //   price: 2.49,
  //   rating: 4.5,
  //   image: "https://picsum.photos/seed/puffpuff/400/300",
  //   description:
  //     "Soft, sweet and fluffy fried dough balls, a classic Nigerian snack.",
  //   kcal: 280,
  //   category: "snacks",
  // },
  // {
  //   id: "24",
  //   name: "Meat Pie",
  //   price: 2.29,
  //   rating: 4.6,
  //   image: "https://picsum.photos/seed/meatpie/400/300",
  //   description:
  //     "Flaky pastry filled with seasoned minced meat, potatoes and carrots.",
  //   kcal: 310,
  //   category: "snacks",
  // },
  // {
  //   id: "25",
  //   name: "Chicken Suya Skewers",
  //   price: 5.49,
  //   rating: 4.8,
  //   image: "https://picsum.photos/seed/suya/400/300",
  //   description:
  //     "Grilled chicken skewers coated in a spicy peanut suya spice blend.",
  //   kcal: 340,
  //   category: "snacks",
  // },
  // {
  //   id: "26",
  //   name: "Loaded French Fries",
  //   price: 4.49,
  //   rating: 4.4,
  //   image: "https://picsum.photos/seed/loadedfries/400/300",
  //   description:
  //     "Crispy fries topped with melted cheese, bacon bits and spring onions.",
  //   kcal: 520,
  //   category: "snacks",
  // },
  // {
  //   id: "27",
  //   name: "Turkey Pepper Fried Rice",
  //   price: 9.49,
  //   rating: 4.7,
  //   image: "https://picsum.photos/seed/turkeyrice/400/300",
  //   description:
  //     "Spicy fried rice served with grilled turkey drumstick and peppers.",
  //   kcal: 640,
  //   category: "rice",
  // },
  // {
  //   id: "28",
  //   name: "Veggie Wrap",
  //   price: 6.49,
  //   rating: 4.1,
  //   image: "https://picsum.photos/seed/veggiewrap/400/300",
  //   description:
  //     "Grilled vegetables, hummus and greens wrapped in a whole wheat tortilla.",
  //   kcal: 340,
  //   category: "meat wraps",
  // },
];
