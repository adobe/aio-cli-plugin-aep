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
const BaseCommand = require('../abstract-no-operation')
const {flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class CreateBatchesCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateBatchesCommand)
    let result

    try {
      result = await this.createBatch(flags.datasetId, flags.fileType)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async createBatch(datasetId, fileType) {
    return this.getAdobeAep().createBatch(datasetId, fileType)
  }
}

CreateBatchesCommand.description = 'Create a batch. '

CreateBatchesCommand.flags = {
  datasetId: flags.string({char: 'i', description: 'The ID of the dataset.', required: true}),
  fileType: flags.string({char: 'f', description: 'The type of file to be ingested in this batch. One of parquet, csv, json', options: ['json', 'parquet', 'csv'], default: 'parquet', required: false}),
}

CreateBatchesCommand.aliases = [
  'aep:batches:create',
  'aep:batches:new']
module.exports = CreateBatchesCommand
