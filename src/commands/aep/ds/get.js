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

class GetDatasourceCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(GetDatasourceCommand)
    let result

    try {
      result = await this.getDataset(flags.datasetId)
      console.log(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async getDataset(datasetId) {
    return this.getAdobeAep().getDataset(datasetId)
  }
}

GetDatasourceCommand.description = 'Retrieve the detail of one dataset'
GetDatasourceCommand.hidden = false
GetDatasourceCommand.flags = {
  datasetId: flags.string({char: 'i', description: 'The ID of the dataset.', required: true}),
}

GetDatasourceCommand.aliases = [
  'aep:ds:get']
module.exports = GetDatasourceCommand
