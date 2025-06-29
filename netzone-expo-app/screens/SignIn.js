import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';

export default function SignIn({ navigation }) {
  const [phone, setPhone] = useState('');

  const handleSignIn = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="+91..."
        keyboardType="phone-pad"
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text onPress={() => navigation.navigate('SignUp')} style={styles.link}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  link: { marginTop: 10, color: 'blue' }
});
