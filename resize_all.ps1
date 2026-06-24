Add-Type -AssemblyName System.Drawing

$dir = "d:\art interiroz\Art-Interiorz-main\artifacts\artz-interior\public\assets"
$files = Get-ChildItem -Path $dir -Recurse -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' }

foreach ($f in $files) {
    # Skip processing node_modules or something if accidentally caught, but we are in public/assets so it's fine.
    
    $image = $null
    try {
        $image = [System.Drawing.Image]::FromFile($f.FullName)
        
        # Only resize if width > 1200
        if ($image.Width -gt 1200) {
            Write-Host "Processing $($f.Name) (Width: $($image.Width))..."
            $newWidth = 1200
            $newHeight = [int]($image.Height * (1200.0 / $image.Width))
            
            $newImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $graphics = [System.Drawing.Graphics]::FromImage($newImage)
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
            $graphics.Dispose()
            
            $image.Dispose()
            
            $tempPath = "$($f.FullName).tmp"
            
            $codecInfo = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]75)
            
            $newImage.Save($tempPath, $codecInfo, $encoderParams)
            $newImage.Dispose()
            
            Remove-Item $f.FullName -Force
            Rename-Item $tempPath $f.Name
            Write-Host "Resized and saved $($f.Name)"
        } else {
            $image.Dispose()
        }
    } catch {
        if ($image -ne $null) { $image.Dispose() }
        Write-Host "Error processing $($f.Name): $_"
    }
}
