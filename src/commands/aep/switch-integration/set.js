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
const config = require('@adobe/aio-cli-config')
const configCore = require('@adobe/aio-lib-core-config')
const fs = require('fs')
const os = require('os')
const path = require('path')
class SwitchIoIntegrationConfiguration extends BaseCommand {
  async run() {
    const {flags} = this.parse(SwitchIoIntegrationConfiguration)
    let result

    try {
      result = await this.switchConfig(flags.name)
      this.printObject(result)
    } catch (error) {
      this.error(error.message)
    }
    return result
  }

  async switchConfig(name) {
    const homedir = require('os').homedir();
    var filePathToRead = path.join(homedir, name, 'config.json')
    try {
      const rawdata = fs.readFileSync(filePathToRead, 'utf8')
      const expressionPayload = JSON.parse(rawdata)
      configCore.delete('jwt-auth')
      configCore.set('jwt-auth', expressionPayload)
      return 'Successfully switched to integration '+ name
    } catch (err) {
      console.error(err)
      return err.toString()
    }

  }
}

SwitchIoIntegrationConfiguration.description = 'Switch an integration. '
SwitchIoIntegrationConfiguration.hidden = false
SwitchIoIntegrationConfiguration.flags = {
  ...BaseCommand.flags,
  name: flags.string({
    char: 'n',
    description: 'The name of the integration. It is the name of the folder where you have a psecfic config.json file', required: true
  }),
}



SwitchIoIntegrationConfiguration.examples = [
  '$ aio aep:switch-config:set -n=abc',

]
module.exports = SwitchIoIntegrationConfiguration
