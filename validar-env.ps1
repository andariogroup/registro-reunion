# Script de Validacion de Variables de Entorno
# Ejecutar desde PowerShell: .\validar-env.ps1

Write-Host ""
Write-Host "Validando Variables de Entorno..." -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor Cyan

if (Test-Path ".env.local") {
    Write-Host ""
    Write-Host "Archivo .env.local existe" -ForegroundColor Green
    
    $variablesRequeridas = @(
        "GOOGLE_SERVICE_ACCOUNT_EMAIL",
        "GOOGLE_PRIVATE_KEY",
        "GOOGLE_SHEET_ID",
        "NODE_ENV"
    )
    
    $variablesEncontradas = @{}
    $errores = @()
    
    Get-Content .env.local | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            $variablesEncontradas[$name] = $value
        }
    }
    
    Write-Host ""
    Write-Host "Variables encontradas:" -ForegroundColor Yellow
    
    foreach ($var in $variablesRequeridas) {
        Write-Host ""
        Write-Host "  Variable: $var" -ForegroundColor Cyan
        
        if ($variablesEncontradas.ContainsKey($var)) {
            $valor = $variablesEncontradas[$var]
            
            switch ($var) {
                "GOOGLE_SERVICE_ACCOUNT_EMAIL" {
                    if ($valor -match '@.*\.iam\.gserviceaccount\.com$') {
                        Write-Host "    Formato correcto" -ForegroundColor Green
                    } else {
                        Write-Host "    Debe terminar en .iam.gserviceaccount.com" -ForegroundColor Red
                        $errores += "${var}: Formato incorrecto"
                    }
                }
                
                "GOOGLE_PRIVATE_KEY" {
                    $ok = $true
                    if ($valor -match 'BEGIN PRIVATE KEY') {
                        Write-Host "    Contiene BEGIN PRIVATE KEY" -ForegroundColor Green
                    } else {
                        Write-Host "    Falta BEGIN PRIVATE KEY" -ForegroundColor Red
                        $errores += "${var}: Falta BEGIN PRIVATE KEY"
                        $ok = $false
                    }
                    if ($valor -match 'END PRIVATE KEY') {
                        Write-Host "    Contiene END PRIVATE KEY" -ForegroundColor Green
                    } else {
                        Write-Host "    Falta END PRIVATE KEY" -ForegroundColor Red
                        $errores += "${var}: Falta END PRIVATE KEY"
                        $ok = $false
                    }
                    if ($valor -match '\\n') {
                        Write-Host "    Contiene \n literales" -ForegroundColor Green
                    } else {
                        Write-Host "    Advertencia: Debe contener \n literales" -ForegroundColor Yellow
                    }
                    if ($valor -match '^".*"$') {
                        Write-Host "    Esta entre comillas dobles" -ForegroundColor Green
                    } else {
                        Write-Host "    Debe estar entre comillas dobles" -ForegroundColor Red
                        $errores += "${var}: Debe estar entre comillas dobles"
                    }
                }
                
                "GOOGLE_SHEET_ID" {
                    if ($valor -match '^[a-zA-Z0-9_-]+$') {
                        Write-Host "    Formato correcto" -ForegroundColor Green
                    } else {
                        Write-Host "    Formato incorrecto" -ForegroundColor Red
                        $errores += "${var}: Formato incorrecto"
                    }
                    if ($valor -match 'docs\.google\.com') {
                        Write-Host "    No debe ser una URL completa" -ForegroundColor Red
                        $errores += "${var}: No debe ser una URL, solo el ID"
                    }
                }
                
                "NODE_ENV" {
                    if ($valor -match '^(development|production)$') {
                        Write-Host "    Valor valido: $valor" -ForegroundColor Green
                    } else {
                        Write-Host "    Debe ser development o production" -ForegroundColor Red
                        $errores += "${var}: Valor invalido"
                    }
                }
            }
        } else {
            Write-Host "    Variable NO encontrada" -ForegroundColor Red
            $errores += "${var}: Variable faltante"
        }
    }
    
    Write-Host ""
    Write-Host ("=" * 50) -ForegroundColor Cyan
    Write-Host "Resumen de Validacion" -ForegroundColor Cyan
    Write-Host ("=" * 50) -ForegroundColor Cyan
    
    if ($errores.Count -eq 0) {
        Write-Host ""
        Write-Host "Todas las variables estan correctamente configuradas!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Puedes ejecutar 'npm run dev' para iniciar la aplicacion." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "Se encontraron $($errores.Count) error(es):" -ForegroundColor Red
        foreach ($error in $errores) {
            Write-Host "  - $error" -ForegroundColor Red
        }
        Write-Host ""
        Write-Host "Revisa el archivo .env.local y corrige los errores." -ForegroundColor Yellow
    }
    
} else {
    Write-Host ""
    Write-Host "Archivo .env.local NO existe" -ForegroundColor Red
    Write-Host ""
    Write-Host "Pasos para crear el archivo:" -ForegroundColor Yellow
    Write-Host '  1. Copia .env.example a .env.local' -ForegroundColor White
    Write-Host '  2. Completa las variables con tus credenciales' -ForegroundColor White
    Write-Host '  3. Ejecuta este script nuevamente para validar' -ForegroundColor White
}

Write-Host ""
