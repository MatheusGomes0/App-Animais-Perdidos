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
import { Text, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import MapView, { Circle, Marker } from 'react-native-maps';
import { HeartHandshake } from "lucide-react-native";


export default function Situacao() {

  const [isSecondCheckBoxChecked, setIsSecondCheckBoxChecked] = useState(true);
  const [isFirstCheckBoxChecked, setIsFirstCheckBoxChecked] = useState(false);
  const [isInputEnable, setInputEnable] = useState(false);

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
        <Heading style={styles.heading}>  Status da Busca</Heading>
       <FontAwesome5 name="dog" size={32} color="#2b6cb0" style={{ marginLeft: 8 }} />
      </View>

      <Text style={styles.petName}>🐶 Rex</Text>
      <Text style={styles.address}>Rua Themistocles Zoppi, 110 - Jd Santiago</Text>

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
        width={'90%'}
        isDisabled={!isInputEnable}
      >
        <InputField placeholder="Observações (opcional)" />
      </Input>

      <Button
        style={styles.button}
        size="lg"
        variant="solid"
        action="primary"
      >
        <ButtonText>Mudar Status </ButtonText>
        <ButtonIcon as={HeartHandshake} />
      </Button>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.094925761593053,
          longitude: -47.19621286287202,
          latitudeDelta: 0.0020,
          longitudeDelta: 0.0020,
        }}
      >
        <Marker
          coordinate={{
            latitude: -23.094925761593053,
            longitude: -47.19621286287202,
          }}
          image={require('../img/tach_red.png')}
        />
        <Circle
          center={{
            latitude: -23.094925761593053,
            longitude: -47.19621286287202,
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
