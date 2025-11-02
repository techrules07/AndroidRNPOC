// Top-level build file where you can add configuration options common to all sub-projects/modules.
import com.android.build.gradle.LibraryExtension
import java.io.File

plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}

extra.apply {
    set("compileSdkVersion", 36)
    set("targetSdkVersion", 36)
    set("minSdkVersion", 28)
    set("REACT_NATIVE_NODE_MODULES_DIR", File(rootDir, "reactnative/node_modules").absolutePath)
    set("kotlinVersion", libs.versions.kotlin.get())
}

subprojects {
    if (name in setOf(
            "react-native-gesture-handler",
            "react-native-screens",
            "react-native-safe-area-context",
            "react-native-webview"
        )
    ) {
        plugins.withId("com.android.library") {
            extensions.findByType(LibraryExtension::class.java)?.apply {
                compileSdk = 36
                defaultConfig {
                    minSdk = 28
                    targetSdk = 36
                }
            }
        }
    }
}