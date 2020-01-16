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
const BaseCommand = require('../about')
const {flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class UploadToBatchesCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(UploadToBatchesCommand)
    let result

    try {
      result = await this.uploadToBatch(flags.datasetId, flags.batchId, flags.fileType, flags.file, flags.batchExists, flags.fileName)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async uploadToBatch(datasetId, batchId, fileType, file, batchExists, name) {
    return this.getAdobeAep().uploadToBatch(datasetId, batchId, fileType, file, batchExists, name)
  }
}

UploadToBatchesCommand.description = 'Retrieve the list of batches associated with this organization'
UploadToBatchesCommand.hidden = false
UploadToBatchesCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({char: 'j', hidden: false, description: 'value as json'}),
  yaml: flags.boolean({char: 'y', hidden: false, description: 'value as yaml'}),
  datasetId: flags.string({char: 'i', description: 'The ID of the dataset.', required: true}),
  batchId: flags.string({char: 'b', description: 'The ID of the batch.', required: true}),
  fileName: flags.string({char: 'n', description: 'The name of the file.', required: true}),
  fileType: flags.string({
    char: 't',
    description: 'The type of file to be ingested in this batch. One of parquet, csv, json',
    options: ['json', 'parquet', 'csv'],
    default: 'parquet'
  }),
  file: flags.string({
    char: 'f',
    description: 'The actual file path to be uploaded to the batch'
  }),
  batchExists: flags.boolean({char: 'e', hidden: false, description: 'Does the batch exist. If false first a new batch is registered for bulk upload', default: false}),
}

UploadToBatchesCommand.aliases = [
  'aep:batches:upload'
]
module.exports = UploadToBatchesCommand
