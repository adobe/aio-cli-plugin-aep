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

const ListDatasetCommand = require('../../../../src/commands/aep/datasets/list')
const GetDatasetCommand = require('../../../../src/commands/aep/datasets/get')
const CreateDatasetCommand = require('../../../../src/commands/aep/datasets/create')
const DeleteDatasetCommand = require('../../../../src/commands/aep/datasets/delete')
const CreateDatasetWithCommand = require('../../../../src/commands/aep/datasets/create-with-payload')
const config = require('@adobe/aio-cli-config')
var constants = require('../../../__mocks__/constants.js')

test('list-ds - missing config', async () => {
  expect.assertions(2)
  let runResult = ListDatasetCommand.run([])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('list-and-get-ds-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(2)
  let runResult = ListDatasetCommand.run([])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
  runResult = GetDatasetCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('create-ds-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })

  let runResult = CreateDatasetCommand.run(['-n=TestPleaseIgnore', '-d=TestPleaseIgnore', '-x=_xdm.context.profile__union'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('create-ds-with-payload-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })

  let runResult = CreateDatasetWithCommand.run(['-f=test/commands/aep/test.json'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('delete-ds-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  runResult = DeleteDatasetCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})
