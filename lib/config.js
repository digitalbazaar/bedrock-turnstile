/*
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';

config.turnstile = {
  // account authorization type options
  authorization: {
    turnstile: {
      // default secret testing key from turnstile
      SECRET_KEY: '1x0000000000000000000000000000000AA',
      url: 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    }
  },
};
