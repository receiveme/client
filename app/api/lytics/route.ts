import { SuccessResponse } from "@/helpers/api/response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    return Response.json({ w: 1 });
}

export async function POST() {}

export async function PATCH() {}
