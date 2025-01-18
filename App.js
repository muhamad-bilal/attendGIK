import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import StudentDashboard from './screens/StudentDashboard';
import TeacherDashboard from './screens/TeacherDashboard';

// Import the icon library
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(FontAwesome.font);
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1E3A8A',
            },
            headerTintColor: '#FEF08A',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
          <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

