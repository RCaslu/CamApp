import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import { createImage } from "@/src/api/imageApi";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export default function AddImage() {
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = async () => {
    if (imageUrl) {
      try {
        await createImage(imageUrl);
        setImageUrl("");
        Alert.alert("Imagem adicionada com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar imagem:", error);
        Alert.alert("Erro ao adicionar imagem");
      }
    }
  };

  const handleUploadImage = async (uri) => {
    const uploadedImageUrl = await uploadImage(uri);
    if (uploadedImageUrl) {
      try {
        await createImage(uploadedImageUrl);
        setImageUrl("");
        Alert.alert("Imagem adicionada com sucesso!");
      } catch (error) {
        console.error("Erro ao adicionar imagem:", error);
        Alert.alert("Erro ao adicionar imagem");
      }
    } else {
      Alert.alert("Erro ao salvar a imagem localmente");
    }
  };

  const uploadImage = async (uri) => {
    if (!uri) {
      console.error('URI indefinida');
      return null;
    }
  
    console.log('URI recebida:', uri);
  
    try {
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: uri.split('/').pop(),
        type: 'image/jpeg',
      });

      const response = await axios.post("http://localhost:8000/api/images/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Resposta da API:', response.data);
      return response.data.url;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      return null;
    }
  };
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log('Resultado da seleção de imagem:', result);
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const localUri = result.assets[0].uri;
      const uploadedImageUrl = await uploadImage(localUri);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
      }
    }
  };
  
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log('Resultado da captura de foto:', result);
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const localUri = result.assets[0].uri;
      const uploadedImageUrl = await uploadImage(localUri);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Imagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira a URL da imagem"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
      ) : null}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Escolher da Galeria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleUploadImage(imageUrl)}>
        <Text style={styles.buttonText}>Adicionar Imagem Local</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddImage}>
        <Text style={styles.buttonText}>Adicionar URL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});