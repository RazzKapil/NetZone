import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function SignUp({ navigation }) {
  const [phone, setPhone] = useState('');

  const handleSignUp = () => {
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 }
});
