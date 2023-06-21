import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import LocationEnabler from 'react-native-location-enabler';


const HomeScreen = ({ navigation }) => {

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={require('./Assets/bg.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.banner}>Jsecurity</Text>
        <Text style={styles.subBanner}>Feel secure with Jsecurity</Text>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.additionalText}>Additional text...</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent overlay on top of the background image
  },
  banner: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // Set the text color to white
  },
  subBanner: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff', // Set the text color to white
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  additionalText: {
    marginTop: 20,
    color: '#fff', // Set the text color to white
  },
});

export default HomeScreen;
