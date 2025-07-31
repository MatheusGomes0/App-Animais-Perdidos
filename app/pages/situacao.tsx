import React, { useEffect, useState } from "react";
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
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
} from "@gluestack-ui/themed";
import { Text, StyleSheet, View, Alert } from "react-native";
import { Link } from "expo-router";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import MapView, { Circle, Marker } from "react-native-maps";
import { HeartHandshake, ChevronDown } from "lucide-react-native";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as Location from "expo-location";

export default function Situacao() {
  const [animais, setAnimais] = useState<any[]>([]);
  const [animalSelecionadoId, setAnimalSelecionadoId] = useState<string>("");
  const [isFirstCheckBoxChecked, setIsFirstCheckBoxChecked] = useState(false); // Encontrado
  const [isSecondCheckBoxChecked, setIsSecondCheckBoxChecked] = useState(true); // Não encontrado
  const [isInputEnable, setInputEnable] = useState(false);
  const [observacao, setObservacao] = useState<string>("");

  // Coordenadas convertidas do endereço para mostrar no mapa
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const auth = getAuth();

  // Busca animais do usuário logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      if (usuario) {
        try {
          const querySnapshot = await getDocs(collection(db, "animais"));
          const listaAnimais: any[] = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.usuarioId === usuario.uid) {
              listaAnimais.push({ id: doc.id, ...data });
            }
          });

          setAnimais(listaAnimais);

          if (listaAnimais.length > 0) {
            setAnimalSelecionadoId(listaAnimais[0].id);

            // Ajusta checkbox conforme status do animal (status: true = encontrado)
            const status = listaAnimais[0].status ?? false;
            setIsFirstCheckBoxChecked(status);
            setIsSecondCheckBoxChecked(!status);
            setInputEnable(false);
          }
        } catch (error) {
          console.error("Erro ao buscar animais:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Animal selecionado pelo ID
  const animalSelecionado = animais.find((a) => a.id === animalSelecionadoId);

  // Geocodifica o endereço para coordenadas toda vez que o animalSelecionado mudar
  useEffect(() => {
    const fetchCoords = async () => {
      if (!animalSelecionado?.endereco) {
        setCoords(null);
        return;
      }
      try {
        const geocode = await Location.geocodeAsync(animalSelecionado.endereco);
        if (geocode.length > 0) {
          setCoords({
            latitude: geocode[0].latitude,
            longitude: geocode[0].longitude,
          });
        } else {
          setCoords(null);
        }
      } catch (error) {
        console.error("Erro ao geocodificar endereço:", error);
        setCoords(null);
      }
    };

    fetchCoords();
  }, [animalSelecionado]);


  const emojiEspecie = (especie: string | undefined) => {
    if (!especie) return "";
    const especieLower = especie.toLowerCase();
    if (especieLower.includes("cachorro")) return "🐶";
    if (especieLower.includes("gato")) return "🐱";
    return "";
  };

  // Controle dos checkboxes
  const handleSecondCheckBoxChange = () => {
    const newValue = !isSecondCheckBoxChecked;
    setIsSecondCheckBoxChecked(newValue);
    if (!newValue) {
      setIsFirstCheckBoxChecked(false);
      setInputEnable(false);
    } else {
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
    } else {
      setIsSecondCheckBoxChecked(true);
      setInputEnable(false);
    }
  };

  // Atualiza status e observação no Firestore
  const handleMudarStatus = async () => {
    if (!animalSelecionadoId) return;

    try {
      const docRef = doc(db, "animais", animalSelecionadoId);

      await updateDoc(docRef, {
        status: isFirstCheckBoxChecked,
        observacao: observacao.trim() !== "" ? observacao.trim() : null,
      });

      // Atualizar localmente o estado
      setAnimais((prev) =>
        prev.map((a) =>
          a.id === animalSelecionadoId
            ? { ...a, status: isFirstCheckBoxChecked, observacao }
            : a
        )
      );

      Alert.alert("Sucesso", "Status alterado com sucesso!");
      setInputEnable(false);
      setObservacao("");
    } catch (error) {
      Alert.alert("Erro", "Falha ao alterar status.");
      console.error("Erro ao alterar status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome5 name="cat" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
        <Heading style={styles.heading}> Alterar Situação</Heading>
        <FontAwesome5 name="dog" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
      </View>

      <View style={styles.pickerContainer}>
        <Select selectedValue={animalSelecionadoId} onValueChange={setAnimalSelecionadoId}>
          <SelectTrigger>
            <SelectInput placeholder="Selecione um animal" />
            <SelectIcon as={ChevronDown} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {animais.map((animal) => (
                <SelectItem key={animal.id} label={animal.nome} value={animal.id} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>

      {animalSelecionado && (
        <>
          <Text style={styles.petName}>
            {emojiEspecie(animalSelecionado.especie)} {animalSelecionado.nome}
          </Text>

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
            <InputField
              placeholder="Observações (opcional)"
              onChangeText={setObservacao}
              value={observacao}
            />
          </Input>

          <Button
            style={styles.button}
            size="lg"
            variant="solid"
            action="primary"
            onPress={handleMudarStatus}
          >
            <ButtonText>Mudar Status</ButtonText>
            <ButtonIcon as={HeartHandshake} />
          </Button>

          {coords ? (
            <MapView
              style={styles.map}
              region={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
            >
              <Marker
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
                image={require("../img/tach_red.png")}
              />
              <Circle
                center={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
                radius={80}
                strokeColor="red"
                strokeWidth={2}
                fillColor="rgba(255, 0, 0, 0.1)"
              />
            </MapView>
          ) : (
            <Text style={{ marginTop: 16, color: "#888" }}>
              Não foi possível localizar o endereço no mapa.
            </Text>
          )}
        </>
      )}

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
    marginVertical: 10,
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
