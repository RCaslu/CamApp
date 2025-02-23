import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

export default function Explore() {
  const categories = ["Natureza", "Cidades", "Praias", "Montanhas"];
  const recommendations = [
    { id: 1, title: "Chapada dos Veadeiros", image: "https://levesemdestino.com/wp-content/uploads/2016/01/dicas-gerais-dicas-de-viagem-chapada-dos-veadeiros-goias-cachoeiras-cachoeira-santa-barbara-2-1.jpg" },
    { id: 2, title: "Rio de Janeiro", image: "https://blog.paineirascorcovado.com.br/wp-content/uploads/2024/11/Cristo-Redentor-Por-do-sol-scaled.jpg" },
    { id: 3, title: "Fernando de Noronha", image: "https://media.staticontent.com/media/pictures/470c512a-47e8-49b5-aaed-1c56997e60a6" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore</Text>

      <Image 
        source={{ uri: "https://media.istockphoto.com/id/1360554439/pt/foto/maldives-tropical-island.jpg?s=612x612&w=0&k=20&c=yNSEbRPTFrURes5CAX1fmmB5HdiV-GdnJquDsfdU1cA=" }} 
        style={styles.image} 
      />
      <Text style={styles.description}>
        Descubra novos lugares e experiências incríveis ao seu redor.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      <Text style={styles.sectionTitle}>Recomendações</Text>
      {recommendations.map((place) => (
        <View key={place.id} style={styles.card}>
          <Image source={{ uri: place.image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{place.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  categoryButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {
    color: "white",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});
