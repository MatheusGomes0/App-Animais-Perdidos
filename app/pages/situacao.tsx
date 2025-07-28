import React, { useState } from "react";
import {
  Button,
  ButtonIcon,
  ButtonText,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Heading,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { Text, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import MapView, { Circle, Marker } from "react-native-maps";
import { HeartHandshake } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";

export default function Situacao() {
  const [isSecondCheckBoxChecked, setIsSecondCheckBoxChecked] = useState(true);
  const [isFirstCheckBoxChecked, setIsFirstCheckBoxChecked] = useState(false);
  const [isInputEnable, setInputEnable] = useState(false);

  const animais = [
    {
      id: "1",
      nome: "Rex",
      endereco: "Rua Themistocles Zoppi, 110 - Jd Santiago",
      latitude: -23.094925761593053,
      longitude: -47.19621286287202,
    },
    {
      id: "2",
      nome: "Mimi",
      endereco: "Av. Brasil, 500 - Centro",
      latitude: -23.0955,
      longitude: -47.1955,
    },
  ];

  // Armazenar apenas o ID selecionado
  const [animalSelecionadoId, setAnimalSelecionadoId] = useState("1");

  // Buscar animal selecionado com base no ID
  const animalSelecionado = animais.find((a) => a.id === animalSelecionadoId)!;

  const handleSecondCheckBoxChange = () => {
    const newValue = !isSecondCheckBoxChecked;
    setIsSecondCheckBoxChecked(newValue);
    if (!newValue) {
      setIsFirstCheckBoxChecked(false);
      setInputEnable(false);
    }
  };

  const handleFirstCheckBoxChange = () => {
    const newValue = !isFirstCheckBoxChecked;
    setIsFirstCheckBoxChecked(newValue);
    setInputEnable(newValue);
    if (newValue) {
      setIsSecondCheckBoxChecked(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome5 name="cat" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
        <Heading style={styles.heading}>  Alterar Status</Heading>
        <FontAwesome5 name="dog" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
      </View>

      {/* Picker para selecionar o animal */}
      <View style={styles.pickerContainer}>
  <Picker
    selectedValue={animalSelecionadoId}
    onValueChange={(itemValue) => setAnimalSelecionadoId(itemValue)}
    style={styles.picker}
    dropdownIconColor="#2b6cb0" // Adicione para visibilidade do ícone
  >
    {animais.map((animal) => (
      <Picker.Item 
        key={animal.id} 
        label={animal.nome} 
        value={animal.id} 
      />
    ))}
  </Picker>
</View>

      <Text style={styles.petName}>🐶 {animalSelecionado.nome}</Text>
      <Text style={styles.address}>{animalSelecionado.endereco}</Text>

      <View style={styles.checkGroup}>
        <Checkbox
          size="md"
          isDisabled={isSecondCheckBoxChecked}
          isChecked={isFirstCheckBoxChecked}
          value={isFirstCheckBoxChecked ? "checked" : ""}
          onChange={handleFirstCheckBoxChange}
          style={styles.checkbox}
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel style={styles.checkLabel}>Encontrado</CheckboxLabel>
        </Checkbox>

        <Checkbox
          size="md"
          isDisabled={isFirstCheckBoxChecked}
          isChecked={isSecondCheckBoxChecked}
          value={isSecondCheckBoxChecked ? "checked" : ""}
          onChange={handleSecondCheckBoxChange}
          style={styles.checkbox}
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel style={styles.checkLabel}>Não encontrado</CheckboxLabel>
        </Checkbox>
      </View>

      <Input
        style={styles.input}
        variant="outline"
        size="md"
        mb={8}
        width={"90%"}
        isDisabled={!isInputEnable}
      >
        <InputField placeholder="Observações (opcional)" />
      </Input>

      <Button style={styles.button} size="lg" variant="solid" action="primary">
        <ButtonText>Mudar Status</ButtonText>
        <ButtonIcon as={HeartHandshake} />
      </Button>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: animalSelecionado.latitude,
          longitude: animalSelecionado.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker
          coordinate={{
            latitude: animalSelecionado.latitude,
            longitude: animalSelecionado.longitude,
          }}
          image={require("../img/tach_red.png")}
        />
        <Circle
          center={{
            latitude: animalSelecionado.latitude,
            longitude: animalSelecionado.longitude,
          }}
          radius={80}
          strokeColor="red"
          strokeWidth={2}
          fillColor="rgba(255, 0, 0, 0.1)"
        />
      </MapView>

      <Link style={styles.link} href="/home">
        <AntDesign name="arrowleft" size={20} color="#2b6cb0" />
        <Text style={styles.linkText}>Voltar à Home</Text>
      </Link>
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
    paddingVertical: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  heading: {
    fontSize: 30,
    color: "#165a72",
    fontWeight: "bold",
    marginBottom: 1,
    textAlign: "center",
  },
  pickerContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#cbd5e0",
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  picker: {
  height: 44,
  width: "100%",
  color: "#000", // Garante visibilidade do texto
},
  petName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2b6cb0",
    marginTop: 8,
  },
  address: {
    fontSize: 16,
    color: "#333",
    marginVertical: 8,
    textAlign: "center",
  },
  checkGroup: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "90%",
    marginVertical: 12,
  },
  checkbox: {
    marginVertical: 8,
  },
  checkLabel: {
    marginLeft: 6,
    fontSize: 16,
    color: "#2b6cb0",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#cbd5e0",
    marginVertical: 12,
  },
  button: {
    width: "90%",
    backgroundColor: "#2b6cb0",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginVertical: 12,
  },
  map: {
    width: "90%",
    height: 200,
    borderRadius: 12,
    marginVertical: 12,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  linkText: {
    marginLeft: 8,
    color: "#2b6cb0",
    fontSize: 16,
  },
});
