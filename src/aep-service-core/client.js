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
const fetch = require('node-fetch')

const { isEmpty } = require('./adobe-helpers')
const { endPoints, baseUrl } = require('./adobe-aep-constants')
const { isValidOfferName, isValidOfferContent, isValidWorkspace } = require('./adobe-aep-helpers')
const { getApiKey, getAccessToken } = require('../aep-service-core/adobe-helpers')
const { getTenantName } = require('../aep-service-core/adobe-aep-helpers')

let Client = {
  tenantName: null,
  accessToken: null,
  apiKey: null,

  init: function (config = null) {
    if (config) {
      this.tenantName = config.tenantName
      this.accessToken = config.accessToken
      this.apiKey = config.apiKey
    }
    return true
  },



  _doRequest: async function (path, method, contentType, body = null) {
    const options = {
      method: method,
      headers: {
        'authorization': `Bearer `+this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id' : this.tenantName
      }

    }
    if (method !== 'GET' && (body !== null || body !== undefined)) {
      options.body = JSON.stringify(body)
    }
    return fetch(path, options)
  },

  get: async function (path, contentType) {
    return this._doRequest(path, 'GET', contentType)
  },

  put: async function (path, contentType, body) {
    return this._doRequest(path, 'PUT', contentType, body)
  },

  post: async function (path, contentType, body) {
    return this._doRequest(path, 'POST', contentType, body)
  },

  delete: async function (path, contentType) {
    return this._doRequest(path, 'DELETE', contentType)
  },

  _listOffers: async function () {
    const request = require('request');
    const promisifiedRequest = function(options) {
      return new Promise((resolve,reject) => {
        request(options, (error, response, body) => {
          if (response) {
            return resolve(response);
          }
          if (error) {
            return reject(error);
          }
        });
      });
    };
    (async function() {
      const options = {
        url: 'https://platform.adobe.io/data/foundation/catalog/batches',
        method: 'GET',
        headers: {
          'authorization': `Bearer `+getAccessToken(),
          'cache-control': 'no-cache',
          'x-api-key': getApiKey(),
          'x-gw-ims-org-id' : getTenantName()
        }
      };

      let response = await promisifiedRequest(options);
      console.log(JSON.parse(response.body));
    })();
  },
  listOffers: async function () {
    const result = await this._listOffers()
    return (result)
  },

}

module.exports = Client
