package com.pft.android.apps.androidrnpoc

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

    private val reactNativeHost: ReactNativeHost by lazy {
        object : ReactNativeHost(this) {
            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override fun getPackages(): List<ReactPackage> =
                listOf(MainReactPackage())

            override fun getJSMainModuleName(): String = "index"

            override fun getBundleAssetName(): String = "index.android.bundle"
        }
    }

    override fun getReactNativeHost(): ReactNativeHost = reactNativeHost

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
}
