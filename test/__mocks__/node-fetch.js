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

const url = require('../../src/aep-service-core/helpers').getEnv()

Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch,
})
module.exports = fetchMock

function mockResponseWithMethod(url, method, response) {
  fetchMock.mock((u, opts) => u === url && opts.method === method, response)
}

function mockResponseWithMethodBody(url, method, body, response) {
  fetchMock.mock((u, opts) => u === url && opts.method === method && opts.body === body, response)
}

let mockResponseForApi = {
  'abc': {
    'status': 'active',
    'inputFormat': {
      'format': 'parquet',
    },
    'createdUser': 'abc@techacct.adobe.com',
    'imsOrg': 'abc@AdobeOrg',
    'createdClient': 'abc',
    'updatedUser': 'abc@techacct.adobe.com',
    'version': '1.0.0',
    'created': 1576108528538,
    'updated': 1576108528538,
  },
}
mockResponseWithMethod(url + '/catalog/batches/', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/catalog/batches/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.get(url + '/catalog/batches/abc', mockResponseForApi)
fetchMock.delete(url + '/catalog/batches/abc', mockResponseForApi)
fetchMock.post(url + '/catalog/batches/', mockResponseForApi)
fetchMock.get(url + '/catalog/batches/uniques/field', mockResponseForApi)

mockResponseWithMethod(url + '/schemaregistry/global/classes/', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/schemaregistry/global/classes/abc', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/schemaregistry/global/classes/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.post(url + '/schemaregistry/tenant/classes/', mockResponseForApi)
fetchMock.delete(url + '/schemaregistry/global/classes/abc', mockResponseForApi)

mockResponseWithMethod(url + '/schemaregistry/global/datatypes/', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/schemaregistry/global/datatypes/abc', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/schemaregistry/global/datatypes/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.post(url + '/schemaregistry/tenant/datatypes/', mockResponseForApi)
fetchMock.delete(url + '/schemaregistry/global/datatypes/abc', mockResponseForApi)

mockResponseWithMethod(url + '/schemaregistry/global/mixins/', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/schemaregistry/global/mixins/abc', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/schemaregistry/global/mixins/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.post(url + '/schemaregistry/tenant/mixins/', mockResponseForApi)
fetchMock.delete(url + '/schemaregistry/global/mixins/abc', mockResponseForApi)

mockResponseWithMethod(url + '/schemaregistry/global/schemas/', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/schemaregistry/global/schemas/abc', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/schemaregistry/global/schemas/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.post(url + '/schemaregistry/tenant/schemas/', mockResponseForApi)
fetchMock.delete(url + '/schemaregistry/global/schemas/abc', mockResponseForApi)

mockResponseWithMethod(url + '/catalog/dataSets/', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/catalog/dataSets/?limit=3&start=-id&orderBy=1', 'GET', mockResponseForApi)
fetchMock.get(url + '/catalog/dataSets/abc', mockResponseForApi)
fetchMock.delete(url + '/catalog/dataSets/abc', mockResponseForApi)
fetchMock.post(url + '/catalog/dataSets/', mockResponseForApi)


mockResponseWithMethod(url + '/import/batches/', 'POST', mockResponseForApi)
mockResponseWithMethod(url + '/import/batches/abc?action=COMPLETE', 'POST', mockResponseForApi)
mockResponseWithMethod(url + '/import/batches/datasets/abc/files/abc', 'PUT', mockResponseForApi)
fetchMock.post(url + '/import/batches/', mockResponseForApi)

mockResponseWithMethod(url + '/schemaregistry/stats', 'GET', mockResponseForApi)

mockResponseWithMethod(url + '/sandbox-management/sandboxes', 'GET', mockResponseForApi)

fetchMock.post(url + '/conversion/mappingSets/', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/mappingSets/', 'POST', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/mappingSets/', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/mappingSets/abc', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/mappingSets/abc', 'PUT', mockResponseForApi)


fetchMock.post(url + '/conversion/mappingSets/abc/mappings/', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/mappingSets/abc/mappings/', 'POST', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/mappingSets/abc/mappings/abc', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/mappingSets/abc/mappings/', 'GET', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/mappingSets/abc/mappings/abc', 'PUT', mockResponseForApi)

mockResponseWithMethod(url + '/conversion/languages/el/validate', 'POST', mockResponseForApi)
mockResponseWithMethod(url + '/conversion/languages/el/functions', 'GET', mockResponseForApi)



