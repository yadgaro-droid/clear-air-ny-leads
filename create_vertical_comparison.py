#!/usr/bin/env python3
"""
Create vertical (top/bottom) before/after comparison images for Google Ads
Before image on TOP, After image on BOTTOM
"""
from PIL import Image
import sys
import os

def create_vertical_comparison(before_path, after_path, output_path, max_height=1200):
    """
    Create a vertical (stacked) comparison image with before on top, after on bottom

    Args:
        before_path: Path to the 'before' image
        after_path: Path to the 'after' image
        output_path: Path to save the comparison image
        max_height: Maximum height for the final image
    """
    # Load images
    before_img = Image.open(before_path)
    after_img = Image.open(after_path)

    # Get original dimensions
    before_width, before_height = before_img.size
    after_width, after_height = after_img.size

    # Calculate target width (use the smaller width to maintain quality)
    target_width = min(before_width, after_width)

    # Resize images to same width while maintaining aspect ratio
    before_aspect = before_height / before_width
    after_aspect = after_height / after_width

    new_before_height = int(target_width * before_aspect)
    new_after_height = int(target_width * after_aspect)

    before_resized = before_img.resize((target_width, new_before_height), Image.LANCZOS)
    after_resized = after_img.resize((target_width, new_after_height), Image.LANCZOS)

    # Calculate total height
    total_height = new_before_height + new_after_height

    # If total height exceeds max_height, scale down proportionally
    if total_height > max_height:
        scale_factor = max_height / total_height
        target_width = int(target_width * scale_factor)
        new_before_height = int(new_before_height * scale_factor)
        new_after_height = int(new_after_height * scale_factor)

        before_resized = before_resized.resize((target_width, new_before_height), Image.LANCZOS)
        after_resized = after_resized.resize((target_width, new_after_height), Image.LANCZOS)
        total_height = new_before_height + new_after_height

    # Create new image with white background
    comparison = Image.new('RGB', (target_width, total_height), 'white')

    # Paste before image on top, after image on bottom
    comparison.paste(before_resized, (0, 0))
    comparison.paste(after_resized, (0, new_before_height))

    # Save the comparison image
    comparison.save(output_path, 'JPEG', quality=90, optimize=True)

    print(f"Created: {output_path}")
    print(f"Dimensions: {target_width}x{total_height}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.1f} KB")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python create_vertical_comparison.py <before_image> <after_image> <output_image>")
        sys.exit(1)

    before_path = sys.argv[1]
    after_path = sys.argv[2]
    output_path = sys.argv[3]

    create_vertical_comparison(before_path, after_path, output_path)
