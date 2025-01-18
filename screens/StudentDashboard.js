import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Modal, View, ScrollView, SafeAreaView } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';

function CourseCard({ course, onPress }) {
  const attendedClasses = course.classes.filter(c => c.attended).length;
  const totalClasses = course.classes.length;
  const attendancePercentage = ((attendedClasses / totalClasses) * 100).toFixed(1);

  return (
    <TouchableOpacity onPress={() => onPress(course)}>
      <Card containerStyle={styles.courseCard}>
        <Card.Title style={styles.cardTitle}>{course.name}</Card.Title>
        <Text style={styles.cardText}>Schedule: {course.schedule}</Text>
        <Text style={styles.attendanceText}>
          Attended: {attendedClasses}/{totalClasses} classes ({attendancePercentage}%)
        </Text>
      </Card>
    </TouchableOpacity>
  );
}

function WeeklySchedule({ week, onClose }) {
  const [selectedClass, setSelectedClass] = useState(null);

  const isAttendanceDisabled = (classInfo) => {
    const now = new Date();
    const classTime = new Date(classInfo.date);
    return !classInfo.attendanceOpen || now > classTime;
  };

  const renderClassDetails = () => {
    if (!selectedClass) return null;
    
    return (
      <ScrollView style={styles.classDetailsContainer}>
        <View style={styles.weekHeaderContainer}>
          <Text style={styles.weekHeaderTitle}>Week {week.week}</Text>
        </View>
        <Text style={styles.classInfo}>Date: {new Date(selectedClass.date).toLocaleDateString()}</Text>
        <Text style={styles.classInfo}>Time: {selectedClass.time}</Text>
        <Text style={styles.classInfo}>Location: {selectedClass.location}</Text>
        <Button
          title="Mark Attendance"
          disabled={isAttendanceDisabled(selectedClass)}
          buttonStyle={styles.attendanceButton}
          disabledStyle={styles.disabledButton}
          onPress={() => {/* Implement attendance marking logic */}}
        />
        <Text style={styles.attendanceStatus}>
          {!selectedClass.attendanceOpen ? 'Attendance not yet opened by teacher' :
           new Date() > new Date(selectedClass.date) ? 'Class already completed' :
           'Attendance open'}
        </Text>
        <Button
          title="Back to Schedule"
          onPress={() => setSelectedClass(null)}
          buttonStyle={styles.backButton}
        />
      </ScrollView>
    );
  };


  return (
    <SafeAreaView style={styles.weekScheduleContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onClose} style={styles.backButtonContainer}>
          <Text style={[styles.backButtonText, { color: 'white' }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.weekTitle, { color: 'white' }]}>Week {week.week}</Text>
      </View>
      <ScrollView style={[styles.scheduleContent, { backgroundColor: '#19204c' }]}>
        {!selectedClass ? (
          <>
            {week.classes.map((classInfo, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => setSelectedClass(classInfo)}
                style={[styles.classCard, { backgroundColor: '#2a3166', marginHorizontal: 20 }]}
              >
                <Text style={[styles.classDay, { color: 'white' }]}>{classInfo.day}</Text>
                <Text style={[styles.classTime, { color: '#c4a464' }]}>{classInfo.time}</Text>
                <Text style={[styles.classLocation, { color: '#c4a464' }]}>{classInfo.location}</Text>
              </TouchableOpacity>
            ))}
          </>
        ) : renderClassDetails()}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function StudentDashboard({ navigation }) {
  const generateClassSchedule = (weekNum, baseSchedule) => {
    const startDate = new Date(2024, 0, 8); // Starting from Jan 8, 2024
    return baseSchedule.map((schedule, idx) => ({
      day: schedule.day,
      time: schedule.time,
      location: schedule.location,
      topic: `Topic ${weekNum}.${idx + 1}`,
      date: new Date(startDate.getTime() + (weekNum - 1) * 7 * 24 * 60 * 60 * 1000 + 
                    schedule.dayOffset * 24 * 60 * 60 * 1000),
      attendanceOpen: false,
      attended: false
    }));
  };

  const [courses] = useState([
    {
      id: '1',
      name: 'Operating Systems',
      schedule: 'Mon & Wed 10:00-11:30 AM',
      classes: Array.from({ length: 7 }, (_, i) => ({
        day: i % 2 === 0 ? 'Monday' : 'Wednesday',
        time: '10:00-11:30 AM',
        attended: Math.random() > 0.3,
        location: 'Room 101'
      })),
      weeklySchedule: Array.from({ length: 15 }, (_, i) => ({
        week: i + 1,
        topic: `Week ${i + 1}: ${i + 1 <= 5 ? 'Fundamentals' : i + 1 <= 10 ? 'Advanced Concepts' : 'Project Work'}`,
        classes: generateClassSchedule(i + 1, [
          { day: 'Monday', time: '10:00-11:30 AM', location: 'Room 101', dayOffset: 0 },
          { day: 'Wednesday', time: '10:00-11:30 AM', location: 'Room 101', dayOffset: 2 }
        ])
      }))
    },
    {
      id: '2',
      name: 'Data Structures',
      schedule: 'Tue & Thu 2:00-3:30 PM',
      classes: Array.from({ length: 7 }, (_, i) => ({
        day: i % 2 === 0 ? 'Tuesday' : 'Thursday',
        time: '2:00-3:30 PM',
        attended: Math.random() > 0.3,
        location: 'Room 203'
      })),
      weeklySchedule: Array.from({ length: 15 }, (_, i) => ({
        week: i + 1,
        topic: `Week ${i + 1}: ${i + 1 <= 5 ? 'Basic Data Structures' : i + 1 <= 10 ? 'Advanced Algorithms' : 'Implementation Projects'}`,
        classes: generateClassSchedule(i + 1, [
          { day: 'Tuesday', time: '2:00-3:30 PM', location: 'Room 203', dayOffset: 1 },
          { day: 'Thursday', time: '2:00-3:30 PM', location: 'Room 203', dayOffset: 3 }
        ])
      }))
    },
    {
      id: '3',
      name: 'Database Systems',
      schedule: 'Mon & Wed 2:00-3:30 PM',
      classes: Array.from({ length: 7 }, (_, i) => ({
        day: i % 2 === 0 ? 'Monday' : 'Wednesday',
        time: '2:00-3:30 PM',
        attended: Math.random() > 0.3,
        location: 'Room 305'
      })),
      weeklySchedule: Array.from({ length: 15 }, (_, i) => ({
        week: i + 1,
        topic: `Week ${i + 1}: ${i + 1 <= 5 ? 'SQL Fundamentals' : i + 1 <= 10 ? 'Database Design' : 'Performance Optimization'}`,
        classes: generateClassSchedule(i + 1, [
          { day: 'Monday', time: '2:00-3:30 PM', location: 'Room 305', dayOffset: 0 },
          { day: 'Wednesday', time: '2:00-3:30 PM', location: 'Room 305', dayOffset: 2 }
        ])
      }))
    },
    {
      id: '4',
      name: 'Computer Networks',
      schedule: 'Tue & Thu 10:00-11:30 AM',
      classes: Array.from({ length: 7 }, (_, i) => ({
        day: i % 2 === 0 ? 'Tuesday' : 'Thursday',
        time: '10:00-11:30 AM',
        attended: Math.random() > 0.3,
        location: 'Room 402'
      })),
      weeklySchedule: Array.from({ length: 15 }, (_, i) => ({
        week: i + 1,
        topic: `Week ${i + 1}: ${i + 1 <= 5 ? 'Network Protocols' : i + 1 <= 10 ? 'Network Security' : 'Advanced Topics'}`,
        classes: generateClassSchedule(i + 1, [
          { day: 'Tuesday', time: '10:00-11:30 AM', location: 'Room 402', dayOffset: 1 },
          { day: 'Thursday', time: '10:00-11:30 AM', location: 'Room 402', dayOffset: 3 }
        ])
      }))
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const handleCoursePress = (course) => {
    setSelectedCourse(course);
    setSelectedWeek(null);
    setModalVisible(true);
  };

  const renderWeekList = () => {
    if (!selectedCourse) return null;
    
    return (
      <SafeAreaView style={[styles.modalView, { backgroundColor: '#19204c' }]}>
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            onPress={() => {
              setModalVisible(false);
              setSelectedCourse(null);
              setSelectedWeek(null);
            }}
            style={styles.backButtonContainer}
          >
            <Text style={[styles.backButtonText, { color: 'white' }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: 'white' }]}>{selectedCourse.name}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.marksButton}
          onPress={() => {/* Navigate to marks sheet */}}
        >
          <Text style={styles.marksButtonText}>View Marks Sheet</Text>
        </TouchableOpacity>

        <ScrollView style={[styles.weekListContent, { paddingHorizontal: 20 }]}>
          <Text style={[styles.attendanceText, { color: '#c4a464', marginBottom: 15 }]}>
            Attended: {selectedCourse.classes.filter(c => c.attended).length}/{selectedCourse.classes.length} classes
          </Text>
          {selectedCourse.weeklySchedule.map((week) => (
            <TouchableOpacity 
              key={week.week} 
              onPress={() => setSelectedWeek(week)}
            >
              <Card containerStyle={[styles.weekCard, { 
                backgroundColor: '#2a3166',
                borderColor: '#c4a464',
                borderWidth: 2,
                padding: 15,
                marginHorizontal: 0
              }]}>
                <Text style={[styles.weekTitle, { color: 'white' }]}>Week {week.week}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };


  const renderProfileMenu = () => {
    return (
      <View style={styles.profileMenuContainer}>
        <TouchableOpacity 
          style={styles.profileMenuItem}
          onPress={() => {
            setProfileModalVisible(false);
            // Navigate to profile page
          }}
        >
          <Text style={styles.profileMenuText}>Your Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.profileMenuItem}
          onPress={() => {
            setProfileModalVisible(false);
            // Navigate to settings
          }}
        >
          <Text style={styles.profileMenuText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.profileMenuItem, styles.logoutMenuItem]}
          onPress={() => {
            setProfileModalVisible(false);
            navigation.navigate('Login');
          }}
        >
          <Text style={[styles.profileMenuText, styles.logoutMenuText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Text style={styles.headerTitle}>Welcome, Student!</Text>
      </View>

      <ScrollView 
        style={styles.coursesList}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={styles.subtitle}>Your registered courses:</Text>
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={handleCoursePress}
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: '#19204c' }]}>
          {selectedWeek ? (
            <WeeklySchedule 
              week={selectedWeek} 
              onClose={() => setSelectedWeek(null)}
            />
          ) : (
            renderWeekList()
          )}
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Icon name="calendar" type="feather" color="#c4a464" size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="settings" type="feather" color="#c4a464" size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Login')}
        >
          <Icon name="log-out" type="feather" color="#c4a464" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#19204c',
  },

  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  
    
  },

  headerTitle:{
    fontSize:24,
    fontWeight: '500',
    color:'white',
    textAlign:'center',

  },

  profileButton: {
    position: 'absolute',
    right: 20,
    padding: 10,
  },
  profileButtonText: {
    fontSize: 24,
    color: '#2196F3',
  },
  coursesList: {
    flex: 1,
    padding:20,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
    
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color:'white',

  },

  profileModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileModalContent: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileMenuContainer: {
    minWidth: 200,
  },
  profileMenuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  profileMenuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutMenuItem: {
    borderBottomWidth: 0,
  },
  logoutMenuText: {
    color: 'red',
  },
  courseCard: {
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#c4a464',
    borderWidth: 3, 
    backgroundColor: '#19204c', 
    
  },
  
  cardTitle: {
    fontSize: 16,
    color:'white',

  },
  cardText: {
    fontSize: 14,
    color:'white',

  },
  attendanceText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
  },
  modalView: {
    flex:1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  weekCard: {
    marginBottom: 10,
    borderRadius: 8,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weekTopic: {
    fontSize: 14,
  },
  weekScheduleContainer: {
    padding: 20,
  },
  classCard: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  classDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classTime: {
    fontSize: 14,
    color: '#666',
  },
  classLocation: {
    fontSize: 14,
    color: '#666',
  },
  classDetailsContainer: {
    padding: 20,
  },
  classTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#c4a464'

  },
  classInfo: {
    fontSize: 16,
    marginBottom: 5,
    color:'white'
  },
  attendanceButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  attendanceStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  backButton: {
    padding:20,
    marginTop: 20,
    backgroundColor: '#666',    
  },
  closeButton: {
    marginVertical: 20,
    backgroundColor: '#2196F3',
  },
  logoutButton: {
    backgroundColor: 'red',
    marginVertical: 20,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2a3166',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#c4a464',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavItem: {
    alignItems: 'center',
    padding: 10,
  },
  bottomNavText: {
    color: '#c4a464',
    marginTop: 5,
    fontSize: 12,
  },
  
  weekListContent: {
    flex: 1,
  },
  weekCard: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },

  weekHeaderContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weekHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c4a464',
    textAlign: 'center',
  },
  attendanceStatus: {
    fontSize: 14,
    color: '#c4a464', // Changed from #666 to #c4a464
    marginTop: 10,
    textAlign: 'center',
  },
  classCard: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#c4a464',
  },
  marksButton: {
    backgroundColor: '#c4a464',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  marksButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});