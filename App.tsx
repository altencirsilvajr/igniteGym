import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';

import { THEME} from './src/theme'
import { Loading } from '@components/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"default"}
        backgroundColor={"transparent"}
        translucent
      />

      {fontsLoaded ? <Routes/> : <Loading/>}
      </NativeBaseProvider>
    );
}