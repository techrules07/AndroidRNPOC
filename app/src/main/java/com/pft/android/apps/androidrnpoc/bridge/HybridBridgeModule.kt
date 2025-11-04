package com.pft.android.apps.androidrnpoc.bridge

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.pft.android.apps.androidrnpoc.ReactNativeActivity

class HybridBridgeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = NAME

    @ReactMethod
    fun sendUsername(username: String?) {
        val activity = currentActivity as? ReactNativeActivity ?: return

        val resultData = Intent().apply {
            putExtra(ReactNativeActivity.EXTRA_USERNAME, username.orEmpty())
        }

        activity.setResult(Activity.RESULT_OK, resultData)
    }

    companion object {
        private const val NAME = "HybridBridge"
    }
}
