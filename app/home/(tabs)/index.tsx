import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, ButtonIcon } from "@gluestack-ui/themed";
import { PenLine, Dog, MapPin } from "lucide-react-native";
import { useAuth } from "../../../hooks/auth";
import React from "react";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

export default function Home() {
  const auth = useAuth();

  const handleDono = () => router.push("../../pages/dono");
  const handleAnimal = () => router.push("../../pages/animal");
  const handleEditarAnimal = () => router.push("../../pages/editar_animal")
  const handleLocalizacao = () => router.push("../../pages/localizar");
  const handleSituacao = () => router.push("../../pages/situacao");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="cat" size={28} color="#2b6cb0" style={{ marginRight: 6 }} />
        <Text style={styles.headerText}>Home</Text>
        <FontAwesome5 name="dog" size={28} color="#2b6cb0" style={{ marginLeft: 6 }} />
      </View>

      <View style={styles.buttonGroup}>
        <Button
          style={styles.button}
          onPress={handleDono}
          size="lg"
          variant="solid"
          action="primary"
        >
          <ButtonIcon as={PenLine} />
          <Text style={styles.buttonText}>Editar dados do dono</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={handleAnimal}
          size="lg"
          variant="solid"
          action="primary"
        >
          <ButtonIcon as={PenLine} />
          <Text style={styles.buttonText}>Cadastro do animal</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={handleEditarAnimal}
          size="lg"
          variant="solid"
          action="primary"
        >
          <ButtonIcon as={PenLine} />
          <Text style={styles.buttonText}>Editar dados do animal</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={handleSituacao}
          size="lg"
          variant="solid"
          action="primary"
        >
          <ButtonIcon as={Dog} />
          <Text style={styles.buttonText}>Alterar situação</Text>
        </Button>

        <Button
          style={styles.button}
          onPress={handleLocalizacao}
          size="lg"
          variant="solid"
          action="primary"
        >
          <ButtonIcon as={MapPin} />
          <Text style={styles.buttonText}>Localizar animais</Text>
        </Button>
      </View>

      <Link style={styles.link} href="/">
        <AntDesign name="arrowleft" size={20} color="#2b6cb0" />
        <Text style={styles.linkText}>Voltar ao login</Text>
      </Link>

      <StatusBar style="auto" />
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 40,
    color: "#165a72",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    width: "100%",
    backgroundColor: "#2b6cb0",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  link: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    marginLeft: 8,
    color: "#2b6cb0",
    fontSize: 16,
  },
});
