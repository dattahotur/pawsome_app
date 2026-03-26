$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

Write-Host "Re-Booting API Gateway..."
cd api-gateway
Start-Process powershell -ArgumentList "-Title `'API Gateway`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../user-service
Write-Host "Re-Booting User Service..."
Start-Process powershell -ArgumentList "-Title `'User Service`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../pet-service
Write-Host "Re-Booting Pet Service..."
Start-Process powershell -ArgumentList "-Title `'Pet Service`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../booking-service
Write-Host "Re-Booting Booking Service..."
Start-Process powershell -ArgumentList "-Title `'Booking Service`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../notification-service
Write-Host "Re-Booting Notification Service..."
Start-Process powershell -ArgumentList "-Title `'Notification Service`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ..
Write-Host "All backend services have been RE-STARTED in new terminal windows!"
