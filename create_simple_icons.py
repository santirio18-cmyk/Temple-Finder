#!/usr/bin/env python3
"""
Create simple temple-themed app icons for Android
This script creates PNG icons without requiring ImageMagick
"""

import os
from PIL import Image, ImageDraw, ImageFont
import math

def create_temple_icon(size):
    """Create a temple-themed icon of the specified size"""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Calculate scaling factor
    scale = size / 512.0
    
    # Background circle
    margin = int(20 * scale)
    bg_radius = (size - margin * 2) // 2
    bg_center = size // 2
    
    # Draw background circle with gradient effect
    for i in range(bg_radius):
        alpha = int(255 * (1 - i / bg_radius) * 0.8)
        color = (139, 69, 19, alpha)  # Brown with transparency
        draw.ellipse([bg_center - bg_radius + i, bg_center - bg_radius + i, 
                     bg_center + bg_radius - i, bg_center + bg_radius - i], 
                    fill=color)
    
    # Temple base
    base_width = int(272 * scale)
    base_height = int(60 * scale)
    base_x = (size - base_width) // 2
    base_y = int(350 * scale)
    
    # Draw temple base
    draw.rectangle([base_x, base_y, base_x + base_width, base_y + base_height], 
                  fill=(245, 222, 179), outline=(139, 69, 19), width=2)
    
    # Main entrance
    door_width = int(32 * scale)
    door_height = int(40 * scale)
    door_x = (size - door_width) // 2
    door_y = int(360 * scale)
    draw.rectangle([door_x, door_y, door_x + door_width, door_y + door_height], 
                  fill=(101, 67, 33), outline=(61, 41, 20))
    
    # Temple tiers
    tiers = [
        (140, 320, 232, 30),  # Tier 1
        (160, 290, 192, 30),  # Tier 2
        (180, 260, 152, 30),  # Tier 3
        (200, 230, 112, 30),  # Tier 4
        (220, 200, 72, 30),   # Tier 5
    ]
    
    for tier_x, tier_y, tier_w, tier_h in tiers:
        x = int(tier_x * scale)
        y = int(tier_y * scale)
        w = int(tier_w * scale)
        h = int(tier_h * scale)
        
        # Draw tier
        draw.rectangle([x, y, x + w, y + h], 
                      fill=(245, 222, 179), outline=(139, 69, 19), width=1)
        
        # Draw small domes on tier
        dome_size = max(2, int(8 * scale))
        for i in range(3):
            dome_x = x + (w // 4) + (i * w // 4) - dome_size // 2
            dome_y = y + h // 2 - dome_size // 2
            draw.ellipse([dome_x, dome_y, dome_x + dome_size, dome_y + dome_size], 
                        fill=(255, 255, 255), outline=(210, 180, 140))
    
    # Top dome
    dome_center_x = size // 2
    dome_center_y = int(180 * scale)
    dome_width = int(72 * scale)
    dome_height = int(40 * scale)
    
    draw.ellipse([dome_center_x - dome_width // 2, dome_center_y - dome_height // 2,
                 dome_center_x + dome_width // 2, dome_center_y + dome_height // 2],
                fill=(255, 255, 255), outline=(210, 180, 140), width=2)
    
    # Kalashas (finials)
    kalasha_size = max(2, int(6 * scale))
    for i, offset in enumerate([-16, 0, 16]):
        x = dome_center_x + int(offset * scale) - kalasha_size // 2
        y = dome_center_y - dome_height // 2 - kalasha_size
        draw.ellipse([x, y, x + kalasha_size, y + kalasha_size], 
                    fill=(139, 69, 19))
    
    # People figures
    person_size = max(2, int(8 * scale))
    person_y = int(380 * scale)
    colors = [(255, 107, 53), (78, 205, 196), (69, 183, 209), (150, 206, 180), (254, 202, 87)]
    
    for i, color in enumerate(colors):
        x = int(180 * scale) + (i * int(40 * scale))
        if x + person_size < size:
            # Person body
            draw.ellipse([x, person_y, x + person_size, person_y + person_size], 
                        fill=color)
            # Person legs
            draw.rectangle([x + person_size // 4, person_y + person_size, 
                          x + 3 * person_size // 4, person_y + person_size + person_size // 2], 
                         fill=(255, 255, 255))
    
    return img

def main():
    """Create all required icon sizes"""
    print("🏛️ Creating Temple Finder App Icons...")
    
    # Create directories
    directories = [
        'app/src/main/res/mipmap-ldpi',
        'app/src/main/res/mipmap-mdpi', 
        'app/src/main/res/mipmap-hdpi',
        'app/src/main/res/mipmap-xhdpi',
        'app/src/main/res/mipmap-xxhdpi',
        'app/src/main/res/mipmap-xxxhdpi'
    ]
    
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
    
    # Icon sizes for different densities
    sizes = {
        'ldpi': 36,
        'mdpi': 48,
        'hdpi': 72,
        'xhdpi': 96,
        'xxhdpi': 144,
        'xxxhdpi': 192
    }
    
    # Create icons
    for density, size in sizes.items():
        print(f"📱 Creating {density} icons ({size}x{size})...")
        
        # Create the icon
        icon = create_temple_icon(size)
        
        # Save both regular and round versions
        icon.save(f'app/src/main/res/mipmap-{density}/ic_launcher.png')
        icon.save(f'app/src/main/res/mipmap-{density}/ic_launcher_round.png')
    
    print("✅ All app icons created successfully!")
    print("📁 Icons saved to:")
    for directory in directories:
        print(f"   - {directory}/")

if __name__ == "__main__":
    try:
        main()
    except ImportError:
        print("❌ PIL (Pillow) not found. Installing...")
        os.system("pip3 install Pillow")
        print("✅ Pillow installed. Please run the script again.")
    except Exception as e:
        print(f"❌ Error creating icons: {e}")
        print("Please install Pillow: pip3 install Pillow")











