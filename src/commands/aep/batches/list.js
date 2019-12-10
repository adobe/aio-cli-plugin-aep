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
const { flags } = require('@oclif/command')
const { cli } = require('cli-ux')
class ListBatchesCommand extends BaseCommand {
  async run () {
    const { flags } = this.parse(ListBatchesCommand)
    let result

    try {
      result = await this.listBatches(flags.limit, flags.start, flags.orderBy)
      console.log(result);
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async listBatches (limit = null, start = null, orderBy = null) {
    return this.getAdobeAep().listBatches(limit, start, orderBy)
  }
}

ListBatchesCommand.description = 'Retrieve the list of batches associated with this organization'

ListBatchesCommand.flags = {
  limit: flags.string({ char: 'l', description: 'Limit response to a specified positive number of objects. Ex. limit=10.' }),
  orderBy: flags.string({ char: 'o', description: 'Sort parameter and direction for sorting the response. Ex. orderBy=asc:created,updated.' }),
  start: flags.string({ char: 's', description: 'Returns results from a specific offset of objects. This was previously called offset. Ex. start=3..' })
}

ListBatchesCommand.aliases = [
  'aep:batches:ls',
  'aep:batches:list']
module.exports = ListBatchesCommand
