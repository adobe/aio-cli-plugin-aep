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
const {flags} = require('@oclif/command/lib/index')
const {cli} = require('cli-ux/lib/index')

class CreateMappingsForMappingSetCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateMappingsForMappingSetCommand)
    let result

    try {
      result = await this.createMappings(flags.mappingsetId, flags.sourceSchema, flags.targetSchema, flags.sourceType)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async createMappings(mappingsetId, sourceSchema, targetSchema, sourceType) {
    return this.getAdobeAep().createMappings(mappingsetId, sourceSchema, targetSchema, sourceType)
  }
}

CreateMappingsForMappingSetCommand.description = 'Create a batch. '
CreateMappingsForMappingSetCommand.hidden = false
CreateMappingsForMappingSetCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({char: 'j', hidden: false, description: 'value as json'}),
  yaml: flags.boolean({char: 'y', hidden: false, description: 'value as yaml'}),
  mappingsetId: flags.string({char: 'i', description: 'The id of the mappingset.', required: true}),
  sourceSchema: flags.string({char: 's', description: 'Source XDM schema Id.', required: true}),
  targetSchema: flags.string({char: 'd', description: 'Source XDM schema Id.', required: true}),
  sourceType: flags.string({
    char: 't',
    description: 'The type of file to be ingested in this batch. One of EXPRESSION, STATIC, ATTRIBUTE, JAVASCRIPT',
    options: ['EXPRESSION', 'STATIC', 'ATTRIBUTE', 'JAVASCRIPT'],
    default: 'ATTRIBUTE',
    required: true,
  }),
}

CreateMappingsForMappingSetCommand.aliases = [
  'aep:mappings:create',
  'aep:mappings:new']

CreateMappingsForMappingSetCommand.examples = [
  '$ aio aep:mappings:create ',

]
module.exports = CreateMappingsForMappingSetCommand
