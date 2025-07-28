import { useState, useEffect } from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Disc3 } from "lucide-react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

export default function Animal() {
  const animaisCadastrados = [
    {
      id: "1",
      nome: "Frajola",
      especie: "Gato",
      raca: "Siamês",
      cor: "Branco",
      endereco_desaparecimento: "Rua das Flores, 123",
    },
    {
      id: "2",
      nome: "Rex",
      especie: "Cachorro",
      raca: "Pastor Alemão",
      cor: "Marrom",
      endereco_desaparecimento: "Av. Central, 456",
    },
  ];

  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [cor, setCor] = useState("");
  const [enderecoDesaparecimento, setEnderecoDesaparecimento] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (selectedAnimalId) {
      const animal = animaisCadastrados.find(
        (a) => a.id === selectedAnimalId
      );
      if (animal) {
        setNome(animal.nome);
        setEspecie(animal.especie);
        setRaca(animal.raca);
        setCor(animal.cor);
        setEnderecoDesaparecimento(animal.endereco_desaparecimento);
      }
    } else {
      setNome("");
      setEspecie("");
      setRaca("");
      setCor("");
      setEnderecoDesaparecimento("");
    }
  }, [selectedAnimalId]);

  useEffect(() => {
    if (nome && especie && raca && cor && enderecoDesaparecimento) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [nome, especie, raca, cor, enderecoDesaparecimento]);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/animais", {
        nome,
        especie,
        raca,
        cor,
        endereco_desaparecimento: enderecoDesaparecimento,
        status: false,
      });

      Alert.alert("Sucesso", "Animal editado com sucesso!");
      setNome("");
      setEspecie("");
      setRaca("");
      setCor("");
      setEnderecoDesaparecimento("");
      setSelectedAnimalId(null);
      setIsButtonDisabled(true);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao editar o animal.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <FontAwesome5
            name="cat"
            size={32}
            color="#2b6cb0"
            style={{ marginLeft: 8 }}
          />
          <Heading style={styles.heading}>Editar Animal Perdido</Heading>
          <FontAwesome5
            name="dog"
            size={32}
            color="#2b6cb0"
            style={{ marginLeft: 8 }}
          />
        </View>

        {/* Picker destacado e com altura maior */}
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Selecione um animal para editar:</Text>
          <Picker
            selectedValue={selectedAnimalId}
            onValueChange={(itemValue) => setSelectedAnimalId(itemValue)}
            style={styles.picker}
            itemStyle={{ height: 40 }}
            prompt="Escolha um animal"
          >
            <Picker.Item label="-- Nenhum --" value={null} />
            {animaisCadastrados.map((animal) => (
              <Picker.Item
                key={animal.id}
                label={animal.nome}
                value={animal.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Nome</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField value={nome} onChangeText={setNome} placeholder="Nome do animal" />
        </Input>

        <Text style={styles.label}>Espécie</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField value={especie} onChangeText={setEspecie} placeholder="Gato, Cachorro" />
        </Input>

        <Text style={styles.label}>Raça</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField value={raca} onChangeText={setRaca} placeholder="Raça" />
        </Input>

        <Text style={styles.label}>Cor</Text>
        <Input style={styles.input} variant="outline" size="md" mb={4} width={"90%"}>
          <InputField value={cor} onChangeText={setCor} placeholder="Cor do animal" />
        </Input>

        <Text style={styles.label}>Endereço do desaparecimento</Text>
        <Input
          style={styles.input}
          variant="outline"
          size="md"
          mb={4}
          width={"90%"}
        >
          <InputField
            value={enderecoDesaparecimento}
            onChangeText={setEnderecoDesaparecimento}
            placeholder="Endereço ou ponto de referência"
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
    justifyContent: "flex-start", // mudou para flex-start para evitar centralizar muito
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f5f7fa",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  heading: {
    fontSize: 25,
    color: "#165a72",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    marginLeft: 10,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#cbd5e0",
  },
  pickerContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#cbd5e0",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0, // pra iOS ficar legal o padding
  },
  picker: {
    height: 50,
    width: "100%",
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
