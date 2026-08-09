import { useIsTablet } from "@/hooks/useIsTablet";
import { useCartStore } from "@/store/cartStore";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../AppText";
import Button from "../Button";

interface DetailDescProps {
  id: string;
  image: ImageSourcePropType;
  rating: number;
  calories: number;
  category: string;
  name: string;
  description: string;
  price: number;
}

export default function DetailDescription({
  id,
  image,
  rating,
  calories,
  category,
  name,
  description,
  price,
}: DetailDescProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const isTablet = useIsTablet();
  const addToCart = useCartStore((s) => s.addToCart);
  const scale = useRef(new Animated.Value(1)).current;

  const handleIncreaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQty = () => {
    quantity > 1 && setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    addToCart({ id, name, image, price }, quantity);

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[styles.image, isTablet && { height: 500 }]}
      />

      <View style={styles.statsContainer}>
        {/* Rating */}
        <View style={styles.flexGap}>
          <AntDesign name="star" size={24} color="orange" />
          <AppText weight="medium" size={15} color="#363a33">
            {rating}
          </AppText>
        </View>

        <AppText color="#a6af9f">|</AppText>

        {/* Calories */}
        <View style={styles.flexGap}>
          <MaterialIcons name="local-fire-department" size={24} color="red" />
          <AppText weight="medium" size={15} color="#363a33">
            {calories}kcal
          </AppText>
        </View>

        <AppText color="#a6af9f">|</AppText>

        {/* Category */}
        <View style={styles.flexGap}>
          <Ionicons name="fast-food" size={24} color="#5d9dae" />
          <AppText weight="medium" size={15} color="#363a33">
            {category.toUpperCase()}
          </AppText>
        </View>
      </View>

      {/* Product name */}
      <View style={styles.productNameContainer}>
        <AppText style={styles.name} size={24} weight="bold" color="#363a33">
          {name}
        </AppText>

        {/* Counter */}
        <View style={styles.counter}>
          <TouchableOpacity onPress={handleDecreaseQty} style={styles.button}>
            <AntDesign name="minus" size={20} color="black" />
          </TouchableOpacity>

          <AppText size={20} weight="semibold">
            {quantity}
          </AppText>

          <TouchableOpacity onPress={handleIncreaseQty} style={styles.button}>
            <AntDesign name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product desc */}
      <View style={styles.descriptionContainer}>
        <AppText style={styles.description} color="#61685c" size={16}>
          {description}
        </AppText>
      </View>

      {/* Product price and add to cart */}
      <View style={styles.addToCartContainer}>
        <AppText size={26} weight="bold" color="#363a33">
          ${(price * quantity).toFixed(2)}
        </AppText>

        <Animated.View
          style={[styles.cartButtonWrap, { transform: [{ scale }] }]}
        >
          <Button
            label={added ? "Added ✓" : "Add to cart"}
            onPress={handleAddToCart}
            style={styles.cartButton}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    gap: 4,
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "contain",
  },
  counter: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e6df",
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 30,
  },
  statsContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e2e6df",
    justifyContent: "center",
    padding: 4,
    alignItems: "center",
    gap: 20,
    borderRadius: 10,
  },
  flexGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#F4F7F2",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e6df",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  productNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    marginTop: 20,
  },
  name: {
    flexShrink: 1,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  description: {
    lineHeight: 30,
  },
  addToCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartButtonWrap: {
    width: "65%",
  },
  cartButton: {
    width: "100%",
  },
});
