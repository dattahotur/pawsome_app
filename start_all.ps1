$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User')

Write-Host "Booting API Gateway..."
cd api-gateway
npm install
Start-Process powershell -ArgumentList "-Title `'API Gateway`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../user-service
Write-Host "Booting User Service..."
npm install
Start-Process powershell -ArgumentList "-Title `'User Service`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../pet-service
Write-Host "Booting Pet Service..."
npm install
Start-Process powershell -ArgumentList "-Title `'Pet Service`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../booking-service
Write-Host "Booting Booking Service..."
npm install
Start-Process powershell -ArgumentList "-Title `'Booking Service`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../notification-service
Write-Host "Booting Notification Service..."
npm install
Start-Process powershell -ArgumentList "-Title `'Notification Service`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm start`""

cd ../frontend
Write-Host "Booting Frontend..."
npm install
Start-Process powershell -ArgumentList "-Title `'React Frontend`' -NoExit -Command `"`$env:Path = [System.Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('Path','User'); npm run dev`""
cd ..

Write-Host "All services have been started in new terminal windows!"
