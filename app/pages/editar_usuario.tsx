import { useState, useEffect } from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Heading,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { Text, StyleSheet, View, Alert, ScrollView } from "react-native";
import { Link } from "expo-router";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Disc3 } from "lucide-react-native";
import { getAuth } from "firebase/auth";
import { db } from "../database/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Dono() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 🔹 Buscar dados do Firestore ao abrir
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const uid = user.uid;

          const docRef = doc(db, "usuarios", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setCpf(data.cpf || "");
            setNome(data.nome || "");
            setEndereco(data.endereco || "");
            setBairro(data.bairro || "");
            setCidade(data.cidade || "");
            setEstado(data.estado || "");
            setTelefone(data.telefone || "");
            setEmail(data.email || "");
          } else {
            console.log("Documento do usuário não encontrado.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  // 🔹 Validação de campos para ativar botão
  useEffect(() => {
    setIsButtonDisabled(
      !(
        nome &&
        cpf &&
        endereco &&
        bairro &&
        cidade &&
        estado &&
        telefone &&
        email
      )
    );
  }, [nome, cpf, endereco, bairro, cidade, estado, telefone, email]);

  // 🔹 Atualizar dados no Firestore
  const handleSubmit = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "usuarios", user.uid), {
          nome,
          cpf,
          endereco,
          bairro,
          cidade,
          estado,
          telefone,
          email,
        });

        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar os dados.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome5 name="cat" size={32} color="#2b6cb0" />
        <Heading style={styles.heading}> Editar dados</Heading>
        <FontAwesome5 name="dog" size={32} color="#2b6cb0" />
      </View>

      {/* Campos de entrada */}
      <Text style={styles.label}>Nome:</Text>
      <Input style={styles.input}>
        <InputField value={nome} onChangeText={setNome} placeholder="Nome" />
      </Input>

      <Text style={styles.label}>CPF:</Text>
      <Input style={styles.input}>
        <InputField value={cpf} editable={false} placeholder="CPF" />
      </Input>

      <Text style={styles.label}>Endereço:</Text>
      <Input style={styles.input}>
        <InputField
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Endereço"
        />
      </Input>

      <Text style={styles.label}>Bairro:</Text>
      <Input style={styles.input}>
        <InputField
          value={bairro}
          onChangeText={setBairro}
          placeholder="Bairro"
        />
      </Input>

      <View style={styles.row}>
        <View style={styles.cityContainer}>
          <Text style={styles.label}>Cidade:</Text>
          <Input style={styles.input}>
            <InputField
              value={cidade}
              onChangeText={setCidade}
              placeholder="Cidade"
            />
          </Input>
        </View>
        <View style={styles.stateContainer}>
          <Text style={styles.label}>Estado:</Text>
          <Input style={styles.input}>
            <InputField
              value={estado}
              onChangeText={setEstado}
              placeholder="UF"
            />
          </Input>
        </View>
      </View>

      <Text style={styles.label}>Telefone:</Text>
      <Input style={styles.input}>
        <InputField
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Telefone"
        />
      </Input>

      <Text style={styles.label}>Email:</Text>
      <Input style={styles.input}>
        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
      </Input>

      <Button
        style={styles.button}
        onPress={handleSubmit}
        isDisabled={isButtonDisabled}
      >
        <ButtonText>Editar</ButtonText>
        <ButtonIcon as={Disc3} />
      </Button>

      <Link style={styles.link} href="/home">
        <AntDesign name="arrowleft" size={24} color="#2b6cb0" />
        <Text style={styles.linkText}> Voltar à Home</Text>
      </Link>
    </ScrollView>
  );
}

// ❗️ Estilos
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#f5f7fa",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: 28,
    color: "#165a72",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 8,
    marginTop: 12,
    marginBottom: 6,
    fontSize: 16,
    color: "#2b6cb0",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#cbd5e0",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cityContainer: {
    width: "65%",
  },
  stateContainer: {
    width: "30%",
  },
  button: {
    width: "100%",
    backgroundColor: "#2b6cb0",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: 20,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 40,
  },
  linkText: {
    marginLeft: 8,
    color: "#2b6cb0",
    fontSize: 16,
  },
});
