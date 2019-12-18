/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/*
getApiKey,
  getAccessToken,
  getTenantName,
 */
const helpers = require('../../../../src/aep-service-core/helpers')
const ListBatchesCommand = require('../../../../src/commands/aep/batches/list')
const GetBatchesCommand = require('../../../../src/commands/aep/batches/get')
const CreateBatchesCommand = require('../../../../src/commands/aep/batches/create')
const DeleteBatchesCommand = require('../../../../src/commands/aep/batches/delete')
const config = require('@adobe/aio-cli-config')

let mockedBatchPayload = {
  '5df181f034742b18a81ec7cf': {
    'status': 'active',
    'inputFormat': {
      'format': 'parquet',
    },
    'createdUser': '0D076CEB5DD32E7A0A495C06@techacct.adobe.com',
    'imsOrg': 'C37C0A125B0458C20A495D95@AdobeOrg',
    'createdClient': 'b9ceb3ffbb44415aaec53647b083eb00',
    'updatedUser': '0D076CEB5DD32E7A0A495C06@techacct.adobe.com',
    'version': '1.0.0',
    'created': 1576108528538,
    'updated': 1576108528538,
  },
}

let mockConfig = {
    client_id: 'aep-clientId',
    access_token: 'aep-accessToken',
    tenantName: 'aep-tenantName',
}


test('list-batches - missing config', async () => {
  expect.assertions(2)
  let runResult = ListBatchesCommand.run([])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})


test('list-and-get-batch-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return mockConfig
  })
   expect.assertions(2)
  let runResult = ListBatchesCommand.run([])
  await expect(runResult).resolves.toEqual(mockedBatchPayload)
  runResult = GetBatchesCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(mockedBatchPayload)
})


test('create-batch-success', async () => {
  config.get.mockImplementation(() => {
    return mockConfig
  })
  expect.assertions(1)
  let runResult = CreateBatchesCommand.run(['-i=abc', '-f=json'])
  await expect(runResult).resolves.toEqual(mockedBatchPayload)
})

test('delete-batch-success', async () => {
  config.get.mockImplementation(() => {
    return mockConfig
  })
  expect.assertions(1)
  runResult = DeleteBatchesCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(mockedBatchPayload)
})
