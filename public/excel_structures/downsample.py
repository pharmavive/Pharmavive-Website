import os
from PIL import Image

out_dir = r"C:\Users\naman\Desktop\pharmavive-main\public\excel_structures"

for i in range(1, 5):
    # We can load the super-crisp GDI+ PNG and resize it down to 800px with high-quality LANCZOS resampling!
    crisp_path = os.path.join(out_dir, f"structure_crisp_{i}.png")
    final_path = os.path.join(out_dir, f"structure_{i}.png")
    
    if os.path.exists(crisp_path):
        im = Image.open(crisp_path)
        w, h = im.size
        target_w = 800
        target_h = int(h * (target_w / w))
        im_resized = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
        im_resized.save(final_path, format="PNG", optimize=True)
        print(f"Downsampled {crisp_path} ({w}x{h}) -> {final_path} ({target_w}x{target_h})")
        # Remove huge temporary file
        os.remove(crisp_path)
