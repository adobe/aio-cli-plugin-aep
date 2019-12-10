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

class DeleteDatasourceCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DeleteDatasourceCommand)
    let result

    try {
      result = await this.deleteDataset(flags.datasetId)
      console.log(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async deleteDataset(datasetId) {
    return this.getAdobeAep().deleteDataset(datasetId)
  }
}

DeleteDatasourceCommand.description = 'Delete this dataset.'

DeleteDatasourceCommand.flags = {
  datasetId: flags.string({char: 'i', description: 'The ID of the dataset.', required: true}),
}

DeleteDatasourceCommand.aliases = [
  'aep:ds:delete']
module.exports = DeleteDatasourceCommand
