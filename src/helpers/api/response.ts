export function SuccessResponse(response?: Record<string, any>) {
    return {
        success: true,
        ...(response ?? {}),
        timestamp: Math.floor(new Date().getTime() / 1000),
    };
}

export function ErrorResponse(
    message: Record<string, any>,
    status: number = 500,
) {
    return {
        success: false,
        message,
        status,
        timestamp: Math.floor(new Date().getTime() / 1000),
    };
}
