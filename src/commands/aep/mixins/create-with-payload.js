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

class CreateMixinsWithPayloadCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateMixinsWithPayloadCommand)
    let result

    try {
      result = await this.createMixinWithPayload(flags.container, flags.file)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async createMixinWithPayload(container, file) {
    return this.getAdobeAep().createMixinWithPayload(container, file)
  }
}

CreateMixinsWithPayloadCommand.description = 'Create a mixin with a payload. '
CreateMixinsWithPayloadCommand.hidden = false
CreateMixinsWithPayloadCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({char: 'j', hidden: false, description: 'value as json'}),
  yaml: flags.boolean({char: 'y', hidden: false, description: 'value as yaml'}),
  file: flags.string({
    char: 'f',
    description: 'The json file path with mixins data'
  }),
  container: flags.string({
    char: 'c',
    description: 'The type of container. One of  global, tenant',
    options: ['global', 'tenant'],
    default: 'global',
    required: false,
  }),
}

CreateMixinsWithPayloadCommand.aliases = [
  'aep:aio:mixins:create-with-payload.js']

CreateMixinsWithPayloadCommand.examples = [
  '$ aep:aio:mixins:create-with-payload.js -f=$filepath',

]
module.exports = CreateMixinsWithPayloadCommand
