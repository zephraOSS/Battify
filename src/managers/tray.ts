import { Tray, app } from "electron";

import * as path from "path";

export class TrayManager {
    private tray: Tray;

    constructor() {
        this.tray = new Tray(path.join(app.getAppPath(), "assets", "icon.png"));

        this.tray.setToolTip("Battify");
        this.tray.on("click", () => {
            app.quit();
        });

        app.on("before-quit", this.tray.destroy);
    }
}
