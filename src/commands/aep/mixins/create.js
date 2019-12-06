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

class CreateMixinsCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateMixinsCommand)
    let result

    try {
      result = await this.createMixin(flags.class, flags.title, flags.description, flags.container)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async createMixin(classId, title, description, container) {
    return this.getAdobeAep().createMixin(classId, title, description, container)
  }
}

CreateMixinsCommand.description = 'Create a dataset. '

CreateMixinsCommand.flags = {
  class: flags.string({
    char: 'i',
    description: 'The type of class this mixin would like to extend.',
    required: false,
  }),
  title: flags.string({char: 't', description: 'Title of class.', required: true}),
  description: flags.string({char: 'd', description: 'Description of class.', required: true}),
  container: flags.string({
    char: 'c',
    description: 'The type of container. One of  global, tenant',
    options: ['global', 'tenant'],
    default: 'global',
    required: false,
  }),
}

CreateMixinsCommand.aliases = [
  'aep:mixins:create',
  'aep:mixins:new']
module.exports = CreateMixinsCommand
