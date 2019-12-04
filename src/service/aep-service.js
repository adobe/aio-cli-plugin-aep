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
const { getApiKey, getAccessToken, getTenantName } = require('../aep-service-core/aep-helpers')
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

//datasets

  getDataset: async function (datasetId) {
    return Client.getDataset(datasetId)
  },

  listDatasets: async function (limit = null, start = null, orderBy = null) {
    return Client.listDatasets(limit, start, orderBy)
  },

  createDataset: async function (name, description, xdm) {
    return Client.createDataset(name, description, xdm)
  },

  deleteDataset: async function (datasetId) {
    return Client.deleteDataset(datasetId)
  },

 //batches

  listBatches: async function (limit = null, start = null, orderBy = null) {
    return Client.listBatches(limit, start, orderBy)
  },

  getBatch: async function (batchId) {
    return Client.getBatch(batchId)
  },

  createBatch: async function (datasetId, fileType) {
    return Client.createBatch(datasetId, fileType)
  },

  deleteBatch: async function (batchId) {
    return Client.deleteBatch(batchId)
  },

  //classes

  listClasses: async function (limit = null, start = null, orderBy = null, container = null) {
    return Client.listClasses(limit, start, orderBy, container)
  },

  getClass: async function (classId, container) {
    return Client.getClass(classId, container)
  },

  createClass: async function (mixin, title, description, baseClass, container) {
    return Client.createClass(mixin, title, description, baseClass, container)
  },

  deleteClass: async function (classId, container) {
    return Client.deleteClass(classId, container)
  },
}

module.exports = AdobeAep
