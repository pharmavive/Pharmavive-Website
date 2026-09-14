import os
import ctypes
from ctypes import wintypes

# GDI+ rendering of EMF at high resolution
gdiplus = ctypes.windll.gdiplus

class GdiplusStartupInput(ctypes.Structure):
    _fields_ = [
        ('GdiplusVersion', wintypes.UINT),
        ('DebugEventCallback', ctypes.c_void_p),
        ('SuppressBackgroundThread', wintypes.BOOL),
        ('SuppressExternalCodecs', wintypes.BOOL)
    ]

token = ctypes.c_ulong()
startup_in = GdiplusStartupInput(1, None, False, False)
status = gdiplus.GdiplusStartup(ctypes.byref(token), ctypes.byref(startup_in), None)
print("GDI+ startup:", status)

CLSID_Png = (ctypes.c_byte * 16)(
    0xbf, 0xb5, 0x22, 0x55, 0x5e, 0x30, 0x1a, 0x10,
    0x3e, 0xab, 0x00, 0x00, 0xf8, 0x1e, 0xf3, 0x2e
)

out_dir = r"C:\Users\naman\Desktop\pharmavive-main\public\excel_structures"

for i in range(1, 5):
    emf_path = os.path.join(out_dir, f"image{i}.emf")
    png_path = os.path.join(out_dir, f"structure_crisp_{i}.png")
    
    # Load metafile
    metafile = ctypes.c_void_p()
    st = gdiplus.GdipCreateMetafileFromFile(ctypes.c_wchar_p(emf_path), ctypes.byref(metafile))
    if st != 0:
        print(f"Error loading {emf_path}: {st}")
        continue
    
    width = ctypes.c_float()
    height = ctypes.c_float()
    gdiplus.GdipGetImageDimension(metafile, ctypes.byref(width), ctypes.byref(height))
    
    scale = 4.0
    w = int(width.value * scale)
    h = int(height.value * scale)
    
    bitmap = ctypes.c_void_p()
    # PixelFormat32bppARGB = 0x26200A
    gdiplus.GdipCreateBitmapFromScan0(w, h, 0, 0x26200A, None, ctypes.byref(bitmap))
    
    graphics = ctypes.c_void_p()
    gdiplus.GdipGetImageGraphicsContext(bitmap, ctypes.byref(graphics))
    
    # SmoothingModeHighQuality = 2, InterpolationModeHighQualityBicubic = 7
    gdiplus.GdipSetSmoothingMode(graphics, 2)
    gdiplus.GdipSetInterpolationMode(graphics, 7)
    
    # Clear transparent
    gdiplus.GdipGraphicsClear(graphics, 0x00000000)
    
    # Draw metafile
    gdiplus.GdipDrawImageRectRectI(graphics, metafile, 0, 0, w, h, 0, 0, int(width.value), int(height.value), 2, None, None, None)
    
    # Save as PNG
    gdiplus.GdipSaveImageToFile(bitmap, ctypes.c_wchar_p(png_path), CLSID_Png, None)
    
    gdiplus.GdipDeleteGraphics(graphics)
    gdiplus.GdipDisposeImage(bitmap)
    gdiplus.GdipDisposeImage(metafile)
    print(f"Rendered crisp PNG: {png_path} ({w}x{h})")

gdiplus.GdiplusShutdown(token)
