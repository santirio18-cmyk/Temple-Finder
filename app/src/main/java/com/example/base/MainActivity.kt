package com.example.base

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.base.ui.theme.BaseTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BaseTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    TempleFinderLauncher(
                        modifier = Modifier.padding(innerPadding),
                        onLaunchTempleFinder = {
                            TempleFinderActivity.start(this)
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun TempleFinderLauncher(
    modifier: Modifier = Modifier,
    onLaunchTempleFinder: () -> Unit
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // App Icon
        Card(
            modifier = Modifier
                .size(120.dp)
                .padding(bottom = 32.dp),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFFF9933) // Deep Saffron
            )
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "🕉️",
                    fontSize = 48.sp
                )
            }
        }
        
        // App Title
        Text(
            text = "Temple Finder",
            fontSize = 32.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF2D3748),
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        
        // Subtitle
        Text(
            text = "Discover Sacred Places",
            fontSize = 18.sp,
            color = Color(0xFF718096),
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(bottom = 32.dp)
        )
        
        // Description
        Text(
            text = "Find temples, explore deities, and plan your spiritual journey with AI-powered search and detailed temple information.",
            fontSize = 16.sp,
            color = Color(0xFF4A5568),
            textAlign = TextAlign.Center,
            lineHeight = 24.sp,
            modifier = Modifier.padding(bottom = 48.dp)
        )
        
        // Launch Button
        Button(
            onClick = onLaunchTempleFinder,
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFFF9933) // Deep Saffron
            )
        ) {
            Text(
                text = "Launch Temple Finder",
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
        }
        
        // Features
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 32.dp),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(0xFFF7FAFC)
            )
        ) {
            Column(
                modifier = Modifier.padding(20.dp)
            ) {
                Text(
                    text = "Features",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF2D3748),
                    modifier = Modifier.padding(bottom = 16.dp)
                )
                
                val features = listOf(
                    "🔍 AI-Powered Search",
                    "📍 Location-Based Discovery", 
                    "⏰ Real-Time Timings",
                    "👥 Crowd Level Tracking",
                    "❤️ Save Favorites",
                    "📱 PWA Experience"
                )
                
                features.forEach { feature ->
                    Text(
                        text = feature,
                        fontSize = 14.sp,
                        color = Color(0xFF4A5568),
                        modifier = Modifier.padding(vertical = 4.dp)
                    )
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun TempleFinderLauncherPreview() {
    BaseTheme {
        TempleFinderLauncher(
            onLaunchTempleFinder = {}
        )
    }
}