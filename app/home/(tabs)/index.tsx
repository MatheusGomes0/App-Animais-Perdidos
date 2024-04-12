import { View, Text, StyleSheet, Image } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, ButtonIcon } from "@gluestack-ui/themed";
import { PenLine, Dog, MapPin } from "lucide-react-native";

export default function Home() {

  const handleDono = () => {
    router.push("../../pages/dono")
  }
  const handleAnimal = () => {
    router.push("../../pages/animal")
  }

  return (
    <View style={styles.container}>
     <Image
        source={require("../../img/animal_perdido.png")}
        style={styles.backgroundImage}
      />
    <Button
        style={styles.button}
        onPress={handleDono}
        size="xl"
        variant="solid"
        color="blue"
        action="primary"r
      >
        <ButtonIcon as={PenLine} />
      </Button>
    
      <Text style={styles.texto}>Cadastro do dono</Text>
    
      <Button
        style={styles.button}
        onPress={handleAnimal}
        size="xl"
        variant="solid"
        color="blue"
        action="primary"r
      >
        <ButtonIcon as={PenLine} />
      </Button>
      <Text style={styles.texto}>Cadastro do animal</Text>

      <Button
        style={styles.button}
        size="md"
        variant="solid"
        color="blue"
        action="primary"
      >
        <ButtonIcon as={Dog} />
      </Button>
      <Text style={styles.texto}>Consulta situação</Text>

      <Button
        style={styles.button}
        size="md"
        variant="solid"
        color="blue"
        action="primary"
      >
        <ButtonIcon as={MapPin} />
      </Button>
      <Text style={styles.texto}>Animal localizado</Text>


      <Link style={styles.link1} href="/">Voltar ao login</Link>
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
    alignContent: "stretch",
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
    marginTop: 110,
    marginLeft: 20,
  },
  texto: {
    marginTop: 110,
    marginLeft: 20,
    fontSize: 30,
    color: "#714422",
  },
  link: {
    marginTop:150,
    marginLeft: 20,
   },
   link1: {
    marginTop: 100,
    color: "#2596be",
   },
});
