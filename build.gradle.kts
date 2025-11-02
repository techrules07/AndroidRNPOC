// Top-level build file where you can add configuration options common to all sub-projects/modules.
import com.android.build.gradle.LibraryExtension
import java.io.File

plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
}

extra.apply {
    set("kotlinVersion", "2.0.21")
}