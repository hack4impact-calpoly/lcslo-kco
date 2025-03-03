import { TextEncoder, TextDecoder } from "util";
import "dotenv/config"; // This will automatically load variables from .env file

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
