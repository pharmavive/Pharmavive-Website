import os
import ctypes
from ctypes import wintypes

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

CLSID_Png = (ctypes.c_byte * 16)(
    0xbf, 0xb5, 0x22, 0x55, 0x5e, 0x30, 0x1a, 0x10,
    0x3e, 0xab, 0x00, 0x00, 0xf8, 0x1e, 0xf3, 0x2e
)

out_dir = r"C:\Users\naman\Desktop\pharmavive-main\public\excel_structures"

for i in range(1, 5):
    emf_path = os.path.join(out_dir, f"image{i}.emf")
    png_path = os.path.join(out_dir, f"sheet_structure_{i}.png")
    
    metafile = ctypes.c_void_p()
    st = gdiplus.GdipCreateMetafileFromFile(ctypes.c_wchar_p(emf_path), ctypes.byref(metafile))
    if st != 0:
        print(f"Error loading {emf_path}: {st}")
        continue
    
    mf_w = ctypes.c_float()
    mf_h = ctypes.c_float()
    gdiplus.GdipGetImageDimension(metafile, ctypes.byref(mf_w), ctypes.byref(mf_h))
    
    aspect = mf_h.value / mf_w.value if mf_w.value > 0 else 1.0
    w = 800
    h = int(w * aspect)
    
    bitmap = ctypes.c_void_p()
    # 0x26200A = PixelFormat32bppARGB
    gdiplus.GdipCreateBitmapFromScan0(w, h, 0, 0x26200A, None, ctypes.byref(bitmap))
    
    graphics = ctypes.c_void_p()
    gdiplus.GdipGetImageGraphicsContext(bitmap, ctypes.byref(graphics))
    
    # 2 = SmoothingModeHighQuality, 7 = InterpolationModeHighQualityBicubic
    gdiplus.GdipSetSmoothingMode(graphics, 2)
    gdiplus.GdipSetInterpolationMode(graphics, 7)
    
    # Transparent background
    gdiplus.GdipGraphicsClear(graphics, 0x00000000)
    
    # Render metafile vector onto 800x(h) bitmap
    gdiplus.GdipDrawImageRectRectI(
        graphics, metafile,
        0, 0, w, h,
        0, 0, int(mf_w.value), int(mf_h.value),
        2, None, None, None
    )
    
    gdiplus.GdipSaveImageToFile(bitmap, ctypes.c_wchar_p(png_path), CLSID_Png, None)
    
    gdiplus.GdipDeleteGraphics(graphics)
    gdiplus.GdipDisposeImage(bitmap)
    gdiplus.GdipDisposeImage(metafile)
    print(f"Rendered vector EMF to PNG: {png_path} ({w}x{h})")

gdiplus.GdiplusShutdown(token)
