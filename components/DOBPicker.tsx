import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, Platform, View } from "react-native";

export default function DOBPicker() {
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [show, setShow] = useState(false);

  return (
    <View>
      <Button title="Pick Date of Birth" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          textColor="#363a33"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShow(Platform.OS === "ios"); // keep open on iOS until dismissed
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}
