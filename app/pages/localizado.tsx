import { Heading, Input, InputField } from "@gluestack-ui/themed";
import { Text, StyleSheet, View, Image } from "react-native";
import { Link } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import MapView, { Circle, Marker } from 'react-native-maps';

export default function Localizacao() {
  return(
<View style={styles.container}>

<Image
        source={require("../img/animal_perdido.png")}
        style={styles.backgroundImage}
      />

    <Heading style={styles.heading}>Localizados</Heading>

    <Text style={styles.text}>Nome do animal localizado</Text>

    <Input style={styles.input} variant="outline" size="sm" mb={8} width={'78%'}>
        <InputField placeholder="" />
      </Input>

      <Text style={styles.text}>Endereço localização do animal</Text>

    <Input style={styles.input} variant="outline" size="sm" mb={8} width={'78%'}>
        <InputField placeholder="" />
      </Input>

    <MapView style={styles.map} 
    initialRegion={{
      latitude: -23.085753916419584,
      longitude: -47.20261698956988,
      latitudeDelta: 0.0018, 
      longitudeDelta: 0.0018,
    }}
    >
     <Marker
          coordinate={{
            latitude: -23.085753916419584, 
            longitude: -47.20261698956988,
          }}
            image={require('../img/tach_blue.png')}

        />
        <Circle
          center={{
            latitude: -23.085753916419584,
            longitude: -47.20261698956988,
          }}
          radius={80}
          strokeColor="blue"
          strokeWidth={2}
          fillColor="rgba(255, 0, 0, 0)"
        />
    </MapView>
     <Link style={styles.link} href="/home">
      <AntDesign style={styles.icon} name="banckward" size={24} />
        Voltar a Home
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
  text: {
    marginTop: 30,
    marginLeft: 90,
    color: "blue"
  },
  heading: {
    marginTop: 60,
    marginLeft: 100,
    marginRight: 100,
    color: "#165a72",
  },
  input: {
    marginTop: 10,
    marginLeft: 40,
    backgroundColor: "#cdcccc",
    opacity: 0.6,
  },map: {
    marginTop: 150,
    marginLeft: 50,
    width: '75%',
    height: '30%',
  },
  link: {
    marginTop:100,
    marginLeft: 10,
    color:"#04bbfa"
  },
  icon: {
    color:"#554142"
  },
});