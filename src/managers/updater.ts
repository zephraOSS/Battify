import { app } from "electron";
import { autoUpdater } from "electron-updater";

import * as log from "electron-log";

export function init() {
    if (!app.isPackaged) return;

    checkForUpdates();

    setInterval(checkForUpdates, 1.8e6);

    log.info("[UPDATER] AutoUpdater initialized");
}

export function checkForUpdates() {
    log.log("[UPDATER]", "Checking for Updates...");

    autoUpdater.checkForUpdatesAndNotify();
}
