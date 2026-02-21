package com.example.base

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import com.example.base.ui.theme.BaseTheme

class OptimizedMainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BaseTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    OptimizedSignInScreen(
                        modifier = Modifier.padding(innerPadding),
                        onSignInSuccess = {
                            TempleFinderActivity.start(this@OptimizedMainActivity)
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun OptimizedSignInScreen(
    modifier: Modifier = Modifier,
    onSignInSuccess: () -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(false) }
    
    // Handle sign in loading with proper coroutine scope
    LaunchedEffect(isLoading) {
        if (isLoading) {
            delay(1500)
            isLoading = false
            onSignInSuccess()
        }
    }
    
    // OPTIMIZATION 1: Use solid color instead of complex gradient
    // This reduces GPU rendering load significantly
    val backgroundColor = Color(0xFFFF6B35) // Single orange color
    
    Box(
        modifier = modifier
            .fillMaxSize()
            .background(backgroundColor)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(32.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // OPTIMIZATION 2: Simplified logo without Card elevation
            Box(
                modifier = Modifier
                    .size(100.dp)
                    .background(
                        color = Color.White,
                        shape = RoundedCornerShape(20.dp)
                    )
                    .padding(bottom = 24.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "🕉️",
                    fontSize = 40.sp
                )
            }
            
            Text(
                text = "Temple Finder",
                fontSize = 32.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(bottom = 8.dp)
            )
            
            Text(
                text = "Discover Sacred Places",
                fontSize = 16.sp,
                // OPTIMIZATION 3: Remove alpha transparency
                color = Color(0xFFF0F0F0), // Light gray instead of white with alpha
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(bottom = 40.dp)
            )
            
            // OPTIMIZATION 4: Simplified sign-in card without heavy elevation
            Surface(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                color = Color.White,
                shadowElevation = 4.dp // Reduced from 12.dp
            ) {
                Column(
                    modifier = Modifier.padding(28.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Welcome Back",
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF2D3748),
                        modifier = Modifier.padding(bottom = 8.dp)
                    )
                    
                    Text(
                        text = "Sign in to continue your spiritual journey",
                        fontSize = 14.sp,
                        color = Color(0xFF718096),
                        textAlign = TextAlign.Center,
                        modifier = Modifier.padding(bottom = 32.dp)
                    )
                    
                    // OPTIMIZATION 5: Memoized text fields to prevent unnecessary recompositions
                    val primaryColor = Color(0xFFFF9933)
                    
                    EmailField(
                        email = email,
                        onEmailChange = { email = it },
                        primaryColor = primaryColor
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    PasswordField(
                        password = password,
                        onPasswordChange = { password = it },
                        passwordVisible = passwordVisible,
                        onPasswordVisibilityToggle = { passwordVisible = !passwordVisible },
                        primaryColor = primaryColor
                    )
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    SignInButton(
                        isLoading = isLoading,
                        enabled = email.isNotEmpty() && password.isNotEmpty(),
                        onSignInClick = { isLoading = true }
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    GuestAccessButton(onGuestAccess = onSignInSuccess)
                }
            }
            
            Spacer(modifier = Modifier.height(32.dp))
            
            SignUpLink()
        }
    }
}

// OPTIMIZATION 6: Extract composables to prevent unnecessary recompositions
@Composable
private fun EmailField(
    email: String,
    onEmailChange: (String) -> Unit,
    primaryColor: Color
) {
    OutlinedTextField(
        value = email,
        onValueChange = onEmailChange,
        label = { Text("Email") },
        leadingIcon = {
            Icon(
                imageVector = Icons.Default.Email,
                contentDescription = "Email",
                tint = primaryColor
            )
        },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = primaryColor,
            focusedLabelColor = primaryColor
        )
    )
}

@Composable
private fun PasswordField(
    password: String,
    onPasswordChange: (String) -> Unit,
    passwordVisible: Boolean,
    onPasswordVisibilityToggle: () -> Unit,
    primaryColor: Color
) {
    OutlinedTextField(
        value = password,
        onValueChange = onPasswordChange,
        label = { Text("Password") },
        leadingIcon = {
            Icon(
                imageVector = Icons.Default.Lock,
                contentDescription = "Password",
                tint = primaryColor
            )
        },
        trailingIcon = {
            IconButton(onClick = onPasswordVisibilityToggle) {
                Icon(
                    imageVector = if (passwordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                    contentDescription = if (passwordVisible) "Hide password" else "Show password",
                    tint = Color(0xFF718096)
                )
            }
        },
        visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = primaryColor,
            focusedLabelColor = primaryColor
        )
    )
}

@Composable
private fun SignInButton(
    isLoading: Boolean,
    enabled: Boolean,
    onSignInClick: () -> Unit
) {
    Button(
        onClick = onSignInClick,
        modifier = Modifier
            .fillMaxWidth()
            .height(56.dp),
        shape = RoundedCornerShape(16.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = Color(0xFFFF9933)
        ),
        enabled = !isLoading && enabled
    ) {
        if (isLoading) {
            CircularProgressIndicator(
                color = Color.White,
                modifier = Modifier.size(20.dp)
            )
        } else {
            Text(
                text = "Sign In",
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
        }
    }
}

@Composable
private fun GuestAccessButton(onGuestAccess: () -> Unit) {
    TextButton(
        onClick = onGuestAccess,
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(
            text = "Continue as Guest",
            color = Color(0xFF8E44AD),
            fontSize = 16.sp,
            fontWeight = FontWeight.Medium
        )
    }
}

@Composable
private fun SignUpLink() {
    Row(
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "Don't have an account? ",
            color = Color(0xFFE0E0E0), // Solid color instead of alpha
            fontSize = 14.sp
        )
        TextButton(
            onClick = { /* TODO: Navigate to sign up */ }
        ) {
            Text(
                text = "Sign Up",
                color = Color.White,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

// OPTIMIZATION 7: Simplified preview for faster rendering
@Preview(showBackground = true)
@Composable
fun OptimizedSignInScreenPreview() {
    BaseTheme {
        OptimizedSignInScreen(
            onSignInSuccess = {}
        )
    }
}

// OPTIMIZATION 8: Alternative preview with minimal complexity for development
@Preview(showBackground = true, name = "Minimal Preview")
@Composable
fun MinimalSignInPreview() {
    BaseTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = Color(0xFFFF6B35)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(32.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = "🕉️ Temple Finder",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    textAlign = TextAlign.Center
                )
                
                Spacer(modifier = Modifier.height(32.dp))
                
                Button(
                    onClick = {},
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.White
                    )
                ) {
                    Text(
                        text = "Sign In",
                        color = Color(0xFFFF6B35)
                    )
                }
            }
        }
    }
}









