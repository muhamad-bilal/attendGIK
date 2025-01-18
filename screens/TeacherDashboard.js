import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function TeacherDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, Teacher!</Text>
      <Button
        title="View Class Attendance"
        onPress={() => {/* Implement view class attendance logic */}}
        buttonStyle={styles.button}
      />
      <Button
        title="Take Attendance"
        onPress={() => {/* Implement take attendance logic */}}
        buttonStyle={styles.button}
      />
      <Button
        title="Manage Classes"
        onPress={() => {/* Implement manage classes logic */}}
        buttonStyle={styles.button}
      />
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
        buttonStyle={[styles.button, styles.logoutButton]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: 200,
  },
  logoutButton: {
    backgroundColor: 'red',
    marginTop: 30,
  },
});

