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
const BaseCommand = require('../../about')
const {flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class GetMappingCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(GetMappingCommand)
    let result

    try {
      result = await this.getMapping(flags.mappingsetId, flags.mappingId)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async getMapping(mappingsetId, mappingId) {
    return this.getAdobeAep().getMapping(mappingsetId, mappingId)
  }
}

GetMappingCommand.description = 'Retrieve a mapping'
GetMappingCommand.hidden = false
GetMappingCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({char: 'j', hidden: false, description: 'value as json'}),
  yaml: flags.boolean({char: 'y', hidden: false, description: 'value as yaml'}),
  mappingsetId: flags.string({char: 'i', description: 'The id of the mappingset.', required: true}),
  mappingId: flags.string({char: 'm', description: 'The id of the mapping.', required: true})
}

GetMappingCommand.examples = [
  'aep:mappingsets:mappings:get -i=abc -m=xyz']
module.exports = GetMappingCommand
