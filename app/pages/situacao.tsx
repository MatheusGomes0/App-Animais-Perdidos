import React, { useState } from "react";
import { Button, ButtonIcon, ButtonText, CheckIcon, Checkbox, CheckboxIcon, CheckboxIndicator, 
         CheckboxLabel, Heading, Input, InputField } from "@gluestack-ui/themed";
import { Text, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import MapView, { Circle, Marker } from 'react-native-maps';
import { HeartHandshake } from "lucide-react-native";

export default function Situacao() {

  const [isSecondCheckBoxChecked, setIsSecondCheckBoxChecked] = useState(true);
  const [isFirstCheckBoxChecked, setIsFirstCheckBoxChecked] = useState(false);
  const [isInputEnable, setInputEnable] = useState(false);

  const handleSecondCheckBoxChange = () => {
    const newValue = !isSecondCheckBoxChecked;
    setIsSecondCheckBoxChecked(newValue);
    if(!newValue){
      setIsFirstCheckBoxChecked(false);
      setInputEnable(false);
    }
  };

    const handleFirstCheckBoxChange =() => {
      const newValue = !isFirstCheckBoxChecked;
      setIsFirstCheckBoxChecked(newValue);
      setInputEnable(newValue);
    if(newValue){
      setIsSecondCheckBoxChecked(false);
      }
    };

  return(
    <View style={styles.container}>

      <Image
        source={require("../img/animal_perdido.png")}
        style={styles.backgroundImage}
      />

      <Heading style={styles.heading}>Status da Busca</Heading>

      <Text style={styles.text}>                 Rex</Text>

      <Text style={styles.text1}>Rua Themistocles Zoppi, 110 - Jd Santiago</Text>
      
      <Checkbox style={styles.check}
        size="md"
        isDisabled={isSecondCheckBoxChecked}
        isChecked={isFirstCheckBoxChecked}
        value={isFirstCheckBoxChecked ? "checked" : ""}
        onChange={handleFirstCheckBoxChange}>

            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon}/>
            </CheckboxIndicator>
            <CheckboxLabel style={styles.checkLabel}>Encontrado</CheckboxLabel>
          </Checkbox>

        <Checkbox style={styles.check1} 
        size="md" 
        isDisabled={isFirstCheckBoxChecked}
        isChecked={isSecondCheckBoxChecked}
        value={isSecondCheckBoxChecked ? "checked" : ""}
        onChange={handleSecondCheckBoxChange}
        >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon}/>
            </CheckboxIndicator>
            <CheckboxLabel style={styles.checkLabel}>Não encontrado</CheckboxLabel>
          </Checkbox>

     <Input style={[styles.input, { opacity: isInputEnable ? 1 : 0.7 }]} 
        variant="outline" 
        size="sm" 
        mb={8} 
        width={'78%'}
        isDisabled={!isInputEnable}>
        <InputField placeholder="" />
  </Input>
      
  <Button  style={styles.button}
        size="lg"
        variant="solid"
        action="primary"
      >
        <ButtonText>Gravar</ButtonText>
        <ButtonIcon style={styles.btIcon} as={HeartHandshake} />
      </Button>

      <MapView style={styles.map} 
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
          fillColor="rgba(255, 0, 0, 0)"
        />
      </MapView>

      <Link style={styles.link} href="/home">
        <AntDesign style={styles.icon} name="banckward" size={24} />
        <Text style={styles.linkText}>Voltar à Home</Text>
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
    marginTop:150,
  },
  heading: {
    marginTop: 60,
    marginLeft: 80,
    marginRight: 80,
    fontSize: 30,
    color: "#165a72",
  },
  text: {
    marginTop: 60,
    marginLeft: 80,
    fontSize: 20,
    fontWeight: "bold",
    color: "blue"
  },
  text1: {
    marginTop: 30,
    marginLeft: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "blue"
  },
  check:{
    marginTop: 70,
    marginLeft: 50,
    borderBottomColor: "black",
    color: "blue"
  },
  check1:{
    marginTop: 70,
    marginLeft: 70,
    color: "blue"
  },
  checkLabel:{
    marginLeft: 5,
    color: "blue"
  },
  input: {
    marginTop: 40,
    marginLeft: 50,
    backgroundColor: "#cdcccc",
    opacity: 0.7
  },
  map: {
    marginTop: 40,
    marginLeft: 50,
    width: '75%',
    height: '30%',
  },
  link: {
    marginTop:30,
    marginLeft: 10,
    color:"#04bbfa"
  },
  linkText:{
    marginLeft: 10
  },
  button: {
    marginTop: 10,
    marginLeft: 250
  },
  btIcon:{
    marginLeft:4
  },
  icon: {
    color:"#554142"
  },
});
