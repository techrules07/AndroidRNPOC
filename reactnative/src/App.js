import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from './store/authSlice';

const ACCENT_COLOR = '#0F172A';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {status, user, error} = useSelector(state => state.auth);

  const isLoading = status === 'loading';
  const hasSucceeded = status === 'succeeded';
  const isDisabled = isLoading || username.trim().length === 0 || password.length === 0;

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    dispatch(loginRequest({username: trimmedUsername, password}));
  };

  useEffect(() => {
    if (hasSucceeded) {
      setPassword('');
    }
  }, [hasSucceeded]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={ACCENT_COLOR} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue to the React Native view.</Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="you@example.com"
              placeholderTextColor="#94A3B8"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              returnKeyType="done"
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isDisabled && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isDisabled}
            activeOpacity={0.85}>
            {isLoading ? (
              <ActivityIndicator color="#0F172A" />
            ) : (
              <Text style={styles.buttonText}>Log in</Text>
            )}
          </TouchableOpacity>

          {error && (
            <View style={styles.feedbackError}>
              <Text style={styles.feedbackLabel}>Authentication failed</Text>
              <Text style={styles.feedbackErrorText}>{error}</Text>
            </View>
          )}

          {hasSucceeded && (
            <View style={styles.feedback}>
              <Text style={styles.feedbackLabel}>Authenticated as</Text>
              <Text style={styles.feedbackValue}>
                {user?.username || user?.email || 'Successfully authenticated'}
              </Text>
            </View>
          )}
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
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    maxWidth: 320,
  },
  form: {
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingVertical: 26,
    paddingHorizontal: 24,
    gap: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#CBD5F5',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
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
    marginTop: 6,
    backgroundColor: '#38BDF8',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  feedback: {
    marginTop: 14,
    backgroundColor: 'rgba(56,189,248,0.12)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  feedbackLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A5B4FC',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  feedbackValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  feedbackError: {
    marginTop: 14,
    backgroundColor: 'rgba(248,113,113,0.12)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  feedbackErrorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FCA5A5',
  },
});

export default App;

