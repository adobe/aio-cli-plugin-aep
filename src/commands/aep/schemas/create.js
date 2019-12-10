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

class CreateSchemasCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateSchemasCommand)
    let result

    try {
      result = await this.createSchema(flags.mixin, flags.title, flags.description, flags.base_class, flags.container, flags.unionschema)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async createSchema(mixin, title, description, baseClass, container, unionschema) {
    return this.getAdobeAep().createSchema(mixin, title, description, baseClass, container, unionschema)
  }
}

CreateSchemasCommand.description = 'Create a dataset. '

CreateSchemasCommand.flags = {
  title: flags.string({char: 't', description: 'Title of class.', required: true}),
  description: flags.string({char: 'd', description: 'Description of class.', required: true}),
  base_class: flags.string({char: 'b', description: 'Base class id.', required: false}),
  container: flags.string({
    char: 'c',
    description: 'The type of container. One of  global, tenant',
    options: ['global', 'tenant'],
    default: 'global',
    required: false,
  }),
  unionschema: flags.boolean({char: 'u', description: 'Title of class.', required: false, default: false}),
}

CreateSchemasCommand.aliases = [
  'aep:schemas:create',
  'aep:schemas:new']
module.exports = CreateSchemasCommand
