import { Heading, Input, InputField } from "@gluestack-ui/themed";
import { Text, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';

export default function Dono() {
  return(
<View style={styles.container}>

<Image
        source={require("../img/animal_perdido.png")}
        style={styles.backgroundImage}
      />

    <Heading style={styles.heading}>Cadastro do animal</Heading>

    <Text style={styles.text}>Nome:</Text>

    <Input style={styles.input} variant="outline" size="sm" mb={8} width={'78%'}>
        <InputField placeholder="" />
      </Input>

      <Text style={styles.text}>Espécie:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={'25%'}>
        <InputField placeholder="" />
      </Input>

      <Text style={styles.text}>Raça:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={"33%"}>
        <InputField placeholder="" />
      </Input>

      <Text style={styles.text1}>Endereço do desaparecimento:</Text>

      <Input style={styles.input1} variant="outline" size="md" mb={8} width={"90%"}>
        <InputField placeholder="" />
      </Input>
      
      <Link style={styles.link} href="/home">
      <AntDesign style={styles.icon} name="banckward" size={24} />
        Voltar a Home
      </Link>
</View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
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
    marginTop:150,
  },
  text: {
    marginTop: 60,
    marginLeft: 20,
    color: "blue"
  },
  text1: {
    marginTop: 60,
    marginLeft: 80,
    color: "blue"
  },
  input: {
    marginTop: 60,
    marginLeft: 10,
    backgroundColor: "#cdcccc",
    opacity: 0.7,
  },
  input1: {
    marginTop: 5,
     marginLeft: 10,
    backgroundColor: "#cdcccc",
    opacity: 0.7,
  },
  heading: {
    marginTop: 60,
    marginLeft: 100,
    marginRight: 100,
    color: "#165a72",
  },
  link: {
    marginTop:350,
    marginLeft: 10,
    color:"#04bbfa"
  },
  icon: {
    color:"#554142"
  },
});