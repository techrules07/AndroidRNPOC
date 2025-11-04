package com.pft.android.apps.androidrnpoc

import android.app.Activity
import android.os.Bundle
import androidx.core.os.bundleOf
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate

class ReactNativeActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setResult(Activity.RESULT_CANCELED)
    }

    override fun getMainComponentName(): String = REACT_COMPONENT_NAME

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        object : ReactActivityDelegate(this, mainComponentName) {
            override fun getLaunchOptions(): Bundle? {
                val normalizedUsername = this@ReactNativeActivity.intent
                    ?.getStringExtra(EXTRA_USERNAME)
                    ?.takeIf { it.isNotBlank() }
                    ?: return null

                return bundleOf(PROP_USERNAME to normalizedUsername)
            }
        }

    companion object {
        private const val REACT_COMPONENT_NAME = "HybridScreen"
        const val EXTRA_USERNAME = "extra_username"
        const val PROP_USERNAME = "prefillUsername"
    }
}
