import Store from "electron-store";

export const config = new Store({
    name: "config",
    defaults: {
        port: 9415,
        autoLaunch: true
    }
});
