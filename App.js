import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { MyContextControllerProvider } from './Store';
import MyRouter from './Router/MyRouter';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';


export default function App() {
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <MenuProvider>
          <MyRouter />
        </MenuProvider>
      </NavigationContainer>
    </MyContextControllerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
