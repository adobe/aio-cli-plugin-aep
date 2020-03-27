/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const config = require('@adobe/aio-cli-config')
var Url = require('url-parse')

function isEmpty(s) {
  return s === null || s === undefined || s.length === 0
}

function getApiKey() {
  const jwtAuth = config.get('jwt-auth')
  if (!jwtAuth) {
    throw new Error('missing config data: jwt-auth')
  }
  const apiKey = jwtAuth.client_id
  if (!apiKey) {
    throw new Error('missing config data: jwt-auth.client_id')
  }
  return apiKey
}


function getAccessToken() {
  const jwtAuth = config.get('jwt-auth')
  if (!jwtAuth) {
    throw new Error('missing config data: jwt-auth')
  }

  const accessToken = config.get('jwt-auth.access_token')
  if (!accessToken) {
    throw new Error('missing config data: jwt-auth.access_token')
  }
  return accessToken
}

function getTenantName() {
  const targetConfig = config.get('jwt-auth.jwt_payload.iss')
  if (!targetConfig) {
    throw new Error('missing config data: org')
  }
  const tenantName = targetConfig
  if (!tenantName) {
    throw new Error('missing config data: target.tenantName')
  }
  return tenantName
}

function getSandboxId() {
  const sandboxId = config.get('x-sandbox-id')
  if (!sandboxId) {
    throw new Error('missing x-sandbox-id')
  }
  return sandboxId
}

function getSandboxName() {
  const sandboxName = config.get('x-sandbox-name')
  if (!sandboxName) {
    throw new Error('missing x-sandbox-name')
  }
  return sandboxName
}

function getEnv() {
  if(config === undefined || config === null || config.get('env') === undefined || config.get('env') === null) {
    return 'https://platform-int.adobe.io/data/foundation'
  }
  var env = config.get('env')//.toUpperCase()
  if (env === 'INT' || env === 'INTEGRATION' || env === 'int') {
    return 'https://platform-int.adobe.io/data/foundation'
  }
  else if (env === 'STAGE' || env ==='STG' || env === 'stg' || env === 'stage') {
    return 'https://platform-stage.adobe.io/data/foundation'
  }
  else return 'https://platform.adobe.io/data/foundation'
}


module.exports = {
  getApiKey,
  getAccessToken,
  getTenantName,
  getSandboxId,
  getSandboxName,
  getEnv
}
