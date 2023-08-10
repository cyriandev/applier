import 'react-native-gesture-handler'
import MainNavigator from './src/components/MainNavigator'
import AuthState from './src/context/auth/authState'
import ApplierState from './src/context/applier/applierState'

export default function App() {
  return (
    <AuthState>
      <ApplierState>
        <MainNavigator />
      </ApplierState>
    </AuthState>
  )
}
