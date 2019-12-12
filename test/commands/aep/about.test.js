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
const config = require('@adobe/aio-cli-config')
const BaseCommand = require('../../../src/commands/aep/about')
beforeEach(() => {
  jest.clearAllMocks()
})

test('getAdobeAep', () => {
  config.get.mockImplementation(() => null)
  expect(function testGetAep () { new BaseCommand().getAdobeAep() }).toThrow(new Error('missing config data: org'))
  config.get.mockImplementation(() => { return {} })
  expect(function testGetAep () { new BaseCommand().getAdobeAep() }).toThrow(new Error('missing config data: jwt-auth.client_id'))
  config.get.mockImplementation(() => {
    return {
      'tenantName': 'aep-tenantName',
      'access_token': 'aep-accessToken'
    }
  })
  expect(function testGetAep () { new BaseCommand().getAdobeAep() }).toThrow(new Error('missing config data: jwt-auth.client_id'))
  config.get.mockImplementation(() => {
    return {
      'tenantName': 'aep-tenantName',
      'access_token': 'aep-accessToken',
      'client_id': 'aep-clientId'
    }
  })
  expect(new BaseCommand().getAdobeAep()).toBeTruthy()
})
