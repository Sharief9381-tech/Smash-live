import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

let initialized = false;

/**
 * Initialize Firebase Admin SDK once.
 * Loads service account from firebase-service-account.json in the backend root.
 */
export const initFirebase = () => {
  if (initialized || admin.apps.length > 0) return;

  const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');

  if (!fs.existsSync(serviceAccountPath)) {
    console.warn('[Firebase] firebase-service-account.json not found — phone token verification disabled.');
    return;
  }

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    initialized = true;
    console.log('[Firebase] Admin SDK initialized.');
  } catch (err) {
    console.error('[Firebase] Failed to initialize:', err);
  }
};

/**
 * Verify a Firebase ID token and return the decoded 10-digit mobile number.
 */
export const verifyFirebaseToken = async (idToken: string): Promise<string | null> => {
  if (!initialized && admin.apps.length === 0) {
    console.warn('[DEV] Firebase not configured — skipping token verification.');
    return null;
  }

  const decoded = await admin.auth().verifyIdToken(idToken);

  if (!decoded.phone_number) {
    throw new Error('No phone number associated with this token.');
  }

  // Strip +91 country code → return 10-digit number
  const phone = decoded.phone_number.replace(/^\+91/, '').replace(/\D/g, '');
  return phone;
};
