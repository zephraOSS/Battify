import { app, Notification } from "electron";

import * as path from "path";

export function sendNotification(title: string, body: string) {
    new Notification({
        title,
        body,
        icon: path.join(app.getAppPath(), "assets", "icon.png")
    }).show();
}
