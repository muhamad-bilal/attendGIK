import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
  const [userType, setUserType] = useState('student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleLogin = () => {
    if (userType === 'student') {
      navigation.navigate('StudentDashboard');
    } else {
      navigation.navigate('TeacherDashboard');
    }
  };

  const toggleUserType = (type) => {
    if (type !== userType) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: type === 'student' ? 0 : 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
      setUserType(type);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to proxyGIK</Text>

      <View style={styles.toggleContainer}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150], 
                  }),
                },
              ],
            },
          ]}
        />

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => toggleUserType('student')}
        >
          <Icon
            name="graduation-cap"
            size={20}
            color={userType === 'student' ? '#FEF08A' : '#1E3A8A'}
          />
          <Text
            style={[
              styles.toggleText,
              { color: userType === 'student' ? '#FEF08A' : '#1E3A8A' },
            ]}
          >
            Student
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => toggleUserType('teacher')}
        >
          <Icon
            name="briefcase"
            size={20}
            color={userType === 'teacher' ? '#FEF08A' : '#1E3A8A'}
          />
          <Text
            style={[
              styles.toggleText,
              { color: userType === 'teacher' ? '#FEF08A' : '#1E3A8A' },
            ]}
          >
            Teacher
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Input
          placeholder={userType === 'student' ? 'Student ID' : 'Teacher ID'}
          value={id}
          onChangeText={setId}
          containerStyle={styles.input}
          inputStyle={{ color: '#c4a464' }}
          leftIcon={
            <Icon
              name={userType === 'student' ? 'id-card' : 'id-badge'}
              size={24}
              color="#1E3A8A"
            />
          }
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          containerStyle={styles.input}
          inputStyle={{ color: '#c4a464' }}
          leftIcon={<Icon name="lock" size={24} color="#1E3A8A" />}
        />
      </Animated.View>

      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        icon={
          <Icon
            name="sign-in"
            size={20}
            color="#1E3A8A"
            style={{ marginRight: 10 }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19204c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#c4a464',
  },
  toggleContainer: {
    width: 300,
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: '#c4a464',
    position: 'relative',
    overflow: 'hidden',
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: '#223B8C',
    borderRadius: 25,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  toggleText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  input: {
    width: 300,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: 200,
    backgroundColor: '#c4a464',
    borderRadius: 25,
  },
  buttonText: {
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
});
