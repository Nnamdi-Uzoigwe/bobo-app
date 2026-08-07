// hooks/useIsTablet.ts
import * as Device from "expo-device";
import { useEffect, useState } from "react";

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    Device.getDeviceTypeAsync().then((type) => {
      setIsTablet(type === Device.DeviceType.TABLET);
    });
  }, []);

  return isTablet;
}

// // hooks/useIsTablet.ts
// import { useWindowDimensions } from "react-native";

// export function useIsTablet() {
//   const { width, height } = useWindowDimensions();
//   const smallestDimension = Math.min(width, height);

//   return smallestDimension >= 600;
// }
