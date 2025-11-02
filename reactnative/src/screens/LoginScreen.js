import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequested, resetAuth} from '../store/slices/authSlice';

const ACCENT_COLOR = '#0F172A';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {status, user, error} = useSelector(state => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loading = status === 'loading';
  const succeeded = status === 'succeeded';
  const failed = status === 'failed';

  useEffect(() => {
    return () => dispatch(resetAuth());
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(loginRequested({username: username.trim(), password}));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue exploring the React Native module embedded inside
            the Compose app.
          </Text>

          <View style={styles.form}>
            <View>
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
                editable={!loading}
              />
            </View>

            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                secureTextEntry
                returnKeyType="done"
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              activeOpacity={0.85}
              onPress={handleLogin}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color={ACCENT_COLOR} />
              ) : (
                <Text style={styles.buttonText}>Log in</Text>
              )}
            </TouchableOpacity>

            {succeeded && (
              <View style={styles.feedbackSuccess}>
                <Text style={styles.feedbackTitle}>Login successful!</Text>
                <Text style={styles.feedbackBody}>
                  Signed in as{' '}
                  <Text style={styles.feedbackStrong}>
                    {user?.username || username || 'guest'}
                  </Text>
                  .
                </Text>
              </View>
            )}

            {failed && (
              <View style={styles.feedbackError}>
                <Text style={styles.feedbackTitle}>Login failed</Text>
                <Text style={styles.feedbackBody}>{error}</Text>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    maxWidth: 340,
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
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
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
    opacity: 0.7,
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  feedbackSuccess: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(34,197,94,0.12)',
  },
  feedbackError: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(248,113,113,0.12)',
  },
  feedbackTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  feedbackBody: {
    fontSize: 14,
    color: '#CBD5F5',
    lineHeight: 20,
  },
  feedbackStrong: {
    fontWeight: '700',
    color: '#F8FAFC',
  },
});

export default LoginScreen;

