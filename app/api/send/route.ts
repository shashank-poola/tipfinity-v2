import { SuperchatEmailTemplate } from '@/components/email-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';



export async function POST(req: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const { name, message, email} = await req.json();

        if (!email || !name || !message ) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Tipfinity <noreply@onboarding.tipfinity.xyz>',
            to: [email],
            subject: 'New Tipfinity Message',
            react:await SuperchatEmailTemplate({message,name}),
        });

        if (error) {
            console.log(error);
            return NextResponse.json({ error }, { status: 501 });
        
        }
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
