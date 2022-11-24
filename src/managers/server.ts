import { sendNotification } from "./notifications";
import { networkInterfaces } from "os";
import { config } from "./config";

import http from "http";

import * as log from "electron-log";

export class ServerManager {
    private server: http.Server;

    static ip: string;

    constructor() {
        this.server = http.createServer();
        ServerManager.ip = Object.values(networkInterfaces())
            .flat()
            .find((i) => i?.family === "IPv4" && !i?.internal)?.address;

        this.server.listen(config.get("port"), "0.0.0.0", () => {
            log.info(
                "[SERVER]",
                `Server is running on port ${config.get("port")}`
            );
            log.info("[SERVER]", "Siri Shortcut IP:", ServerManager.ip);
        });

        this.server.on("request", (req, res) => {
            res.end();

            const { device, model, battery } = req.headers;

            log.info("[RECEIVED]", device + " |", model + " |", battery + "%");

            if (!device || !model || !battery)
                return log.warn("[RECEIVED]", "Invalid request");

            sendNotification(
                `${device} Battery`,
                `Your ${model}'s battery is at ${battery}%`
            );
        });
    }
}
