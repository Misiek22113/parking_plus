
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { User, UserModel } from "@/models/User";
import mongoose from "mongoose";
import { AppError } from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10"
})

const endpointSecret = process.env.WEBHOOK_SECRET;

const fulfillOrder = async (data: Stripe.LineItem[], customerEmail: string) => {

    const mongoDbUrl = process.env.MONGODB_URL;

    try {
    if (!mongoDbUrl) {
        throw new AppError('MongoDB URL is not defined');
    }
    await mongoose.connect(mongoDbUrl);

    if (customerEmail) {
        const username = customerEmail;

        const totalAmountPaid = data.reduce((total, item) => total + item.amount_total, 0);

        const creditsToAdd = totalAmountPaid / 100;

        const updatedUser = await UserModel.findOneAndUpdate(
        { username: username as string },
        { $inc: { credits: creditsToAdd } },
        { new: true }
        );

        if (updatedUser) {
        console.info('Credits updated for:', username);
        } else {
        console.error('User not found for email:', username);
        }
    }
    } catch (error: any) {
    console.error('Error in fulfillOrder:', error.message);
    return false;
    } finally {
    mongoose.connection.close();
    return true;
    }
}

//Jeśli chcemy zapisywać do bazy całe info o płatności
// const saveCheckoutSession = async (eventDataObject: any) => {
//     const mongoDbUrl = process.env.MONGODB_URL;

//     try {
//       if (!mongoDbUrl) {
//         throw new AppError('MongoDB URL is not defined');
//       }
//       await mongoose.connect(mongoDbUrl);
  
//       const db = mongoose.connection.db;
  
//       const res = await db.collection("checkout_sessions").insertOne(eventDataObject);
  
//       return res.acknowledged;
//     } catch (error: any) {
//       console.error('Error in saveCheckoutSession:', error.message);
//       return false;
//     } finally {
//       mongoose.connection.close();
//     }
// }

const handleCompletedCheckoutSession = async (event: Stripe.CheckoutSessionCompletedEvent) => {
    try {
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            (event.data.object as any).id,
            {expand: ["line_items"]}
        );
        const lineItems = sessionWithLineItems.line_items;

        if(!lineItems) return false;

        const ordersFulfilled = await fulfillOrder(
            lineItems.data,
            (event.data.object as any).customer_details.email
        );
        // await saveCheckoutSession(event.data.object);

        if(ordersFulfilled) return true;

        console.error(
            "error fulfilling orders for",
            JSON.stringify(lineItems),
            JSON.stringify(event.data.object)
        );
        return false;
    } catch (error) {
        console.error("error handlingCompletedCheckoutSession", error);
        return false;
    }
};

export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;
    let result = "Webhook called.";

    try{
        event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret!);
    } catch (err: any){
        console.error(err);
        return NextResponse.json({error: err.message}, {status: 400});
    }

    switch (event.type) {
        case "checkout.session.completed":
            const savedSession = await handleCompletedCheckoutSession(event);
            if(!savedSession)
                return NextResponse.json(
                    { error: "Unable to save checkout session" },
                    { status: 500}
            );
        break;

        default:
            // console.warn(`Unhandled event type ${event.type}`);
        break;
    }

    return NextResponse.json({ recieved: true, status: result });
}