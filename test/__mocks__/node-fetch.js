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

mockResponseWithMethod(' https://platform.adobe.io/data/foundation/catalog/batches/', 'GET', {
  'total': 1120,
  'offset': 0,
  'limit': 5,
  'offers': [
    {
      'id': '391769',
      'name': '/l1_a_b_test/experiences/0/pages/0/zones/0/1489440825492',
      'type': 'content',
      'modifiedAt': '2017-03-20T03:03:28Z',
      'workspace': '1234567'
    },
    {
      'id': '391902',
      'name': '10OFF',
      'type': 'content',
      'modifiedAt': '2017-03-19T00:06:47Z',
      'workspace': '1234567'
    },
    {
      'id': '391903',
      'name': 'SHIPFREE',
      'type': 'content',
      'modifiedAt': '2017-03-19T00:06:29Z',
      'workspace': '1234567'
    },
    {
      'id': '391904',
      'name': '5OFF',
      'type': 'content',
      'modifiedAt': '2017-03-19T00:06:26Z',
      'workspace': '1234567'
    },
    {
      'id': '391905',
      'name': '/a1_-_l4206a_-_ab/experiences/0/pages/0/zones/0/1489468580249',
      'type': 'content',
      'modifiedAt': '2017-06-30T19:48:38Z',
      'workspace': '1234567'
    }
  ]
})
