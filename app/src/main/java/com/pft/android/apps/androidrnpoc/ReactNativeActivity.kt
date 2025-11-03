package com.pft.android.apps.androidrnpoc

import com.facebook.react.ReactActivity

class ReactNativeActivity : ReactActivity() {

    override fun getMainComponentName(): String = REACT_COMPONENT_NAME

    companion object {
        private const val REACT_COMPONENT_NAME = "HybridScreen"
    }
}
