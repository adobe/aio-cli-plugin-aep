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
const { getApiKey, getAccessToken } = require('../aep-service-core/adobe-helpers')
const { getTenantName } = require('../aep-service-core/adobe-aep-helpers')
const Client = require('../aep-service-core/client')

let AdobeAep = {

  init: function () {
    const config = {
      tenantName: getTenantName(),
      accessToken: getAccessToken(),
      apiKey: getApiKey()
    }
    Client.init(config)
    return true
  },

  getOffer: async function (offerId = null) {
    return Client.getOffer(offerId)
  },

  listOffers: async function () {
    return Client.listOffers()
  },

  createOffer: async function (name = null, content = null, workspace = null) {
    return Client.createOffer(name, content, workspace)
  },

  updateOffer: async function (id = null, name = null, content = null) {
    return Client.updateOffer(id, name, content)
  },

  deleteOffer: async function (id = null) {
    return Client.deleteOffer(id)
  }
}

module.exports = AdobeAep
