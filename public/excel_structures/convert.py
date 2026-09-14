import ctypes
from ctypes import wintypes
import os

# Alternatively use PIL or direct GDI+ via ctypes
# Let's test if PIL can open EMF directly
from PIL import Image

out_dir = r"C:\Users\naman\Desktop\pharmavive-main\public\excel_structures"
for i in range(1, 5):
    emf_file = os.path.join(out_dir, f"image{i}.emf")
    png_file = os.path.join(out_dir, f"structure_{i}.png")
    try:
        im = Image.open(emf_file)
        im.save(png_file)
        print(f"PIL saved {png_file}: {im.size}")
    except Exception as e:
        print(f"PIL failed on {emf_file}: {e}")
