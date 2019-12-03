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
const BaseCommand = require('../base')
const {flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class GetBatchesCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(GetBatchesCommand)
    let result

    try {
      result = await this.getBatch(flags.batchId)
      console.log(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async getBatch(datasetId) {
    return this.getAdobeAep().getBatch(datasetId)
  }
}

GetBatchesCommand.description = 'Retrieve the detail of one dataset'

GetBatchesCommand.flags = {
  batchId: flags.string({char: 'i', description: 'The ID of the batch.', required: true}),
}

GetBatchesCommand.aliases = [
  'aep:batches:get']
module.exports = GetBatchesCommand
