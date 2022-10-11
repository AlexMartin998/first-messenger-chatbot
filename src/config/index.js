'use strict';

import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'producction') config();

export const PORT = process.env.PORT || 3300;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
export const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export const MONGODB_URI = process.env.MONGODB_URI;
export const SECRETORKEY_JWT = process.env.SECRETORKEY_JWT;
export const FRONTEND_URL = process.env.FRONTEND_URL;
