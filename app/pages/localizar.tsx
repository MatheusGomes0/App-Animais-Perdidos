import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebaseConfig"; // ajuste esse caminho se necessário

type Animal = {
  id: string;
  nome: string;
  endereco: string;
  lat: number;
  lon: number;
};

export default function Localizar() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loadingAnimais, setLoadingAnimais] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  useEffect(() => {
    const carregarAnimais = async () => {
      try {
        const snapshot = await getDocs(collection(db, "animais"));
        const animaisData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as any[];

        const animaisComCoords: Animal[] = [];

        for (const animal of animaisData) {
          if (!animal.endereco) continue;

          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(animal.endereco)}`
          );
          const geoData = await geoRes.json();

          if (geoData && geoData.length > 0) {
            animaisComCoords.push({
              id: animal.id,
              nome: animal.nome || "Animal",
              endereco: animal.endereco,
              lat: parseFloat(geoData[0].lat),
              lon: parseFloat(geoData[0].lon),
            });
          }
        }

        setAnimais(animaisComCoords);
        setLoadingAnimais(false);
      } catch (error) {
        console.error("Erro ao carregar animais:", error);
        setLoadingAnimais(false);
      }
    };

    carregarAnimais();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome5 name="cat" size={26} color="#2b6cb0" style={styles.icon} />
        <Text style={styles.title}>Localizar Animais</Text>
        <FontAwesome5 name="dog" size={26} color="#2b6cb0" style={styles.icon} />
      </View>

      <Text style={styles.infoText}>
        Toque no alfinete no mapa para visualizar os detalhes do animal.
      </Text>

      {!location || loadingAnimais ? (
        <ActivityIndicator size="large" color="#2b6cb0" />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {/* Localização do usuário */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
            pinColor="blue"
          />

          {/* Animais do Firestore */}
          {animais.map(animal => (
            <Marker
              key={animal.id}
              coordinate={{ latitude: animal.lat, longitude: animal.lon }}
              title={animal.nome}
              description={animal.endereco}
              image={require("../img/tach_blue.png")}
              onPress={() => router.push(`/pages/detalhes`)} // adicionar id do animal para ir aos detalhes
            />
          ))}
        </MapView>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}>
        <AntDesign name="arrowleft" size={20} color="#2b6cb0" />
        <Text style={styles.backButtonText}>Voltar à Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#165a72",
    marginHorizontal: 8,
  },
  icon: {
    marginHorizontal: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#2b6cb0",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  map: {
    width: "100%",
    height: 400,
    borderRadius: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#e6f0fa",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#2b6cb0",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
  },
});
