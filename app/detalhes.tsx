import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Detalhes() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <FontAwesome5 name="dog" size={32} color="#2b6cb0" />
          <Text style={styles.title}>Detalhes do Animal</Text>
        </View>

        <Text style={styles.label}><Text style={styles.labelBold}>Nome:</Text> Rex</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Raça:</Text> Labrador</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Endereço:</Text> Rua das Flores, 123</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Desaparecimento:</Text> 24/07/2025</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Contato:</Text> (11) 91234-5678</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Nome do dono:</Text> Matheus</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}>
          <AntDesign name="arrowleft" size={20} color="#2b6cb0" />
          <Text style={styles.backText}>Voltar à Home</Text>
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
