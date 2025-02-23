import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { getImages, createImage, updateImage, deleteImage } from "@/src/api/imageApi";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';

interface Imageprops {
  id: number;
  url: string;
}

export default function Page() {
  const [images, setImages] = useState<Imageprops[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    // This will run every time images state changes
    fetchImages();
  }, [images]);

  const fetchImages = async () => {
    try {
      const data = await getImages();
      setImages(data);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
    }
  };

  const handleAddOrUpdateImage = async () => {
    if (imageUrl) {
      try {
        if (selectedImageId) {
          await updateImage(selectedImageId, imageUrl);
        } else {
          await createImage(imageUrl);
        }
        setImageUrl("");
        setModalVisible(false);
        setSelectedImageId(null);
        fetchImages();
      } catch (error) {
        console.error("Erro ao adicionar/atualizar imagem:", error);
      }
    }
  };

  const handleDeleteImage = async (id: number) => {
    try {
      await deleteImage(id);
      fetchImages();
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.uri);
    }
  };

  const openImageModal = (url: string) => {
    setSelectedImageUrl(url);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImageUrl(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeria de Imagens</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false} // Ocultar a barra de rolagem vertical
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImageModal(item.url)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.url }} style={styles.image} />
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => { setSelectedImageId(item.id); setModalVisible(true); }}>
                  <Ionicons name="create-outline" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteImage(item.id)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.modalView}>
            {selectedImageUrl ? (
              <Image source={{ uri: selectedImageUrl }} style={styles.fullImage} />
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Insira a URL da imagem"
                  value={imageUrl}
                  onChangeText={setImageUrl}
                />
                <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                  <Text style={styles.modalButtonText}>Escolher da Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleAddOrUpdateImage}>
                  <Text style={styles.modalButtonText}>{selectedImageId ? "Atualizar" : "Adicionar"}</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  image: {
    width: 195,
    height: 150,
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  modalButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  fullImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});