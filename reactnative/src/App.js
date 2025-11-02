import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ACCENT_COLOR = '#0F172A';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = () => {
    setSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={ACCENT_COLOR} />
      <View style={styles.container}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>
          Enter your credentials below to access the React Native experience.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="you@example.com"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="????????"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            secureTextEntry
            returnKeyType="done"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          {submitted ? (
            <Text style={styles.helper}>
              Submitted as <Text style={styles.helperStrong}>{username || 'guest'}</Text>
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ACCENT_COLOR,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  form: {
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5F5',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  input: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#F8FAFC',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#38BDF8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  helper: {
    marginTop: 16,
    color: '#CBD5F5',
    fontSize: 14,
    textAlign: 'center',
  },
  helperStrong: {
    fontWeight: '700',
    color: '#F8FAFC',
  },
});

export default App;

