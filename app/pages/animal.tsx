import { useState, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Disc3 } from "lucide-react-native";
import { Link } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { getAuth } from "firebase/auth"; // Importa auth

export default function Animal() {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [cor, setCor] = useState("");
  const [enderecoDesaparecimento, setEnderecoDesaparecimento] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!(nome && especie && raca && cor && enderecoDesaparecimento));
  }, [nome, especie, raca, cor, enderecoDesaparecimento]);

  const handleSubmit = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      // Cadastra o animal com o ID do usuário logado
      await addDoc(collection(db, "animais"), {
        nome,
        especie,
        raca,
        cor,
        endereco: enderecoDesaparecimento,
        status: false,
        criado_em: new Date(),
        usuarioId: user.uid, // Associa corretamente ao usuário autenticado
      });

      Alert.alert("Sucesso", "Animal cadastrado com sucesso!");

      // Limpa os campos após salvar
      setNome("");
      setEspecie("");
      setRaca("");
      setCor("");
      setEnderecoDesaparecimento("");
      setIsButtonDisabled(true);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o animal.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <FontAwesome5 name="cat" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
          <Heading style={styles.heading}>Cadastrar Animal Perdido</Heading>
          <FontAwesome5 name="dog" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
        </View>

        <Text style={styles.label}>Nome</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField value={nome} onChangeText={setNome} placeholder="Digite o nome do animal" />
        </Input>

        <Text style={styles.label}>Espécie</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField value={especie} onChangeText={setEspecie} placeholder="Ex: Gato, Cachorro" />
        </Input>

        <Text style={styles.label}>Raça</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField value={raca} onChangeText={setRaca} placeholder="Digite a raça" />
        </Input>

        <Text style={styles.label}>Cor</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField value={cor} onChangeText={setCor} placeholder="Digite a cor do animal" />
        </Input>

        <Text style={styles.label}>Endereço do desaparecimento</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField
            value={enderecoDesaparecimento}
            onChangeText={setEnderecoDesaparecimento}
            placeholder="Digite o endereço ou ponto de referência"
          />
        </Input>

        <Button
          style={styles.button}
          size="lg"
          variant="solid"
          action="primary"
          onPress={handleSubmit}
          isDisabled={isButtonDisabled}
        >
          <ButtonText>Cadastrar</ButtonText>
          <ButtonIcon as={Disc3} />
        </Button>

        <Link style={styles.link} href="/home">
          <AntDesign name="arrowleft" size={20} color="#3182ce" /> Voltar para Home
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f5f7fa",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  heading: {
    fontSize: 25,
    color: "#165a72",
    marginBottom: 15,
    textAlign: "center",
    marginTop: 30,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
    marginLeft: 10,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#cbd5e0",
  },
  button: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#2b6cb0",
    borderRadius: 8,
  },
  link: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    color: "#2b6cb0",
  },
});
