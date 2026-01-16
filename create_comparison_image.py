#!/usr/bin/env python3
"""
Create side-by-side before/after comparison images for Google Ads
Google Ads compliant: NO text overlays
"""
from PIL import Image
import sys
import os

def create_comparison(before_path, after_path, output_path, max_width=1200, before_crop_offset=0):
    """
    Create a side-by-side comparison image

    Args:
        before_path: Path to the 'before' image
        after_path: Path to the 'after' image
        output_path: Path to save the comparison image
        max_width: Maximum width for the final image (Google Ads recommended)
        before_crop_offset: Vertical offset for before image (-100 to 100, negative = crop higher)
    """
    # Load images
    before_img = Image.open(before_path)
    after_img = Image.open(after_path)

    # Get original dimensions
    before_width, before_height = before_img.size
    after_width, after_height = after_img.size

    # Calculate target height (use the smaller height to maintain quality)
    target_height = min(before_height, after_height)

    # Resize images to same height while maintaining aspect ratio
    before_aspect = before_width / before_height
    after_aspect = after_width / after_height

    new_before_width = int(target_height * before_aspect)
    new_after_width = int(target_height * after_aspect)

    # For before image, apply center crop with offset if specified
    if before_crop_offset != 0:
        # Make before image 30% taller to allow room for cropping
        temp_height = int(target_height * 1.3)
        temp_width = int(temp_height * before_aspect)
        before_temp = before_img.resize((temp_width, temp_height), Image.LANCZOS)

        # Calculate crop offset (positive offset = crop lower/show more center, negative = crop higher)
        crop_height = target_height
        crop_width = int(crop_height * before_aspect)

        # Calculate vertical position (offset range: -100 to 100)
        max_crop_top = temp_height - crop_height
        center_crop_top = (temp_height - crop_height) // 2
        offset_pixels = int(max_crop_top * (before_crop_offset / 100))
        crop_top = max(0, min(max_crop_top, center_crop_top + offset_pixels))
        crop_bottom = crop_top + crop_height

        # Crop horizontally centered, vertically with offset
        crop_left = (temp_width - crop_width) // 2
        crop_right = crop_left + crop_width

        # Crop and resize to target dimensions
        before_cropped = before_temp.crop((crop_left, crop_top, crop_right, crop_bottom))
        before_resized = before_cropped.resize((new_before_width, target_height), Image.LANCZOS)
    else:
        before_resized = before_img.resize((new_before_width, target_height), Image.LANCZOS)

    after_resized = after_img.resize((new_after_width, target_height), Image.LANCZOS)

    # Calculate total width
    total_width = new_before_width + new_after_width

    # If total width exceeds max_width, scale down proportionally
    if total_width > max_width:
        scale_factor = max_width / total_width
        new_before_width = int(new_before_width * scale_factor)
        new_after_width = int(new_after_width * scale_factor)
        new_target_height = int(target_height * scale_factor)

        # IMPORTANT: Resize the ALREADY CROPPED images, don't start from originals!
        before_resized = before_resized.resize((new_before_width, new_target_height), Image.LANCZOS)
        after_resized = after_resized.resize((new_after_width, new_target_height), Image.LANCZOS)
        total_width = new_before_width + new_after_width
        target_height = new_target_height

    # Create new image with white background
    comparison = Image.new('RGB', (total_width, target_height), 'white')

    # Paste before image on left, after image on right
    comparison.paste(before_resized, (0, 0))
    comparison.paste(after_resized, (new_before_width, 0))

    # Save the comparison image
    comparison.save(output_path, 'JPEG', quality=90, optimize=True)

    print(f"Created: {output_path}")
    print(f"Dimensions: {total_width}x{target_height}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.1f} KB")

if __name__ == "__main__":
    if len(sys.argv) < 4 or len(sys.argv) > 5:
        print("Usage: python create_comparison_image.py <before_image> <after_image> <output_image> [offset]")
        print("  offset: Vertical crop offset for before image (-100 to 100, negative = crop higher)")
        sys.exit(1)

    before_path = sys.argv[1]
    after_path = sys.argv[2]
    output_path = sys.argv[3]
    offset = int(sys.argv[4]) if len(sys.argv) == 5 else 0

    create_comparison(before_path, after_path, output_path, before_crop_offset=offset)
