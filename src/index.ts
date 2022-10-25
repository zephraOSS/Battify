import { app } from "electron";
import { ServerManager } from "./managers/server";
import { TrayManager } from "./managers/tray";

import { init as initAutoUpdater } from "./managers/updater";
import { init as initAutoLaunch } from "./managers/autoLaunch";

app.on("ready", () => {
    new ServerManager();
    new TrayManager();

    initAutoUpdater();
    initAutoLaunch();
});
