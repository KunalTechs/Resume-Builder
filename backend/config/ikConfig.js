import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// Log this to be 100% sure the URL is loading
console.log("Endpoint Check:", process.env.IMAGEKIT_URL_ENDPOINT ? "Found" : "MISSING");

const ik = new ImageKit({
publicKey: (process.env.IMAGEKIT_PUBLIC_KEY || '').trim(),
  privateKey: (process.env.IMAGEKIT_PRIVATE_KEY || '').trim(),
  urlEndpoint: (process.env.IMAGEKIT_URL_ENDPOINT || '').trim(),
});


const uploadFn = ik.upload || (ik.files && ik.files.upload);

console.log("🛠️ IK Status:", typeof uploadFn === 'function' ? "✅ READY" : "❌ STILL UNDEFINED");

export default ik;