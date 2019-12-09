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

class CreateDatatypesCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(CreateDatatypesCommand)
    let result

    try {
      var property = flags.properties.toString().split('*')
      var propName = property[0]
      var propValue = property[1]
      result = await this.createDatatypes(flags.title, flags.description, flags.container, propName, propValue)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async createDatatypes(title, description, container, propName, propValue) {
    return this.getAdobeAep().createDatatype(title, description, container,  propName, propValue)
  }
}

CreateDatatypesCommand.description = 'Create a datatype. '

CreateDatatypesCommand.flags = {
  title: flags.string({char: 't', description: 'Title of datatype.', required: true}),
  description: flags.string({char: 'd', description: 'Description of datatype.', required: true}),
  container: flags.string({
    char: 'c',
    description: 'The type of container. One of  global, tenant',
    options: ['global', 'tenant'],
    default: 'global',
    required: false,
  }),
  properties: flags.string({
    char: 'p',
    description: 'Please provide one property in this format propertyName*propertyValue ',
    default: 'global',
    multiple: false,
    required: true,
  }),
}

CreateDatatypesCommand.aliases = [
  'aep:datatypes:create',
  'aep:datatypes:new']
module.exports = CreateDatatypesCommand
