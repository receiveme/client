import { SuccessResponse } from "@/helpers/api/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    return Response.json(SuccessResponse({ hello: "world" }));
}
