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
const request = require('request')
const {endPoints, catalogBaseUrl} = require('./aep-constants')

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
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'content-type': contentType,
      },

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

//datasets signature

  listDatasets: async function (limit = null, start = null, orderBy = null) {
    const result = await this._listDatasets(limit, start, orderBy)
    return (result)
  },

  getDataset: async function (datasetId) {
    const result = await this._getDataset(datasetId)
    return (result)
  },

  createDataset: async function (name, description, xdm) {
    const result = await this._createDataset(name, description, xdm)
    return (result)
  },

  deleteDataset: async function (datasetId) {
    const result = await this._deleteDataset(datasetId)
    return (result)
  },

//datasets implementation

  _listDatasets: async function (limit, start, orderBy) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}`)
    if (limit) {
      baseUrl.searchParams.append(endPoints.datasets.parameters.limit, limit)
    }
    if (start) {
      baseUrl.searchParams.append(endPoints.datasets.parameters.start, start)
    }
    if (orderBy) {
      baseUrl.searchParams.append(endPoints.datasets.parameters.orderBy, orderBy)
    }
    return this.get(`${baseUrl.toString()}`, endPoints.datasets.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource datasets: ${res.url} (${res.status} ${res.statusText})`)
    })
  },

  _createDataset: async function (name, description, xdm) {
    request.post({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
      },
      url: new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}`).toString(),
      body: JSON.stringify({
        name: name,
        description: description,
        schemaRef:
          {
            id: xdm,
            contentType: 'application/vnd.adobe.xed-full+json; version=1',
          },
      }),
    }, function (error, response, body) {
      console.log(body)
    })
  },

  _getDataset: async function (datasetId) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}` + datasetId)
    return this.get(`${baseUrl.toString()}`, endPoints.datasets.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource datasets: ${res.url} (${res.status} ${res.statusText}`)
    })
  },

  _deleteDataset: async function (datasetId) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.datasets.resourcePath}` + datasetId)
    return this.delete(`${baseUrl.toString()}`, endPoints.datasets.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource datasets: ${res.url} (${res.status} ${res.statusText}`)
    })
  },

  //batches signature

  listBatches: async function (limit = null, start = null, orderBy = null) {
    const result = await this._listBatches(limit, start, orderBy)
    return (result)
  },

  getBatch: async function (batchId) {
    const result = await this._getBatch(batchId)
    return (result)
  },

  createBatch: async function (datasetId, fileType) {
    const result = await this._createBatch(datasetId, fileType)
    return (result)
  },

  deleteBatch: async function (batchId) {
    const result = await this._deleteBatch(batchId)
    return (result)
  },

  //batches implementation

  _listBatches: async function (limit, start, orderBy) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.batches.resourcePath}`)
    if (limit) {
      baseUrl.searchParams.append(endPoints.batches.parameters.limit, limit)
    }
    if (start) {
      baseUrl.searchParams.append(endPoints.batches.parameters.start, start)
    }
    if (orderBy) {
      baseUrl.searchParams.append(endPoints.batches.parameters.orderBy, orderBy)
    }
    return this.get(`${baseUrl.toString()}`, endPoints.batches.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource batches: ${res.url} (${res.status} ${res.statusText})`)
    })
  },


  _createBatch: async function (datasetId, fileType) {
    request.post({
      headers: {
        'authorization': `Bearer ` + this.accessToken,
        'cache-control': 'no-cache',
        'x-api-key': this.apiKey,
        'x-gw-ims-org-id': this.tenantName,
        'Content-Type': 'application/json',
      },
      url: new URL(`${catalogBaseUrl}${endPoints.batches.resourcePath}`),
      body: JSON.stringify({
        datasetId: datasetId,
        status: `active`,
        inputFormat:
          {
            format: fileType
          },
      }),
    }, function (error, response, body) {
      console.log(body)
    })
  },

  _getBatch: async function (batchId) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.batches.resourcePath}` + batchId)
    return this.get(`${baseUrl.toString()}`, endPoints.batches.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource batches: ${res.url} (${res.status} ${res.statusText}`)
    })
  },


  _deleteBatch: async function (batchId) {
    let baseUrl = new URL(`${catalogBaseUrl}${endPoints.batches.resourcePath}` + batchId)
    return this.delete(`${baseUrl.toString()}`, endPoints.batches.contentType).then((res) => {
      if (res.ok) {
        return res.json()
      } else throw new Error(`Cannot fulfill request on resource batches: ${res.url} (${res.status} ${res.statusText}`)
    })
  },

}

module.exports = Client
