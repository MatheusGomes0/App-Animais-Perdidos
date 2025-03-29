import { useState, useEffect } from "react";
import { Button, ButtonIcon, ButtonText, Heading, Input, InputField } from "@gluestack-ui/themed";
import { Text, StyleSheet, View, Image, Alert } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Disc3 } from "lucide-react-native";
import axios from "axios"; // Importando axios para as requisições HTTP

export default function Animal() {
  // Estados para armazenar os valores dos inputs
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [enderecoDesaparecimento, setEnderecoDesaparecimento] = useState("");

  // Estado para controlar se o botão está habilitado
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Verifica se todos os campos estão preenchidos
  useEffect(() => {
    if (nome && especie && raca && enderecoDesaparecimento) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [nome, especie, raca, enderecoDesaparecimento]);

  // Função para enviar os dados para a API
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/animais", {
        nome,
        especie,
        raca,
        endereco_desaparecimento: enderecoDesaparecimento,
        status: false, // Definindo o status como false por padrão
      });

      // Exibe uma mensagem de sucesso
      Alert.alert("Sucesso", "Dados gravados com sucesso!");

      // Limpa o formulário
      setNome("");
      setEspecie("");
      setRaca("");
      setEnderecoDesaparecimento("");
      setIsButtonDisabled(true); // Desabilita o botão novamente

    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao gravar os dados.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../img/animal_perdido.png")} style={styles.backgroundImage} />
      <Heading style={styles.heading}>Cadastro do animal</Heading>

      <Text style={styles.text}>Nome:</Text>
      
      <Input style={styles.input} variant="outline" size="sm" mb={8} width={'78%'}>
        <InputField value={nome} onChangeText={setNome} placeholder="" />
      </Input>

      <Text style={styles.text}>Espécie:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={'25%'}>
        <InputField value={especie} onChangeText={setEspecie} placeholder="" />
      </Input>

      <Text style={styles.text}>Raça:</Text>

      <Input style={styles.input} variant="outline" size="md" mb={8} width={"33%"}>
        <InputField value={raca} onChangeText={setRaca} placeholder="" />
      </Input>

      <Text style={styles.text1}>Endereço do desaparecimento:</Text>

      <Input style={styles.input1} variant="outline" size="md" mb={8} width={"90%"}>
        <InputField value={enderecoDesaparecimento} onChangeText={setEnderecoDesaparecimento} placeholder="" />
      </Input>

      <Button
        style={styles.button}
        size="lg"
        variant="solid"
        action="primary"
        onPress={handleSubmit}
        isDisabled={isButtonDisabled} // Desabilita o botão enquanto o formulário estiver incompleto
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
    marginTop: 90,
    marginLeft: 20,
    color: "blue",
  },
  text1: {
    marginTop: 90,
    marginLeft: 80,
    color: "blue",
  },
  input: {
    marginTop: 90,
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
    marginTop: 90,
    marginLeft: 100,
    marginRight: 100,
    color: "#165a72",
  },
  link: {
    marginTop: 200,
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
