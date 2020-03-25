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

class MappingSetsValidateFunctionCommand extends BaseCommand {
  async run() {
    const {flags} = this.parse(MappingSetsValidateFunctionCommand)
    let result

    try {
      result = await this.validateExpression(flags.file)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async validateExpression(file) {
    return this.getAdobeAep().validateExpression(file)
  }
}

MappingSetsValidateFunctionCommand.description = 'Validate an expression. '
MappingSetsValidateFunctionCommand.hidden = false
MappingSetsValidateFunctionCommand.flags = {
  ...BaseCommand.flags,
  json: flags.boolean({char: 'j', hidden: false, description: 'value as json'}),
  yaml: flags.boolean({char: 'y', hidden: false, description: 'value as yaml'}),
  file: flags.string({
    char: 'f',
    description: 'The json file path with expression data'
  }),
}


MappingSetsValidateFunctionCommand.examples = [
  '$ aio aep:mappingsets:functions:validate -f=$filePath',

]

module.exports = MappingSetsValidateFunctionCommand
