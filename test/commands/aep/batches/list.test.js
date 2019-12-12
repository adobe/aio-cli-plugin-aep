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
const ListBatchesCommand = require('../../../../src/commands/aep/batches/list')
const config = require('@adobe/aio-cli-config')

beforeEach(() => {
  jest.clearAllMocks()
})

test('list-batches - missing config', async () => {
  expect.assertions(2)
  let runResult = ListBatchesCommand.run([])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('list-batches - mock success', async () => {
  config.get.mockImplementation(() => {
    return {
      client_id: 'aep-clientId',
      access_token: 'aep-accessToken',
      tenantName: 'aep-tenantName'
    }
  })
  expect.assertions(2)
  let runResult = ListBatchesCommand.run([])
  await !expect(runResult).to.be.empty
  runResult = ListBatchesCommand.run(['-l=3', '-o=1', '-s=-id'])
  await !expect(runResult).to.be.empty
})

test('list-batches - mock error', async () => {
  config.get.mockImplementation(() => {
    return {
      client_id: 'aep-clientId',
      access_token: 'aep-accessToken',
      tenantName: 'error-tenantName'
    }
  })
  expect.assertions(1)
  let runResult = ListBatchesCommand.run([])
  await expect(runResult).rejects.toThrow()
})
