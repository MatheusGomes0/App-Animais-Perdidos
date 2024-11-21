import { useState, useEffect } from "react";
import { Button, ButtonIcon, ButtonText, Heading, Input, InputField } from "@gluestack-ui/themed";
import { Text, StyleSheet, View, Image, Alert } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Disc3 } from "lucide-react-native";
import axios from "axios"; 

export default function Dono() {
  // Estados para armazenar os valores dos inputs
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  
  // Estado para controlar se o botão está habilitado
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Verifica se todos os campos estão preenchidos
  useEffect(() => {
    if (nome && sobrenome && endereco && bairro && cidade && estado && telefone && email) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [nome, sobrenome, endereco, bairro, cidade, estado, telefone, email]);

  // Função para enviar os dados para a API
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
        email
      });

      // Exibe uma mensagem de sucesso
      Alert.alert("Sucesso", "Dados gravados com sucesso!");

      // Limpa o formulário
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
    <View style={styles.container}>
      <Image source={require("../img/animal_perdido.png")} style={styles.backgroundImage} />
      <Heading style={styles.heading}>Cadastro dono</Heading>

      <Text style={styles.text}>Nome:</Text>

      <Input style={styles.input} variant="outline" size="sm" mb={8} width={"80%"}>
        <InputField value={nome} onChangeText={setNome} placeholder="" />
      </Input>

      <Text style={styles.text}>Sobrenome:</Text>

      <Input style={styles.input} variant="outline" size="sm" mb={8} width={"70%"}>
        <InputField value={sobrenome} onChangeText={setSobrenome} placeholder="" />
      </Input>

      <Text style={styles.text}>Endereço:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={"72%"}>
        <InputField value={endereco} onChangeText={setEndereco} placeholder="" />
      </Input>

      <Text style={styles.text}>Bairro:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={"78%"}>
        <InputField value={bairro} onChangeText={setBairro} placeholder="" />
      </Input>

      <Text style={styles.text}>Cidade:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={"75%"}>
        <InputField value={cidade} onChangeText={setCidade} placeholder="" />
      </Input>

      <Text style={styles.text}>Estado:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={"10%"}>
        <InputField value={estado} onChangeText={setEstado} placeholder="" />
      </Input>

      <Text style={styles.text}>Tel:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={"52%"}>
        <InputField value={telefone} onChangeText={setTelefone} placeholder="" />
      </Input>

      <Text style={styles.text}>E-mail:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={"75%"}>
        <InputField value={email} onChangeText={setEmail} placeholder="" />
      </Input>

      <Button
        style={styles.button}
        size="lg"
        variant="solid"
        action="primary"
        onPress={handleSubmit}
        isDisabled={isButtonDisabled} 
      >
        <ButtonText>Gravar</ButtonText>
        <ButtonIcon style={styles.btIcon} as={Disc3} />
      </Button>

      <Link style={styles.link} href="/home">
        <AntDesign style={styles.icon} name="banckward" size={24} /> Voltar a Home
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
    marginTop: 150,
  },
  text: {
    marginTop: 40,
    marginLeft: 20,
    color: "blue",
  },
  input: {
    marginTop: 40,
    marginLeft: 10,
    backgroundColor: "#cdcccc",
    opacity: 0.7,
  },
  heading: {
    marginTop: 60,
    marginLeft: 150,
    marginRight: 100,
    color: "#165a72",
  },
  link: {
    marginTop: 60,
    marginLeft: 10,
    color: "#04bbfa",
  },
  button: {
    marginTop: 10,
    marginLeft: 250,
  },
  btIcon: {
    marginLeft: 4,
  },
  icon: {
    color: "#554142",
  },
});
