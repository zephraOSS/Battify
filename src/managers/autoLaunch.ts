import { app } from "electron";
import { config } from "./config";

import AutoLaunch from "auto-launch";

import * as log from "electron-log";

export function init() {
    if (!app.isPackaged) return;

    const launcher = new AutoLaunch({
        name: "Battify"
    });

    launcher.isEnabled().then(function (isEnabled) {
        if (config.get("autoLaunch") && !isEnabled) {
            launcher.enable();
            log.info("[AUTOLAUNCH]", "Enabled");
        } else if (!config.get("autoLaunch") && isEnabled) {
            launcher.disable();
            log.info("[AUTOLAUNCH]", "Disabled");
        }
    });
}
