import java.io.File

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

// Provide React Native modules with the monorepo node_modules path and ABI list.
extensions.extraProperties.apply {
    set(
        "REACT_NATIVE_NODE_MODULES_DIR",
        File(rootDir, "reactnative/node_modules/react-native").canonicalPath
    )
    set("reactNativeArchitectures", "armeabi-v7a,x86,x86_64,arm64-v8a")
}

android {
    namespace = "com.pft.android.apps.androidrnpoc"
    compileSdk {
        version = release(36)
    }

    defaultConfig {
        applicationId = "com.pft.android.apps.androidrnpoc"
        minSdk = 28
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
        jniLibs {
            pickFirsts += listOf(
                "**/libc++_shared.so",
                "**/libfbjni.so",
                "**/libturbomodulejsijni.so",
                "**/libhermes.so"
            )
        }
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.facebook.react:react-android:0.73.5")
    implementation("com.facebook.react:hermes-android:0.73.5")
    implementation(project(":react-native-gesture-handler"))
    implementation(project(":react-native-screens"))
    implementation(project(":react-native-safe-area-context"))
    implementation(project(":react-native-webview"))

    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}