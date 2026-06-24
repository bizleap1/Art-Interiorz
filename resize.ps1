Add-Type -AssemblyName System.Drawing

$dir = "d:\art interiroz\Art-Interiorz-main\artifacts\artz-interior\public\assets\portfolio\new"
$files = Get-ChildItem -Path $dir -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' }

foreach ($f in $files) {
    Write-Host "Processing $($f.Name)..."
    
    $image = $null
    try {
        $image = [System.Drawing.Image]::FromFile($f.FullName)
        
        if ($image.Width -gt 1000) {
            $newWidth = 1000
            $newHeight = [int]($image.Height * (1000.0 / $image.Width))
            
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
            Write-Host "Skipped $($f.Name)"
        }
    } catch {
        if ($image -ne $null) { $image.Dispose() }
        Write-Host "Error processing $($f.Name): $_"
    }
}
