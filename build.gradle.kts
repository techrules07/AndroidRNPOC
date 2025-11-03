// Top-level build file where you can add configuration options common to all sub-projects/modules.
import java.io.File

plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}

extra.apply {
    set("kotlinVersion", "2.0.21")
    set(
        "REACT_NATIVE_NODE_MODULES_DIR",
        System.getenv("REACT_NATIVE_NODE_MODULES_DIR") ?: File(rootDir, "reactnative/node_modules/react-native").absolutePath
    )
}