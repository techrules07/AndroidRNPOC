package com.pft.android.apps.androidrnpoc

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader
import com.pft.android.apps.androidrnpoc.bridge.HybridBridgePackage
import com.pft.android.apps.androidrnpoc.BuildConfig

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost by lazy(LazyThreadSafetyMode.NONE) {
        object : ReactNativeHost(this@MainApplication) {
            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override fun getPackages(): List<ReactPackage> =
                listOf(
                    MainReactPackage(),
                    HybridBridgePackage()
                )

            override fun getJSMainModuleName(): String = "index"

            override fun getBundleAssetName(): String = "index.android.bundle"
        }
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
}
