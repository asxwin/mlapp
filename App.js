import { StatusBar } from "expo-status-bar";
import { useState,useRef,useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  View,
  
  
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageViewer from "./components/ImageViewer";
import * as Progress from 'react-native-progress';
const PlaceholderImage = "https://reactnative.dev/img/tiny_logo.png";


// const createFormData = (photo) => {
//   const data = new FormData();
//   data.append('file', {uri: photo});

//   console.log(data)

//   return data;
// };


export default function App() {
  const [opacityprog, setOpacityprog] = useState(0.0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [Returninfo, setReturninfo] = useState("");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadImage = async () => {
    try {
      console.log(selectedImage);
    

      if ((selectedImage != null) && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(selectedImage)) {
        setOpacityprog(1.0);
        let headersList = {
          Accept: "*/*",
        };

        let bodyContent = new FormData();
        bodyContent.append("file", {
          uri: selectedImage,
          name: "image.jpg",
          type: "image/jpeg",
        });
        let a=await fetch("http://172.20.10.4:8080", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
          mode: "no-cors",
        }).then((response) => response.blob())   
          .then((blob) => {
            const uri = URL.createObjectURL(blob);
            setSelectedImage(uri);})
          .catch((error) => console.error(error));

      } else {
        alert("Please Select Valid Image or Unprocessed Image  first");
      }
      setOpacityprog(0.0)

    } catch (error) {
      console.error("Error:", error);
      alert("Upload failed. Please try again later.");
    }
  };

  return (
    <View  style={styles.container}>
      
      <ImageViewer
        placeholderImageSource={PlaceholderImage}
        selectedImage={selectedImage}
      />
      
      
      <TouchableOpacity
        style={styles.buttonStyle2}
        activeOpacity={0.5}
        onPress={pickImageAsync}
      >
        <Text style={styles.baseText}>Select Image</Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={uploadImage}
      >
        <Text style={styles.baseText}>Upload File</Text>
      </TouchableOpacity>

      <Progress.Bar opacity={opacityprog} width={500} indeterminate={true} useNativeDriver={true} color={"#9dc3ee"} borderWidth={0}/>
      {/* <Text style={styles.baseText}> {Returninfo} </Text> */}
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    scrollview: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    
    
  },
  baseText: {
    fontSize: 16,
    color: "#ffffff",
    
  },
  buttonStyle: {
    
    backgroundColor: "#7DE24E",
    borderRadius: 8,
    padding: 7,
    color: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset:{width:2,height:2},
    marginBottom: 10  },
  
    buttonStyle2: {
      padding:20,
      backgroundColor: "#9dc3ee",
      borderRadius: 8,
      padding: 7,
      color: "#000000",
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset:{width:2,height:2},
      margin: 10,  }

});
