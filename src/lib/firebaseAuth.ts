import { getAuth } from "firebase/auth";
import { app } from "./firebase";

// Kept separate from firebase.ts (which the public site also imports for
// Firestore) so firebase/auth only ends up in the lazy-loaded /admin bundle.
export const auth = getAuth(app);
