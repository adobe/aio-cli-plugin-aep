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

const CreateBulkBatch = require('../../../../src/commands/aep/bulkingest/createbulkbatch')
const UploadtoBulkBatch = require('../../../../src/commands/aep/bulkingest/uploadtobulkbatch')
const CompleteBulkBatch = require('../../../../src/commands/aep/bulkingest/completebulkbatch')
const config = require('@adobe/aio-cli-config')
var constants = require('../../../__mocks__/constants.js')

test('create-batch-bulk-upload - missing config', async () => {
  expect.assertions(2)
  let runResult = CreateBulkBatch.run(['-i=abc'])
  await expect(runResult instanceof Promise).toBeTruthy()
  await expect(runResult).rejects.toEqual(new Error('missing config data: org'))
})

test('create-batch-bulk-upload-with-and-without-filter-params-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(1)
  runResult = CreateBulkBatch.run(['-i=abc'])
  await expect(runResult).resolves.toEqual(constants.mockPayload)
})

test('upload-batch-bulk-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
  expect.assertions(1)
  let runResult = UploadtoBulkBatch.run(['-f=test/commands/aep/about.test.js',  '-i=abc',  '-b=abc',  '-n=abc'])
  await expect(runResult).resolves.toEqual(undefined)
})

test('complete-batch-bulk-success', async () => {
  config.get.mockImplementation(() => {
    return constants.mockConfig
  })
//  expect.assertions(1)
  runResult = CompleteBulkBatch.run(['-b=abc'])
  await  expect(runResult).resolves.toJSON
})
