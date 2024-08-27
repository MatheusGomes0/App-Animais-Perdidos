import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { router } from "expo-router";
import {
  Input,
  InputField,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Entypo } from "@expo/vector-icons";

export default function Login() {
  const handleLogin = () => {
    router.push("home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./img/animal_perdido.png")}
        style={styles.backgroundImage}
      />

      <Text size="sm">Tela de login</Text>

      <Input variant="rounded" size="md" mb={8}>
        <InputField placeholder="Digite o seu e-mail!" />
      </Input>

      <Input variant="rounded" size="md" mb={8}>
        <InputField type="password" placeholder="Digite sua senha!" />
      </Input>

      <Button
        style={styles.button}
        onPress={handleLogin}
        size="lg"
        variant="solid"
        action="primary"
      >
        <ButtonText>
          Acessar o app <Entypo name="login" size={24} color="black" />
        </ButtonText>
      </Button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  },
  button: {
    marginTop: 55,
  },
});
