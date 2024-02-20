export type PayloadType =
    | "visit"
    | "device"
    | "tz"
    | "scroll"
    | "click"
    | "copy"
    | "qr"
    | "exit";

export type PayloadStringData = string;
export type PayloadNumberData = number;
export type PayloadCustomData = string;

export type AnalyticsPayload = {
    p: PayloadType;

    s?: PayloadStringData;

    n?: PayloadNumberData;

    c?: PayloadCustomData;
};
