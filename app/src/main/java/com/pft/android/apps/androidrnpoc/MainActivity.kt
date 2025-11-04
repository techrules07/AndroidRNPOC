package com.pft.android.apps.androidrnpoc

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.text.input.ImeAction
import com.pft.android.apps.androidrnpoc.ui.theme.AndroidRNPOCTheme

class MainActivity : ComponentActivity() {

    private val usernameState = mutableStateOf("")

    private val reactNativeLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val returnedUsername =
                    result.data?.getStringExtra(ReactNativeActivity.EXTRA_USERNAME)
                if (returnedUsername != null) {
                    usernameState.value = returnedUsername
                }
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        if (savedInstanceState != null) {
            usernameState.value = savedInstanceState.getString(KEY_USERNAME).orEmpty()
        }
        setContent {
            AndroidRNPOCTheme {
                val username by usernameState
                HomeScreen(
                    username = username,
                    onUsernameChange = { usernameState.value = it },
                    onNavigateToReactNative = { trimmedUsername ->
                        usernameState.value = trimmedUsername
                        reactNativeLauncher.launch(
                            Intent(this, ReactNativeActivity::class.java).apply {
                                putExtra(ReactNativeActivity.EXTRA_USERNAME, trimmedUsername)
                            }
                        )
                    }
                )
            }
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putString(KEY_USERNAME, usernameState.value)
    }

    companion object {
        private const val KEY_USERNAME = "key_username"
    }
}

@Composable
fun HomeScreen(
    username: String,
    onUsernameChange: (String) -> Unit,
    onNavigateToReactNative: (String) -> Unit
) {
    val trimmedUsername = username.trim()
    val isLaunchEnabled = trimmedUsername.isNotEmpty()

    Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 24.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Welcome to AndroidRNPOC",
                style = MaterialTheme.typography.headlineMedium
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Tap below to open the React Native experience.",
                style = MaterialTheme.typography.bodyMedium
            )
            Spacer(modifier = Modifier.height(32.dp))
            OutlinedTextField(
                value = username,
                onValueChange = onUsernameChange,
                modifier = Modifier.fillMaxWidth(),
                label = { Text(text = "Username") },
                singleLine = true,
                keyboardOptions = KeyboardOptions.Default.copy(imeAction = ImeAction.Done)
            )
            Spacer(modifier = Modifier.height(24.dp))
            Button(
                onClick = { onNavigateToReactNative(trimmedUsername) },
                enabled = isLaunchEnabled,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(text = "Open React Native Screen")
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun HomeScreenPreview() {
    AndroidRNPOCTheme {
        HomeScreen(
            username = "",
            onUsernameChange = {},
            onNavigateToReactNative = {}
        )
    }
}

