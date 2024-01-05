import axios from "axios";
// import config from "../config.js";
import fs from "fs";
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
import { logDebug, logError, logWarn } from "./logging-helpers.js";

export function sendHeartbeat() {
    logDebug("heartbeat.js", "Sending heartbeat");
    axios
        .get(config.releaseMode === "release" ? config.status_heartbeat_link : config.test_heartbeat_link)
        .then((info) => {
            if (info.status >= 400) {
                logWarn("heartbeat.js", "Received error on status update");
                logError("heartbeat.js", info);
            }
            logDebug("heartbeat.js", "Received callback");
        })
        .catch((error) => {
            logError("heartbeat.js", error);
        });
}

setInterval(sendHeartbeat, 300_000);
