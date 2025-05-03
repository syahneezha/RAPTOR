const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let serverProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  // Jalankan server.js di latar belakang
  serverProcess = spawn('node', ['server.js'], { stdio: 'inherit' });
  setTimeout(createWindow, 1000); // beri jeda agar server siap
});

app.on('will-quit', () => {
  if (serverProcess) serverProcess.kill();
});
