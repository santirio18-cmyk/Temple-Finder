package com.example.base

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.webkit.*
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import androidx.webkit.WebSettingsCompat
import androidx.webkit.WebViewFeature
import androidx.compose.material3.ExperimentalMaterial3Api

class TempleFinderActivity : ComponentActivity() {
    
    companion object {
        private const val INITIAL_URL = "file:///android_asset/temple-finder/stable-app.html" // Stable Temple Finder app
        private const val MAIN_URL = "file:///android_asset/temple-finder/index.html" // Main React app
        private const val LOCATION_PERMISSION_REQUEST_CODE = 1001
        
        fun start(context: Context) {
            val intent = Intent(context, TempleFinderActivity::class.java)
            context.startActivity(intent)
        }
    }
    
    private var webView: WebView? = null
    private var onBackPressedCallback: OnBackPressedCallback? = null
    
    // Location permission launcher
    private val locationPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            // Permission granted, reload the page to enable geolocation
            webView?.reload()
        } else {
            // Permission denied, show a message or handle gracefully
            // The WebView will handle this in the geolocation callback
        }
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize and register the back pressed callback
        onBackPressedCallback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView?.canGoBack() == true) {
                    webView?.goBack()
                } else {
                    finish()
                }
            }
        }
        onBackPressedDispatcher.addCallback(this, onBackPressedCallback!!)
        
        setContent {
            MaterialTheme {
                TempleFinderScreen()
            }
        }
    }
    
    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    fun TempleFinderScreen() {
        val context = LocalContext.current
        var isLoading by remember { mutableStateOf(true) }

        Column(
            modifier = Modifier.fillMaxSize()
        ) {
            // Custom toolbar
            TopAppBar(
                title = { Text("Temple Finder") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )

            // WebView with overlay loading indicator
            Box(
                modifier = Modifier.fillMaxSize()
            ) {
                // WebView
                AndroidView(
                    factory = { context ->
                        WebView(context).apply {
                            this@TempleFinderActivity.webView = this
                            setupWebViewSettings()
                            setupWebViewClient()
                            setupWebChromeClient { 
                                // This lambda will be called when loading is finished
                                isLoading = false
                            }
                            // Load the local HTML file
                            loadUrl(INITIAL_URL)
                        }
                    },
                    modifier = Modifier.fillMaxSize()
                )

                // Loading indicator overlay
                if (isLoading) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(16.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator()
                    }
                }
            }
        }
    }
    
    
    @SuppressLint("SetJavaScriptEnabled")
    private fun WebView.setupWebViewSettings() {
        settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            loadWithOverviewMode = true
            useWideViewPort = true
            builtInZoomControls = true
            displayZoomControls = false
            setSupportZoom(true)
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            
            // FIXED: Enhanced settings for React app
            allowFileAccess = true
            allowContentAccess = true
            allowFileAccessFromFileURLs = true
            allowUniversalAccessFromFileURLs = true
            databaseEnabled = true
            
            // Enable modern web features
            if (WebViewFeature.isFeatureSupported(WebViewFeature.SAFE_BROWSING_ENABLE)) {
                WebSettingsCompat.setSafeBrowsingEnabled(this, true)
            }
            
            if (WebViewFeature.isFeatureSupported(WebViewFeature.ALGORITHMIC_DARKENING)) {
                WebSettingsCompat.setAlgorithmicDarkeningAllowed(this, true)
            }
            
            // FIXED: Additional settings for better React app support
            setRenderPriority(WebSettings.RenderPriority.HIGH)
            setPluginState(WebSettings.PluginState.ON)
            setLoadsImagesAutomatically(true)
            setBlockNetworkImage(false)
            setBlockNetworkLoads(false)
        }
    }
    
    private fun WebView.setupWebViewClient() {
        webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url.toString()

                // Validate URL for security
                if (!isValidUrl(url)) {
                    return false
                }

                // Handle external links
                when {
                    url.startsWith("tel:") -> {
                        val intent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
                        this@TempleFinderActivity.startActivity(intent)
                        return true
                    }
                    url.startsWith("mailto:") -> {
                        val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(url))
                        this@TempleFinderActivity.startActivity(intent)
                        return true
                    }
                    url.startsWith("http") && !url.contains("localhost") && !url.contains("127.0.0.1") -> {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        this@TempleFinderActivity.startActivity(intent)
                        return true
                    }
                }

                return false
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                println("🔍 WebView: Page finished loading: $url")
                
                // Check if we're on debug page and auto-redirect to main app after 3 seconds
                if (url?.contains("debug.html") == true) {
                    println("🔧 Debug page loaded, will redirect to main app in 3 seconds")
                    view?.loadUrl("javascript:(function() { " +
                        "console.log('🔧 Debug page loaded successfully'); " +
                        "setTimeout(function() { " +
                            "console.log('🔄 Redirecting to main app...'); " +
                            "window.location.href = 'index.html'; " +
                        "}, 3000); " +
                    "})();")
                } else if (url?.contains("index.html") == true) {
                    // Main app loaded, check if it's working
                    view?.loadUrl("javascript:(function() { " +
                        "console.log('🎉 Main Temple Finder app loaded'); " +
                        "if (document.getElementById('root')) { " +
                            "console.log('✅ React app root element found'); " +
                        "} else { " +
                            "console.log('❌ React app root element not found'); " +
                            "document.body.innerHTML = '<div style=\"padding:20px;text-align:center;\"><h1>🕉️ Temple Finder</h1><p>Loading React app...</p><p>If this persists, the React app may not be loading properly.</p></div>'; " +
                        "} " +
                    "})();")
                }
            }
            
            override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
                super.onReceivedError(view, request, error)
                println("❌ WebView Error: ${error?.description} - URL: ${request?.url}")
            }
        }
    }
    
    private fun isValidUrl(url: String): Boolean {
        return try {
            Uri.parse(url)
            true
        } catch (e: Exception) {
            false
        }
    }
    
    private fun WebView.setupWebChromeClient(onLoadingFinished: () -> Unit) {
        webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                println("📊 WebView Progress: $newProgress%")
                // Update loading state
                if (newProgress == 100) {
                    // Page finished loading
                    onLoadingFinished()
                }
            }
            
            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                val message = consoleMessage?.message() ?: ""
                val level = consoleMessage?.messageLevel()
                val sourceId = consoleMessage?.sourceId()
                
                when (level) {
                    ConsoleMessage.MessageLevel.ERROR -> println("❌ JS Error: $message ($sourceId)")
                    ConsoleMessage.MessageLevel.WARNING -> println("⚠️ JS Warning: $message")
                    ConsoleMessage.MessageLevel.LOG -> println("📝 JS Log: $message")
                    ConsoleMessage.MessageLevel.DEBUG -> println("🐛 JS Debug: $message")
                    else -> println("ℹ️ JS Info: $message")
                }
                return true
            }

            override fun onGeolocationPermissionsShowPrompt(
                origin: String?,
                callback: GeolocationPermissions.Callback?
            ) {
                // Check if we have location permission
                when {
                    ContextCompat.checkSelfPermission(
                        this@TempleFinderActivity,
                        Manifest.permission.ACCESS_FINE_LOCATION
                    ) == PackageManager.PERMISSION_GRANTED -> {
                        // Permission already granted
                        callback?.invoke(origin, true, false)
                    }
                    shouldShowRequestPermissionRationale(Manifest.permission.ACCESS_FINE_LOCATION) -> {
                        // Show rationale and request permission
                        callback?.invoke(origin, false, false)
                        locationPermissionLauncher.launch(Manifest.permission.ACCESS_FINE_LOCATION)
                    }
                    else -> {
                        // Request permission directly
                        callback?.invoke(origin, false, false)
                        locationPermissionLauncher.launch(Manifest.permission.ACCESS_FINE_LOCATION)
                    }
                }
            }
        }
    }
    
    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView?.saveState(outState)
    }
    
    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        webView?.restoreState(savedInstanceState)
    }
    
    override fun onDestroy() {
        webView?.let { webView ->
            // Remove WebView from its parent to prevent memory leaks
            (webView.parent as? android.view.ViewGroup)?.removeView(webView)
            
            // Clear WebView data and destroy
            webView.loadDataWithBaseURL(null, "", "text/html", "utf-8", null)
            webView.clearHistory()
            webView.clearCache(true)
            webView.clearFormData()
            webView.clearMatches()
            webView.clearSslPreferences()
            webView.destroy()
        }
        webView = null
        onBackPressedCallback?.remove()
        onBackPressedCallback = null
        super.onDestroy()
    }
}
