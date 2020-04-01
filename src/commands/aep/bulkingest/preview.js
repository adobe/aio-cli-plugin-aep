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

class PreviewBatchCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(PreviewBatchCommand)
    let result

    try {
      result = await this.previewBatch(flags.batchId, flags.datasetId)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async previewBatch(batchId, datasetId) {
    return this.getAdobeAep().previewBatch(batchId, datasetId)
  }
}

PreviewBatchCommand.description = 'Retrieve the list of batches associated with this organization'
PreviewBatchCommand.hidden = false
PreviewBatchCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({char: 'j', hidden: false, description: 'value as json'}),
  yaml: flags.boolean({char: 'y', hidden: false, description: 'value as yaml'}),
  datasetId: flags.string({char: 'i', description: 'The ID of the dataset.', required: true}),
  batchId: flags.string({char: 'b', description: 'The ID of the batch.', required: true}),
}

module.exports = PreviewBatchCommand
