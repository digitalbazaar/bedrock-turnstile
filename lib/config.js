/*
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';

config.turnstile = {
  clients: {
    // default client, expected to be used by most top-level apps;
    // other named clients can be added for more complex apps
    default: {
      // default secret testing key from turnstile
      SECRET_KEY: '1x0000000000000000000000000000000AA',
      url: 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    }
  }
};
