import { Tray, Menu, app } from "electron";
import { ServerManager } from "./server";
import { config } from "./config";

import http from "http";

import * as path from "path";

export class TrayManager {
    private readonly tray: Tray;

    constructor() {
        this.tray = new Tray(
            path.join(app.getAppPath(), "assets", "icon@32.png")
        );

        this.tray.setToolTip("Battify");
        this.tray.setContextMenu(this.createContextMenu());

        app.on("before-quit", this.tray.destroy);
    }

    private createContextMenu() {
        const tray = this.tray;

        return Menu.buildFromTemplate([
            {
                label: app.isPackaged
                    ? "Battify "
                    : "Battify - DEV " + app.getVersion(),
                icon: path.join(app.getAppPath(), "assets/icon@18.png"),
                enabled: false
            },
            {
                label: `IP: ${ServerManager.ip}`,
                enabled: false
            },
            { type: "separator" },
            {
                label: "Send Test Notification",
                click() {
                    tray.closeContextMenu();

                    http.request({
                        host: ServerManager.ip,
                        port: config.get("port"),
                        method: "POST",
                        headers: {
                            device: "Test Device",
                            model: "Test Model",
                            battery: "100"
                        }
                    }).end();
                }
            },
            { type: "separator" },
            {
                label: "Restart",
                click() {
                    app.relaunch();
                    app.exit();
                }
            },
            {
                label: "Quit",
                click() {
                    app.exit();
                }
            }
        ]);
    }
}
