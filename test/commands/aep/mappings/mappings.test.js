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

const CreateMappingsCommand = require('../../../../src/commands/aep/mappingsets/mappings/create')
const GetMappingsCommand = require('../../../../src/commands/aep/mappingsets/mappings/get')
const ListMappingsCommand = require('../../../../src/commands/aep/mappingsets/mappings/list')
const UpdateMappingsCommand = require('../../../../src/commands/aep/mappingsets/mappings/update')


const config = require('@adobe/aio-cli-config')
var constants = require('../../../__mocks__/constants.js')
var testFilePath = '../test.json'
test('create-mapping - missing config', async () => {
  expect.assertions(2)
  let runResult = CreateMappingsCommand.run(['-i=abc', '-s=abc', '-d=abc', '-t=EXPRESSION'])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('create-mapping-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  runResult = CreateMappingsCommand.run(['-i=abc', '-s=abc', '-d=abc', '-t=EXPRESSION'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('create-mapping-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(1)
  runResult = CreateMappingsCommand.run(['-i=abc', '-s=abc', '-d=abc', '-t=EXPRESSION'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('list-and-get-mappings-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(2)
  let runResult = ListMappingsCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
  runResult = GetMappingsCommand.run(['-i=abc', '-m=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('update-mappings-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  runResult = UpdateMappingsCommand.run(['-i=abc', '-s=abc', '-d=abc', '-t=EXPRESSION', '-m=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

