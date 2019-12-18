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

class DeleteBatchesCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DeleteBatchesCommand)
    let result

    try {
      result = await this.deleteBatch(flags.batchId)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async deleteBatch(batchId) {
    return this.getAdobeAep().deleteBatch(batchId)
  }
}

DeleteBatchesCommand.description = 'Delete this batch.'
DeleteBatchesCommand.hidden = false
DeleteBatchesCommand.flags = {
  batchId: flags.string({char: 'i', description: 'The ID of the batch.', required: true}),
}

DeleteBatchesCommand.aliases = [
  'aep:batches:delete']

module.exports = DeleteBatchesCommand
