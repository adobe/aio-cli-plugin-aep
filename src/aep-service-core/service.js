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
const {getApiKey, getAccessToken, getTenantName, getSandboxId, getSandboxName, getEnv} = require('./helpers')
const Client = require('./client')
const fs = require('fs')
let AdobeAep = {

  init: function () {
    const config = {
      tenantName: getTenantName(),
      accessToken: getAccessToken(),
      apiKey: getApiKey(),
      sandboxId: getSandboxId(),
      sandboxName: getSandboxName(),
      env : getEnv()
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

  createDataset: async function (name, description, xdm, fileType, isProfileEnabled, isIdentityEnabled) {
    return Client.createDataset(name, description, xdm, fileType, isProfileEnabled, isIdentityEnabled)
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

  //bulk upload in batch

  uploadToBatch: async function(datasetId, batchId, fileType, file, batchExists, name) {
    return Client.uploadToBatch(datasetId, batchId, fileType, file, batchExists,name)
  },

  createBatchForBulkUpload: async function(datasetId, fileType) {
    return Client.createBatchForBulkUpload(datasetId, fileType)
  },

  completeBatchForBulkUpload : async function(batchId) {
    return Client.completeBatchForBulkUpload(batchId)
  },

  previewBatch : async function (batchId, datasetId) {
    return Client.previewBatch(batchId, datasetId)
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
    return Client.createDatatype(title, description, container, propName, propValue)
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

  createSchemaWithPayload : async function (container, file) {
  return Client.createSchemaWithPayload(container, file)
},

  createDetaSetWithPayload : async function (file) {
  return Client.createDataSetWithPayload(file)
},

  patchDetaSetWithPayload: async function (file, datasetId) {
    return Client.patchDataSetWithPayload(file, datasetId)
  },

  createMixinWithPayload: async function(container, file) {
    return Client.createMixinWithPayload(container, file)
  },
  //stats
  listStats: async function (limit = null, start = null, orderBy = null) {
    return Client.listStats(limit, start, orderBy)
  },

  //sandboxes
  listSandboxes: async function (limit = null, start = null, orderBy = null) {
    return Client.listSandboxes(limit, start, orderBy)
  },

  //mappingsets
  listMappingSets: async function (limit = null, start = null, orderBy = null) {
    return Client.listMappingSets(limit, start, orderBy)
  },

  createMappingSet: async function(file) {
    return Client.createMappingSet(file)
  },

  getMappingSet: async function(mappingsetId) {
    return Client.getMappingSet(mappingsetId)
  },

  createMappings: async function (mappingsetId, sourceSchema, targetSchema, sourceType) {
    return Client.createMappings(mappingsetId, sourceSchema, targetSchema, sourceType)
  },

  listMappings: async function (limit = null, start = null, orderBy = null, mappingsetId) {
    return Client.listMappings(limit, start, orderBy, mappingsetId)
  },

  getMapping: async function(mappingsetId, mappingId) {
    return Client.getMapping(mappingsetId, mappingId)
  },

  updateMapping: async function(mappingsetId, mappingId, sourceSchema, targetSchema, sourceType) {
    return Client.updateMapping(mappingsetId, mappingId, sourceSchema, targetSchema, sourceType)
  },

  updateMappingSet: async function (mappingsetId, file) {
    return Client.updateMappingSet(mappingsetId, file)
  },

  validateExpression: async function (file) {
    return Client.validateExpression(file)
  },

  listFunctions: async function() {
    return Client.listFunctions()
  }
}

module.exports = AdobeAep
