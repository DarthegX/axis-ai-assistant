import dbConnect from "@/src/lib/db/mongodb";
import { signToken } from "@/src/lib/jwt";
import User from "@/src/models/User";
import { cookies } from "next/headers";
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
        const user = await User.findOneAndUpdate(
            { email: userData.email },
            {
                $set: {
                    username: userData.username,
                    email: userData.email,
                    password: userData.password
                }
            },
            { upsert: true, new: true }
        );

        const authToken = signToken({
            userId: user._id.toString(),
            email: user.email
        });

        const cookieStore = await cookies();

        cookieStore.set('app_auth_token', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 20 // 20 days
        });

        return NextResponse.json({
            username: user.username,
            email: user.email,
            sessionToken: authToken,
            discogs: {
                accessToken: null,
                accessTokenSecret: null,
                oauthTokenSecret: null
            }
        });
    } catch (err) {
        console.log('ERROR on POST /auth/signup (creating user): ' + err)
        return NextResponse.json({ error: 'Cannot create user. Please try later.', status: 500 })
    }
}