Add-Type -AssemblyName System.Drawing

1..4 | ForEach-Object {
    $i = $_
    $emfPath = "C:\Users\naman\Desktop\pharmavive-main\public\excel_structures\image$i.emf"
    $pngPath = "C:\Users\naman\Desktop\pharmavive-main\public\excel_structures\excel_structure_$i.png"
    
    $metafile = New-Object System.Drawing.Imaging.Metafile($emfPath)
    
    # Ultra crisp 6x resolution
    $scale = 6
    $w = [int]($metafile.Width * $scale)
    $h = [int]($metafile.Height * $scale)
    
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $bmp.SetResolution(300, 300)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($metafile, 0, 0, $w, $h)
    
    $bmp.Save($pngPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $bmp.Dispose()
    $metafile.Dispose()
    
    Write-Host "Created $pngPath ($w x $h)"
}
