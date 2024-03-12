import { View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, ButtonIcon } from "@gluestack-ui/themed";
import { PenLine } from "lucide-react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./img/animal_perdido.png")}
        style={styles.backgroundImage}
      />

      <Button
        style={styles.button}
        size="xs"
        variant="solid"
        color="blue"
        action="primary"
      >
        <ButtonIcon as={PenLine} />
      </Button>
      <Text style={styles.texto}>Cadastro do dono</Text>

      <Button
        style={styles.button}
        size="xs"
        variant="solid"
        color="blue"
        action="primary"
      >
        <ButtonIcon as={PenLine} />
      </Button>
      <Text style={styles.texto}>Cadastro do animal</Text>

      <Link href="/">Voltar ao login</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
  },
  backgroundImage: {
    resizeMode: "cover",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "60%",
    opacity: 0.6,
    marginTop: 150,
  },
  button: {
    marginLeft: 30,
  },
  texto: {
    marginLeft: 10,
    size: "xl",
  },
});
