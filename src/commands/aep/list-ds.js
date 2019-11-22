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
const BaseCommand = require('./base')
const { flags } = require('@oclif/command')
const { cli } = require('cli-ux')

class ListDatasourcesCommand extends BaseCommand {
  async run () {
    const { flags } = this.parse(ListDatasourcesCommand)
    let result

    try {
      result = await this.listDatasets()
    } catch (error) {
      this.error(error.message)
    }

    // cli.table(result, {
    //   id: {
    //     header: 'Id'
    //   },
    //   name: {
    //     header: 'Name'
    //   },
    //   type: {
    //     header: 'Type'
    //   },
    //   modifiedAt: {
    //     header: 'Modified At'
    //   },
    //   workspace: {
    //     header: 'Workspace'
    //   }
    // }, {
    //   printLine: this.log
    // })
    return result
  }

  async listDatasets () {
    return this.getAdobeAep().listOffers()
  }
}

ListDatasourcesCommand.description = 'Retrieve the list of datasources associated with this organization'

ListDatasourcesCommand.flags = {
  limit: flags.string({ char: 'l', description: 'Defines the number of items to return. Default value is 2147483647.' }),
  offset: flags.string({ char: 'o', description: 'Defines the first offer to return from the list of total offers. Used in conjunction with limit, you can provide pagination in your application for users to browse through a large set of offers.' }),
  sortBy: flags.string({ char: 's', description: 'Defines the sorting criteria on the returned items. You can add a “-” modifier to sort by descending order.' })
}

module.exports = ListDatasourcesCommand
