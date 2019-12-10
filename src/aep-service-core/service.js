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
const { getApiKey, getAccessToken, getTenantName } = require('./helpers')
const Client = require('./client')

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


  //datatypes

  listDatatypes: async function (limit = null, start = null, orderBy = null, container = null) {
    return Client.listDatatypes(limit, start, orderBy, container)
  },

  getDatatype: async function (datatypeId, container) {
    return Client.getDatatype(datatypeId, container)
  },

  createDatatype: async function (title, description, container, propName, propValue) {
    return Client.createDatatype(title, description,  container, propName, propValue)
  },

  deleteDatatype: async function (datatypeId, container) {
    return Client.deleteDatatype(datatypeId, container)
  },

  //mixins

  listMixins: async function (limit = null, start = null, orderBy = null, container = null) {
    return Client.listMixins(limit, start, orderBy, container)
  },

  getMixin: async function (mixinId, container) {
    return Client.getMixin(mixinId, container)
  },

  createMixin: async function (classId, title, description, container, propName, propValue, organization) {
    return Client.createMixin(classId, title, description, container, propName, propValue, organization)
  },

  deleteMixin: async function (mixinId, container) {
    return Client.deleteMixin(mixinId, container)
  },

  //schemas
  createSchema: async function (mixin, title, description, baseClass, container, unionschema) {
    return Client.createSchema(mixin, title, description, baseClass, container, unionschema)
  },

  listSchemas: async function (limit = null, start = null, orderBy = null, container = null) {
    return Client.listSchemas(limit, start, orderBy, container)
  },

  getSchema: async function (schemaId, container) {
    return Client.getSchema(schemaId, container)
  },

  deleteSchema: async function (schemaId, container) {
    return Client.deleteSchema(schemaId, container)
  },
  listStats: async function () {
    return Client.listStats()
  }
}

module.exports = AdobeAep
