import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import { router } from "expo-router";
import {
  Input,
  InputField,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../app/database/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/home");
    } catch (error: any) {
      console.error("Erro no login:", error);
      Alert.alert("Erro ao fazer login", error.message || "Verifique suas credenciais.");
    }
  };

  const handleCadastro = () => {
    router.push("/pages/cadastro");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome5 name="cat" size={32} color="#2b6cb0" style={{ marginRight: 8 }} />
        <Text style={styles.logoText}>Where's my PET?</Text>
        <FontAwesome5 name="dog" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
      </View>

      <Text style={styles.heading}>Entrar no app</Text>

      <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
        <InputField
          placeholder="Digite o seu e-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </Input>

      <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
        <InputField
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </Input>

      <Button
        style={styles.button}
        onPress={handleLogin}
        size="lg"
        variant="solid"
        action="primary"
      >
        <ButtonText>
          Acessar o app <Entypo name="login" size={18} color="#fff" />
        </ButtonText>
      </Button>

      <Button
        style={styles.buttonSecondary}
        onPress={handleCadastro}
        size="lg"
        variant="outline"
        action="secondary"
      >
        <ButtonText style={{ color: "#2b6cb0" }}>Cadastrar-se</ButtonText>
      </Button>

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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  logoText: {
    fontSize: 40,
    color: "#165a72",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#cbd5e0",
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#2b6cb0",
    borderRadius: 8,
  },
  buttonSecondary: {
    marginTop: 10,
    width: "90%",
    borderColor: "#2b6cb0",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});
