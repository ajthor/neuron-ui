'use strict';
const electron = require('electron');
const fs = require('fs');
const path = require('path');

const {app} = electron;

const {BrowserWindow} = electron;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL(`file://${path.join(path.dirname(__dirname), 'static')}/index.html`);

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
