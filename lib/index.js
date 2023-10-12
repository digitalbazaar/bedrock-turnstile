/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import {agent} from '@bedrock/https-agent';
import assert from 'assert-plus';
import {httpClient} from '@digitalbazaar/http-client';
import './config.js';

const {config, util: {BedrockError}} = bedrock;

export async function verify({token, remoteIp, client = 'default'}) {
  const cfg = config.turnstile;

  const clientConfig = cfg.clients[client];
  assert(clientConfig, 'object', `config.turnstile.clients.${client}`);
  const {SECRET_KEY, url} = clientConfig;
  const payload = {
    secret: SECRET_KEY,
    response: token,
    remoteip: remoteIp
  };

  try {
    const result = await httpClient.post(url, {agent, json: payload});
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
