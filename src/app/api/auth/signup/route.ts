import dbConnect from "@/src/lib/db/mongodb";
import User from "@/src/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const userData = await request.json();

    if (!userData.email || !userData.username || !userData.password) {
        return NextResponse.json({ error: 'User data incomplete', status: 500 })
    }

    try {
        await dbConnect();
    } catch (err) {
        console.log('ERROR on POST /auth/signup (connecting database): ' + err)
        return NextResponse.json({ error: 'Cannot create user. Please try later.', status: 500 })
    }

    try {
        const user = await User.insertOne(userData);

        return NextResponse.json({
            username: user.username,
            email: user.email,
            discogs: user.discogs
        });
    } catch (err) {
        console.log('ERROR on POST /auth/signup (creating user): ' + err)
        return NextResponse.json({ error: 'Cannot create user. Please try later.', status: 500 })
    }
}