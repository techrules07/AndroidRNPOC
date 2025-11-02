import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

const ACCENT_COLOR = '#0F172A';

const App = () => (
  <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="light-content" backgroundColor={ACCENT_COLOR} />
    <View style={styles.container}>
      <Text style={styles.title}>Hello from React Native</Text>
      <Text style={styles.subtitle}>
        This screen is rendered by the JavaScript bundle. Use the Compose button in the
        native app to navigate here.
      </Text>
    </View>
  </SafeAreaView>
);

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
    fontSize: 26,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default App;

