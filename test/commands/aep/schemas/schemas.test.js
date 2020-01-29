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

const helpers = require('../../../../src/aep-service-core/helpers')
const ListSchemasCommand = require('../../../../src/commands/aep/schemas/list')
const GetSchemasCommand = require('../../../../src/commands/aep/schemas/get')
const CreateSchemasCommand = require('../../../../src/commands/aep/schemas/create')
const DeleteSchemasCommand = require('../../../../src/commands/aep/schemas/delete')
const config = require('@adobe/aio-cli-config')
var constants = require('../../../__mocks__/constants.js')

test('list-schemas - missing config', async () => {
  expect.assertions(2)
  let runResult = ListSchemasCommand.run([])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('list-and-get-schema-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(2)
  let runResult = ListSchemasCommand.run([])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
  runResult = GetSchemasCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('create-schema-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  let runResult = CreateSchemasCommand.run(['-c=tenant', '-b=https://ns.adobe.com/xdm/context/experienceevent', '-u', '-t=title', '-d=description'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('delete-schema-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  runResult = DeleteSchemasCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual()
})
