import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const forms = [
  { id: '1', title: 'SSC CHSL 2025' },
  { id: '2', title: 'IBPS PO 2025' },
  { id: '3', title: 'Delhi University Admission' }
];

export default function Forms() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Forms</Text>
      <FlatList
        data={forms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1 }
});
