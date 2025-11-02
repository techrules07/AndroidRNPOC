package com.pft.android.apps.androidrnpoc

import android.app.Application
import android.content.pm.ApplicationInfo
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost by lazy(LazyThreadSafetyMode.NONE) {
        object : ReactNativeHost(this@MainApplication) {
            override fun getUseDeveloperSupport(): Boolean =
                applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0

            override fun getPackages(): List<ReactPackage> =
                listOf(MainReactPackage())

            override fun getJSMainModuleName(): String = "index"

            override fun getBundleAssetName(): String = "index.android.bundle"
        }
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
}
