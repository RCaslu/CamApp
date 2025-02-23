import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Animated } from "react-native";
import React, { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Rafael Henry");
  const [email, setEmail] = useState("rafaelhenrycassiano23@gmail.com");
  const [phone, setPhone] = useState("+55 (11) 99999-9999");
  const [address, setAddress] = useState("São Paulo, Brasil");
  const [bio, setBio] = useState("Desenvolvedor Full Stack apaixonado por tecnologia e inovação.");

  const fadeAnim = new Animated.Value(1);

  const handleEdit = () => {
    Animated.timing(fadeAnim, {
      toValue: isEditing ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsEditing(!isEditing));
  };

  return (
    <View style={styles.container}>

      <Image
        source={{ uri: "https://lh3.googleusercontent.com/a/ACg8ocK_S07j8nRSGx-7ghpWzsXS6pb78HbumdHTPztnbvCL3aFQWw=s96-c" }}
        style={styles.image}
      />


      {isEditing ? (
        <>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome" />
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" />
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Telefone" />
          <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Endereço" />
          <TextInput style={styles.input} value={bio} onChangeText={setBio} placeholder="Biografia" multiline />
        </>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.subtext}>{email}</Text>
          <Text style={styles.subtext}>{phone}</Text>
          <Text style={styles.subtext}>{address}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </Animated.View>
      )}


      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>{isEditing ? "Salvar" : "Editar Perfil"}</Text>
      </TouchableOpacity>
      
      {!isEditing && (
        <TouchableOpacity style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Sair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#007BFF",
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    margin: 5,
    color: "#333",
  },
  subtext: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    color: "#444",
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonOutline: {
    borderColor: "#007BFF",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
