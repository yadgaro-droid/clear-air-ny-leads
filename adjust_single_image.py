#!/usr/bin/env python3
"""
Adjust vertical crop position of a single image
"""
from PIL import Image
import sys
import os

def adjust_image_crop(input_path, output_path, vertical_offset=0):
    """
    Adjust vertical crop position of an image

    Args:
        input_path: Path to input image
        output_path: Path to save adjusted image
        vertical_offset: Vertical offset (-100 to 100)
                        Positive = show more center/bottom (crop from top)
                        Negative = show more top (crop from bottom)
    """
    # Load image
    img = Image.open(input_path)
    original_width, original_height = img.size

    if vertical_offset == 0:
        # No adjustment, just copy
        img.save(output_path, 'JPEG', quality=95, optimize=True)
        print(f"No adjustment - copied: {output_path}")
        return

    # Make image 30% taller to allow room for cropping
    temp_height = int(original_height * 1.3)
    temp_width = int(original_width * (temp_height / original_height))
    img_temp = img.resize((temp_width, temp_height), Image.LANCZOS)

    # Calculate crop position
    crop_height = original_height
    crop_width = original_width

    max_crop_top = temp_height - crop_height
    center_crop_top = (temp_height - crop_height) // 2
    offset_pixels = int(max_crop_top * (vertical_offset / 100))
    crop_top = max(0, min(max_crop_top, center_crop_top + offset_pixels))
    crop_bottom = crop_top + crop_height

    # Crop horizontally centered, vertically with offset
    crop_left = (temp_width - crop_width) // 2
    crop_right = crop_left + crop_width

    # Crop and resize back to original dimensions
    img_cropped = img_temp.crop((crop_left, crop_top, crop_right, crop_bottom))
    img_final = img_cropped.resize((original_width, original_height), Image.LANCZOS)

    # Save
    img_final.save(output_path, 'JPEG', quality=95, optimize=True)

    print(f"Adjusted with offset {vertical_offset}: {output_path}")
    print(f"Dimensions: {original_width}x{original_height}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.1f} KB")

if __name__ == "__main__":
    if len(sys.argv) < 3 or len(sys.argv) > 4:
        print("Usage: python adjust_single_image.py <input_image> <output_image> [offset]")
        print("  offset: Vertical crop offset (-100 to 100)")
        print("          Positive = show more center (crop top)")
        print("          Negative = show more top (crop bottom)")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]
    offset = int(sys.argv[3]) if len(sys.argv) == 4 else 0

    adjust_image_crop(input_path, output_path, offset)
