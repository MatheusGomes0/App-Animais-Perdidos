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
import axios from "axios";

export default function Dono() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      nome &&
      sobrenome &&
      endereco &&
      bairro &&
      cidade &&
      estado &&
      telefone &&
      email
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [nome, sobrenome, endereco, bairro, cidade, estado, telefone, email]);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/donos", {
        nome,
        sobrenome,
        endereco,
        bairro,
        cidade,
        estado,
        telefone,
        email,
      });

      Alert.alert("Sucesso", "Dados gravados com sucesso!");

      setNome("");
      setSobrenome("");
      setEndereco("");
      setBairro("");
      setCidade("");
      setEstado("");
      setTelefone("");
      setEmail("");
      setIsButtonDisabled(true);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao gravar os dados.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


      <View style={styles.logoContainer}>
       <FontAwesome5 name="cat" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
        <Heading style={styles.heading}> Dados do Dono</Heading>
       <FontAwesome5 name="dog" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
      </View>


      {/* Campo Nome */}
      <Text style={styles.label}>Nome:</Text>
      <Input style={styles.input} variant="outline" size="md" width="100%">
        <InputField
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
        />
      </Input>

      {/* Campo Sobrenome */}
      <Text style={styles.label}>Sobrenome:</Text>
      <Input style={styles.input} variant="outline" size="md" width="100%">
        <InputField
          value={sobrenome}
          onChangeText={setSobrenome}
          placeholder="Digite seu sobrenome"
        />
      </Input>

      {/* Campo Endereço */}
      <Text style={styles.label}>Endereço:</Text>
      <Input style={styles.input} variant="outline" size="md" width="100%">
        <InputField
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Digite seu endereço"
        />
      </Input>

      {/* Campo Bairro */}
      <Text style={styles.label}>Bairro:</Text>
      <Input style={styles.input} variant="outline" size="md" width="100%">
        <InputField
          value={bairro}
          onChangeText={setBairro}
          placeholder="Digite seu bairro"
        />
      </Input>

      {/* Cidade e Estado lado a lado */}
      <View style={styles.row}>
        <View style={styles.cityContainer}>
          <Text style={styles.label}>Cidade:</Text>
          <Input style={styles.input} variant="outline" size="md" width="100%">
            <InputField
              value={cidade}
              onChangeText={setCidade}
              placeholder="Digite sua cidade"
            />
          </Input>
        </View>

        <View style={styles.stateContainer}>
          <Text style={styles.label}>Estado:</Text>
          <Input style={styles.input} variant="outline" size="md" width="100%">
            <InputField
              value={estado}
              onChangeText={setEstado}
              placeholder="UF"
              maxLength={2}
            />
          </Input>
        </View>
      </View>

      {/* Campo Telefone embaixo de Cidade/Estado */}
      <Text style={styles.label}>Telefone:</Text>
      <Input style={styles.input} variant="outline" size="md" width="100%">
        <InputField
          value={telefone}
          onChangeText={setTelefone}
          placeholder="(XX) XXXXX-XXXX"
          keyboardType="phone-pad"
        />
      </Input>

      {/* Campo Email */}
      <Text style={styles.label}>E-mail:</Text>
      <Input style={styles.input} variant="outline" size="md" width="100%">
        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
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
        <ButtonText>Editar</ButtonText>
        <ButtonIcon style={styles.btIcon} as={Disc3} />
      </Button>

      <Link style={styles.link} href="/home">
        <AntDesign name="arrowleft" size={24} color="#2b6cb0" />
        <Text style={styles.linkText}> Voltar à Home</Text>
      </Link>
    </ScrollView>
  );
}

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
    marginBottom: 12,
  },
  heading: {
    fontSize: 28,
    color: "#165a72",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30, // título um pouco mais para baixo
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
    alignItems: "center", // centraliza verticalmente
    justifyContent: "center", // centraliza horizontalmente (texto e ícone)
    paddingVertical: 14,
    marginTop: 20,
  },
  btIcon: {
    marginLeft: 6,
    color: "#fff",
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
