import { auth } from "./auth";

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: new Headers({
        // Add any necessary headers here
      }),
    });
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}
