import https from 'https';
import bcrypt from 'bcryptjs';
import { Otp } from '../models/Otp';

const normalizeMobile = (mobile: string): string =>
  String(mobile).replace(/\D/g, '');

/**
 * Send SMS via Fast2SMS API.
 */
const sendSms = (mobile: string, otp: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) {
      console.log(`[DEV] OTP for ${mobile}: ${otp}`);
      return resolve();
    }

    // Fast2SMS Quick SMS endpoint
    const payload = JSON.stringify({
      route: 'otp',
      variables_values: otp,
      numbers: mobile,
    });

    const options = {
      hostname: 'www.fast2sms.com',
      path: '/dev/bulkV2',
      method: 'POST',
      headers: {
        authorization: apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.return === true) {
            console.log(`[SMS] OTP sent to ${mobile}`);
            resolve();
          } else {
            console.error('[SMS] Fast2SMS error:', json);
            reject(new Error(json.message?.[0] || 'Failed to send SMS'));
          }
        } catch {
          reject(new Error('Invalid response from Fast2SMS'));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
};

/**
 * Generate OTP, store hashed in DB, send via Fast2SMS.
 */
export const sendOtp = async (mobile: string): Promise<void> => {
  const clean = normalizeMobile(mobile);

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpHash = await bcrypt.hash(otp, 10);

  // Remove any previous OTPs for this number
  await Otp.deleteMany({ mobile: clean });

  // Save new OTP — expires in 10 minutes
  await Otp.create({
    mobile: clean,
    otpHash,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendSms(clean, otp);
};

/**
 * Verify OTP submitted by the user.
 */
export const verifyOtp = async (mobile: string, otp: string): Promise<boolean> => {
  const clean = normalizeMobile(mobile);

  const record = await Otp.findOne({
    mobile: clean,
    verified: false,
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    throw new Error('OTP expired or not found. Please request a new one.');
  }

  const isMatch = await record.verifyOtp(otp);
  if (!isMatch) {
    throw new Error('Invalid OTP. Please try again.');
  }

  // Mark as used — cannot be replayed
  record.verified = true;
  await record.save();

  return true;
};

// No-op — kept so server.ts doesn't break if it calls this
export const initWhatsApp = (): void => {
  console.log('[SMS] Fast2SMS OTP service ready.');
};

export const getWhatsAppStatus = (): { ready: boolean } => ({ ready: true });
