package com.pft.android.apps.androidrnpoc

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class ReactNativeActivity : ReactActivity() {

    override fun getMainComponentName(): String = REACT_COMPONENT_NAME

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun createRootView(): ReactRootView {
                return RNGestureHandlerEnabledRootView(this@ReactNativeActivity)
            }
        }
    }

    companion object {
        private const val REACT_COMPONENT_NAME = "HybridScreen"
    }
}
