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
