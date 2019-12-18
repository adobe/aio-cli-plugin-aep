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
const nodeFetch = jest.requireActual('node-fetch')
const fetchMock = require('fetch-mock').sandbox()

Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch
})
module.exports = fetchMock

function mockResponseWithMethod (url, method, response) {
  fetchMock.mock((u, opts) => u === url && opts.method === method, response)
}

function mockResponseWithMethodBody (url, method, body, response) {
  fetchMock.mock((u, opts) => u === url && opts.method === method && opts.body === body, response)
}
let mockResponseForBatch =  {
  "5df181f034742b18a81ec7cf": {
    "status": "active",
    "inputFormat": {
      "format": "parquet"
    },
    "createdUser": "0D076CEB5DD32E7A0A495C06@techacct.adobe.com",
    "imsOrg": "C37C0A125B0458C20A495D95@AdobeOrg",
    "createdClient": "b9ceb3ffbb44415aaec53647b083eb00",
    "updatedUser": "0D076CEB5DD32E7A0A495C06@techacct.adobe.com",
    "version": "1.0.0",
    "created": 1576108528538,
    "updated": 1576108528538
  },
}
mockResponseWithMethod('https://platform.adobe.io/data/foundation/catalog/batches/', 'GET', mockResponseForBatch)

mockResponseWithMethod('https://platform.adobe.io/data/foundation/catalog/batches/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForBatch)

fetchMock.get('https://platform.adobe.io/data/foundation/catalog/batches/abc', mockResponseForBatch)

fetchMock.delete('https://platform.adobe.io/data/foundation/catalog/batches/abc', mockResponseForBatch)

fetchMock.post('https://platform.adobe.io/data/foundation/catalog/batches/', mockResponseForBatch)

//classes
// fetchMock.get('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/', mockResponseForBatch)
// fetchMock.get('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/abc', mockResponseForBatch)
// fetchMock.delete('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/abc', mockResponseForBatch)
//
// fetchMock.post('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/', mockResponseForBatch)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/', 'GET', mockResponseForBatch)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/abc', 'GET', mockResponseForBatch)
mockResponseWithMethod('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForBatch)
fetchMock.post('https://platform.adobe.io/data/foundation/schemaregistry/tenant/classes/', mockResponseForBatch)
fetchMock.delete('https://platform.adobe.io/data/foundation/schemaregistry/global/classes/abc', mockResponseForBatch)
