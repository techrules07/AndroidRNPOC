pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "AndroidRNPOC"
include(":app")

include(":react-native-gesture-handler")
project(":react-native-gesture-handler").projectDir = file("reactnative/node_modules/react-native-gesture-handler/android")

include(":react-native-screens")
project(":react-native-screens").projectDir = file("reactnative/node_modules/react-native-screens/android")

include(":react-native-safe-area-context")
project(":react-native-safe-area-context").projectDir = file("reactnative/node_modules/react-native-safe-area-context/android")

include(":react-native-webview")
project(":react-native-webview").projectDir = file("reactnative/node_modules/react-native-webview/android")
 