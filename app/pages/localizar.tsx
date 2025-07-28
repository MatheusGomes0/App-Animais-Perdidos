import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Localizar() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

      {!location ? (
        <ActivityIndicator size="large" color="#2b6cb0" />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: -23.085753916419584,
              longitude: -47.20261698956988,
            }}
            image={require("../img/tach_blue.png")}
            onPress={() => router.push("/pages/detalhes")}
          />
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
