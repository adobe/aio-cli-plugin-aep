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

const ListDatatypesCommand = require('../../../../src/commands/aep/datatypes/list')
const GetDatatypesCommand = require('../../../../src/commands/aep/datatypes/get')
const CreateDatatypesCommand = require('../../../../src/commands/aep/datatypes/create')
const DeleteDatatypesCommand = require('../../../../src/commands/aep/datatypes/delete')
const config = require('@adobe/aio-cli-config')
var constants = require('../../../__mocks__/constants.js')


test('list-datatypes - missing config', async () => {
  expect.assertions(2)
  let runResult = ListDatatypesCommand.run([])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('list-and-get-datatype-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(2)
  let runResult = ListDatatypesCommand.run([])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
  runResult = GetDatatypesCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('create-datatype-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  let runResult = CreateDatatypesCommand.run(['-d=TestIgnore3', '-c=tenant', '-t=testIgnore3', '-y', '-p=location*string'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('delete-datatype-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  runResult = DeleteDatatypesCommand.run(['-i=abc'])
  await expect(runResult).resolves.toEqual()
})
