import config from "./config.json";
import {resolve} from "url";

const createUrl = (relative: string): string => resolve(config.apiBaseUrl, relative);

function toUrlEncoded(data: any, parent: string | null = null): string {
    if (data instanceof Date) {
        return parent + '=' + encodeURIComponent(data.toISOString());
    }

    if (data.constructor === Array) {
        return data.map((value: any, index: number) => {
            const arrayKey = parent != null ? `${parent}[${index}]` : `[${index}]`;
            return toUrlEncoded(value, arrayKey);
        }).join('&');
    }

    if (typeof data === "object") {
        return Object.keys(data).map(key => {
            const value = data[key];
            const objectKey = parent != null ? `${parent}.${key}` : key;
            return toUrlEncoded(value, objectKey);
        }).join('&');
    }

    return parent + '=' + encodeURIComponent(data);
}

const get = <TResponse>(relative: string): Promise<TResponse> => {
    const url = createUrl(relative);
    const fetchOptions: RequestInit = {
        headers: {
            'Accept': 'application/json'
        }
    };

    return fetch(url, fetchOptions).then(response => response.json());
};

const postFile = async (data?: any): Promise<string> => {
    const url = config.filesApi;
    const formData = new FormData();
    formData.append('data', data);

    const fetchOptions: RequestInit = {
        body: formData,
        method: 'POST'
    };

    return await fetch(url, fetchOptions).then(response => response.text());
};

export default { get, postFile };