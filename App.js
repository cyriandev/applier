import 'react-native-gesture-handler'
import MainNavigator from './src/components/MainNavigator'
import AuthState from './src/context/auth/authState'

export default function App() {
  return (
    <AuthState>
      <MainNavigator />
    </AuthState>
  )
}
