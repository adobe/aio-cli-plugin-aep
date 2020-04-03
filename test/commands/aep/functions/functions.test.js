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

const ListMappingFunctions = require('../../../../src/commands/aep/mappingsets/functions/list')
const ValidateMappingFunctions = require('../../../../src/commands/aep/mappingsets/functions/validate')

const config = require('@adobe/aio-cli-config')
var constants = require('../../../__mocks__/constants.js')

test('list-sandboxes - missing config', async () => {
  expect.assertions(2)
  let runResult = ListMappingFunctions.run([])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('list-mapping-functions', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(1)
  let runResult = ListMappingFunctions.run([])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('validate-mappings', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(1)
  let runResult = ValidateMappingFunctions.run(['-f=test/commands/aep/test.json'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

