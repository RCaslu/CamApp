import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {

  const sendLaravel = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/users',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    const data = await response.json();
    console.log(data);
    
  }
  return (
    <View>
      <TouchableOpacity onPress={() => sendLaravel()}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );

}