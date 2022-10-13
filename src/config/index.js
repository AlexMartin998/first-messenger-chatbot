'use strict';

import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'producction') config();

export const PORT = process.env.PORT || 3300;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
export const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export const URL_WEB_VIEW_SURVEY = process.env.URL_WEB_VIEW_SURVEY;
