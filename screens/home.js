import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const AppHome = props => {
    return (
        <View style={styles.container}>
            <Text>Restaurant Home</Text>
            <StatusBar style="auto" />
        </View>
    ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppHome;