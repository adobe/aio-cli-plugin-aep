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

class CreateDatasourceCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateDatasourceCommand)
    let result

    try {
      result = await this.createDataset(flags.name, flags.description, flags.xdm)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async createDataset(name, description, xdm) {
    return this.getAdobeAep().createDataset(name, description, xdm)
  }
}

CreateDatasourceCommand.description = 'Create a dataset. '
CreateDatasourceCommand.hidden = false
CreateDatasourceCommand.flags = {
  name: flags.string({char: 'n', description: 'Name of dataset.', required: true}),
  description: flags.string({char: 'd', description: 'Description of dataset.', required: true}),
  xdm: flags.string({char: 'x', description: 'Xdm schema ID.', required: true}),
}

CreateDatasourceCommand.aliases = [
  'aep:datasets:create',
  'aep:datasets:new']
module.exports = CreateDatasourceCommand
