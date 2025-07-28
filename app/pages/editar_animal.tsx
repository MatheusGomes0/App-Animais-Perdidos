import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
} from "@gluestack-ui/themed";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Disc3 } from "lucide-react-native";
import { Link } from "expo-router";
import { db } from "../database/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export default function Animal() {
  const [animais, setAnimais] = useState<any[]>([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [cor, setCor] = useState("");
  const [endereco, setEndereco] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const snapshot = await getDocs(collection(db, "animais"));
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnimais(lista);
      } catch (err) {
        Alert.alert("Erro", "Erro ao buscar animais");
      }
    };

    fetchAnimais();
  }, []);

  useEffect(() => {
    if (nome && especie && raca && cor && endereco) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [nome, especie, raca, cor, endereco]);

  useEffect(() => {
    const preencherFormulario = async () => {
      if (selectedAnimalId) {
        const docRef = doc(db, "animais", selectedAnimalId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.nome || "");
          setEspecie(data.especie || "");
          setRaca(data.raca || "");
          setCor(data.cor || "");
          setEndereco(data.endereco || "");
        }
      } else {
        setNome("");
        setEspecie("");
        setRaca("");
        setCor("");
        setEndereco("");
      }
    };

    preencherFormulario();
  }, [selectedAnimalId]);

  const handleUpdate = async () => {
    if (!selectedAnimalId) return;

    try {
      const docRef = doc(db, "animais", selectedAnimalId);
      await updateDoc(docRef, {
        nome,
        especie,
        raca,
        cor,
        endereco,
      });

      Alert.alert("Sucesso", "Animal atualizado com sucesso!");
    } catch (err) {
      Alert.alert("Erro ao cadastrar", String(err));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <FontAwesome5 name="cat" size={32} color="#2b6cb0" />
          <Heading style={styles.heading}>Editar Animal Perdido</Heading>
          <FontAwesome5 name="dog" size={32} color="#2b6cb0" />
        </View>

        <Text style={styles.label}>Selecionar Animal</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedAnimalId}
            onValueChange={(value) => setSelectedAnimalId(value)}
            style={styles.picker}
          >
            <Picker.Item label="-- Selecione --" value={null} />
            {animais.map((a) => (
              <Picker.Item key={a.id} label={a.nome} value={a.id} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Nome</Text>
        <Input style={styles.input}>
          <InputField
            value={nome}
            onChangeText={setNome}
            placeholder="Nome do animal"
          />
        </Input>

        <Text style={styles.label}>Espécie</Text>
        <Input style={styles.input}>
          <InputField
            value={especie}
            onChangeText={setEspecie}
            placeholder="Ex: Cachorro, Gato"
          />
        </Input>

        <Text style={styles.label}>Raça</Text>
        <Input style={styles.input}>
          <InputField value={raca} onChangeText={setRaca} placeholder="Raça" />
        </Input>

        <Text style={styles.label}>Cor</Text>
        <Input style={styles.input}>
          <InputField value={cor} onChangeText={setCor} placeholder="Cor" />
        </Input>

        <Text style={styles.label}>Endereço do desaparecimento</Text>
        <Input style={styles.input}>
          <InputField
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Endereço"
          />
        </Input>

        <Button
          style={styles.button}
          size="lg"
          variant="solid"
          action="primary"
          onPress={handleUpdate}
          isDisabled={isButtonDisabled}
        >
          <ButtonText>Salvar Alterações</ButtonText>
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
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f5f7fa",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    color: "#165a72",
    marginHorizontal: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 4,
    fontWeight: "600",
    marginLeft: 10,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#cbd5e0",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e0",
    width: "90%",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    marginTop: 30,
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
