'use strict';

const path = require('path');
const electron = require('electron');

const {app, BrowserWindow} = electron;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1024, height: 768});

  mainWindow.loadURL(`file://${path.join(path.dirname(__dirname), 'build')}/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
