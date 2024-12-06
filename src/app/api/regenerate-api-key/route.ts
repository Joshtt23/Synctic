import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Generate a new API key (you might want to use a more secure method)
    const newApiKey = `sk_${Math.random()
      .toString(36)
      .substr(2, 9)}_${Date.now()}`;

    // Update the API key in Firestore
    await updateDoc(doc(db, "companies", uid), {
      apiKey: newApiKey,
    });

    return NextResponse.json({ apiKey: newApiKey });
  } catch (error) {
    console.error("Error regenerating API key:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
