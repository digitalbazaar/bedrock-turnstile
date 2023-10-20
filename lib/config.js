/*
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';

config.turnstile = {
  // default testing key for Cloudflare Turnstile
  secretKey: '1x0000000000000000000000000000000AA',
  url: 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
};
