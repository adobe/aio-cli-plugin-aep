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

mockResponseWithMethod('https://platform.adobe.io/data/foundation/catalog/batches/?limit=3&offset=1&sortBy=-id', 'GET', {
  'total': 3,
  'offset': 1,
  'limit': 3,
  'batches': [
  ]
})

