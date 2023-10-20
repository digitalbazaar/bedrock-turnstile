/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import {agent} from '@bedrock/https-agent';
import {httpClient} from '@digitalbazaar/http-client';
import './config.js';

const {config, util: {BedrockError}} = bedrock;

export async function verify({token, remoteIp} = {}) {
  const cfg = config.turnstile;
  const payload = {
    secret: cfg.secretKey,
    response: token,
    remoteip: remoteIp
  };

  try {
    const result = await httpClient.post(cfg.url, {agent, json: payload});
    if(result.data.success) {
      // captcha was successful, do nothing
      return;
    }
    throw new Error('Unsuccessful turnstile captcha.');
  } catch(cause) {
    throw new BedrockError('Unable to complete request, please try again.', {
      name: 'NotAllowedError',
      cause,
      details: {
        httpStatusCode: 405,
        public: true
      }
    });
  }
}
