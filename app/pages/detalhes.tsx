import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

export default function Detalhes() {
  const router = useRouter();
  const { animalId } = useLocalSearchParams();

  const [animal, setAnimal] = useState<any>(null);
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimalEDono = async () => {
      try {
        const animalRef = doc(db, "animais", String(animalId));
        const animalSnap = await getDoc(animalRef);

        if (animalSnap.exists()) {
          const animalData = animalSnap.data();
          setAnimal(animalData);

          // Buscar usuário com base no campo usuarioId
          if (animalData.usuarioId) {
            const usuarioRef = doc(db, "usuarios", animalData.usuarioId);
            const usuarioSnap = await getDoc(usuarioRef);

            if (usuarioSnap.exists()) {
              setUsuario(usuarioSnap.data());
            }
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchAnimalEDono();
  }, [animalId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2b6cb0" />
      </View>
    );
  }

  if (!animal) {
    return (
      <View style={styles.container}>
        <Text>Animal não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <FontAwesome5 name="dog" size={32} color="#2b6cb0" />
          <Text style={styles.title}>Detalhes do Animal</Text>
        </View>

        <Text style={styles.label}><Text style={styles.labelBold}>Nome:</Text> {animal.nome}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Raça:</Text> {animal.raca}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Endereço:</Text> {animal.endereco}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Espécie:</Text> {animal.especie}</Text>

        {usuario && (
          <>
            <Text style={styles.label}><Text style={styles.labelBold}>Nome do dono:</Text> {usuario.nome}</Text>
            <Text style={styles.label}><Text style={styles.labelBold}>Contato:</Text> {usuario.telefone}</Text>
          </>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={20} color="#2b6cb0" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#165a72",
    marginLeft: 12,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#2b6cb0",
    textAlign: "center",
  },
  labelBold: {
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  backText: {
    marginLeft: 8,
    color: "#2b6cb0",
    fontSize: 16,
  },
});