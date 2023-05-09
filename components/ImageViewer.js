import { StyleSheet, Image } from 'react-native';
import { Video } from 'expo-av';


export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource =
    selectedImage !== null ? { uri:selectedImage } : placeholderImageSource;

  return  <Image
    source={imageSource} style={styles.image}
    />;
}

const styles = StyleSheet.create({  
  image: {
    width: 315,
    height: 700,
    borderRadius: 10,
  },
});
