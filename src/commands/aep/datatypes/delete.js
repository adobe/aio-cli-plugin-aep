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

class DeleteDatatypesCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(DeleteDatatypesCommand)
    let result

    try {
      result = await this.deleteDatatype(flags.datatypeId, flags.container)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async deleteDatatype(datatypeId, container) {
    return this.getAdobeAep().deleteDatatype(datatypeId, container)
  }
}

DeleteDatatypesCommand.description = 'Delete this datatypes.'

DeleteDatatypesCommand.flags = {
  datatypeId: flags.string({char: 'i', description: 'The meta:altId of the datatype.', required: true}),
  container: flags.string({char: 'c', description: 'The type of container. One of  global, tenant', options: ['global', 'tenant'], default: 'global', required: false})
}

DeleteDatatypesCommand.aliases = [
  'aep:datatypes:delete']
module.exports = DeleteDatatypesCommand
