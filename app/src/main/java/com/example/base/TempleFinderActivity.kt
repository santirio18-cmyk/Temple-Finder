package com.example.base

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.*
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.webkit.WebSettingsCompat
import androidx.webkit.WebViewFeature
import androidx.compose.material3.ExperimentalMaterial3Api

class TempleFinderActivity : ComponentActivity() {
    
    private lateinit var webView: WebView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            MaterialTheme {
                TempleFinderScreen()
            }
        }
    }
    
    @OptIn(ExperimentalMaterial3Api::class)
    @SuppressLint("SetJavaScriptEnabled")
    @Composable
    fun TempleFinderScreen() {
        val context = LocalContext.current
        
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
            
            // WebView
            AndroidView(
                factory = { context ->
                    WebView(context).apply {
                        webView = this
                        setupWebViewSettings()
                        setupWebViewClient()
                        setupWebChromeClient()
                        // Load the local HTML file
                        loadUrl("file:///android_asset/temple-finder/index.html")
                    }
                },
                modifier = Modifier.fillMaxSize()
            )
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
            
            // Enable modern web features
            if (WebViewFeature.isFeatureSupported(WebViewFeature.SAFE_BROWSING_ENABLE)) {
                WebSettingsCompat.setSafeBrowsingEnabled(this, true)
            }
            
            if (WebViewFeature.isFeatureSupported(WebViewFeature.ALGORITHMIC_DARKENING)) {
                WebSettingsCompat.setAlgorithmicDarkeningAllowed(this, true)
            }
        }
    }
    
    private fun WebView.setupWebViewClient() {
        webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url.toString()
                
                // Handle external links
                when {
                    url.startsWith("tel:") -> {
                        val intent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
                        context.startActivity(intent)
                        return true
                    }
                    url.startsWith("mailto:") -> {
                        val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(url))
                        context.startActivity(intent)
                        return true
                    }
                    url.startsWith("http") && !url.contains("localhost") && !url.contains("127.0.0.1") -> {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        context.startActivity(intent)
                        return true
                    }
                }
                
                return false
            }
            
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                // Inject JavaScript for better mobile experience
                view?.evaluateJavascript("""
                    // Add mobile-specific enhancements
                    document.addEventListener('DOMContentLoaded', function() {
                        // Add viewport meta tag if not present
                        if (!document.querySelector('meta[name="viewport"]')) {
                            const meta = document.createElement('meta');
                            meta.name = 'viewport';
                            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                            document.head.appendChild(meta);
                        }
                        
                        // Add mobile-specific CSS
                        const style = document.createElement('style');
                        style.textContent = `
                            body { 
                                -webkit-text-size-adjust: 100%;
                                -webkit-touch-callout: none;
                                -webkit-user-select: none;
                                user-select: none;
                            }
                            input, textarea, select { 
                                -webkit-user-select: text;
                                user-select: text;
                            }
                        `;
                        document.head.appendChild(style);
                    });
                """.trimIndent(), null)
            }
        }
    }
    
    private fun WebView.setupWebChromeClient() {
        webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                // You can show a progress bar here if needed
            }
            
            override fun onGeolocationPermissionsShowPrompt(
                origin: String?,
                callback: GeolocationPermissions.Callback?
            ) {
                // Grant location permission for temple finder
                callback?.invoke(origin, true, false)
            }
        }
    }
    
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
    
    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
    
    companion object {
        fun start(context: Context) {
            val intent = Intent(context, TempleFinderActivity::class.java)
            context.startActivity(intent)
        }
    }
}
