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

module.exports = {
  mockConfig: {
    client_id: 'aep-clientId',
    access_token: 'aep-accessToken',
    tenantName: 'aep-tenantName',
  },
  mockPayload : {
    'abc': {
      'status': 'active',
      'inputFormat': {
        'format': 'parquet',
      },
      'createdUser': 'abc@techacct.adobe.com',
      'imsOrg': 'abc@AdobeOrg',
      'createdClient': 'abc',
      'updatedUser': 'abc@techacct.adobe.com',
      'version': '1.0.0',
      'created': 1576108528538,
      'updated': 1576108528538,
    },
  }
}

