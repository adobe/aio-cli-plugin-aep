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

const CreateMappingSetsCommand = require('../../../../src/commands/aep/mappingsets/create')
const GetMappingSetsCommand = require('../../../../src/commands/aep/mappingsets/get')
const ListMappingSetsCommand = require('../../../../src/commands/aep/mappingsets/list')
const UpdateMappingSetCommand = require('../../../../src/commands/aep/mappingsets/update')
const config = require('@adobe/aio-cli-config')
var constants = require('../../../__mocks__/constants.js')
var testFilePath = '../test.json'
test('create-mapping-set - missing config', async () => {
  expect.assertions(2)
  let runResult = CreateMappingSetsCommand.run(['-f=abc'])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('create-mapping-set-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  runResult = CreateMappingSetsCommand.run(['-f=test/commands/aep/test.json'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('create-mapping-set-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(1)
  let runResult = CreateMappingSetsCommand.run(['-f=test/commands/aep/test.json'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('list-and-get-mappingsets-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(2)
  let runResult = ListMappingSetsCommand.run([])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
  runResult = GetMappingSetsCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('update-mapping-set-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  runResult = UpdateMappingSetCommand.run(['-f=test/commands/aep/test.json', '-i=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})


