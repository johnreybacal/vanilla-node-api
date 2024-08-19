import { baseUrl } from "@/config/server";
import { Parameters } from "./route";

export function getUrlSegments(url: string) {
    const urlObj = new URL(url, baseUrl);
    return urlObj.pathname.split("/").filter((seg) => seg);
}

export function getParameters(urlSegments: string[]) {
    const params: Parameters = {};
    for (const segment of urlSegments.entries()) {
        if (segment[1].startsWith(":")) {
            params[segment[0]] = segment[1].substring(1);
        }
    }

    return params;
}
