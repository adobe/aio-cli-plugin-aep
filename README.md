aio-cli-plugin-aep
==================

A plugin for CRUD operations on aep resources



<!-- tocstop -->
# Follow the steps below to start using this plugin.





## 1. _Set up necessary adobe I/O dependencies_
 
1. ```$ npm install -g @adobe/aio-cli```

2. ```$ npm install -g @adobe/aio-cli-plugin-config```

3. ```$ npm install -g @adobe/aio-cli-plugin-console```

4. ```$ git clone git@git.corp.adobe.com:bgaurav/aio-cli-plugin-aep.git -b aep2```

5. ```$ cd ${above downloaded repo path}/aio-cli-plugin-aep``` 

6. ```$ aio plugins:link```

## 2. _Set up adobe I/O production integration_

1. Go to  https://console.adobe.io/integrations and create a production integration for test

2. Follow  the instructions on https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md
   
   to get the necessary I/O config credentials

3. Create a config.json file with the following content
```javascript
{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "jwt_payload": { 
    "exp": your_expiration_time_value,
    "iss": "your_org@AdobeOrg",
    "sub": "your_tech_id@techacct.adobe.com",
    "https://ims-na1.adobelogin.com/s/ent_dataservices_sdk": true,
    "aud": "https://ims-na1.adobelogin.com/c/${your_client_id}"
  },
  "token_exchange_url": "https://ims-na1.adobelogin.com/ims/exchange/jwt/"
}
```
4. ```$ aio config:set jwt-auth ${path_to_the_above_config.json} --file --json```

5. ```$ aio config:set jwt-auth.jwt_private_key ${path_to_the_private_key_file_used_in_integration}```

6. ```$ aio config:set x-sandbox-id ${your_sanbox_id}```

7. ```$ aio config:set x-sandbox-name ${your_sanbox_name}```

 I have noticed sometimes access_token is not generated from aio-cli-config module and is a lazy load after the first command. So fire this please:
 
8. ```$ aio console:list-integrations```

## 3. _Finally run this simple command to list datasets in your org_

   ```$ aio aep:ds:list```
 
 Output would look something like...  
  
   ```javascript 1.8
{ 'abc':
   { tags:
      { targetDataSetId: [ 'abc' ],
        'aep/siphon/partitions': [],
        'adobe/pqs/table': [ 'abc' ],
        sandboxId: [ 'abc' ],
        mappingId: [ 'abc' ],
        acp_validationContext: [ 'enabled' ] },
     imsOrg: 'abc@AdobeOrg',
     name: 'Mapping DataSet_abc',
     namespace: 'ACP',
     state: 'DRAFT',
     lastBatchId: 'abc',
     lastBatchStatus: 'success',
     version: '1.0.3',
     created: 1573866068596,
     updated: 1573866132606,
     createdClient: 'acp_foundation_connectors',
     createdUser: 'abc@AdobeID',
     updatedUser: 'acp_foundation_dataTracker@AdobeID',
     lastSuccessfulBatch: 'abc',
     viewId: 'abc',
     aspect: 'production',
     status: 'enabled',
     fileDescription: { persisted: false },
     files:
      '@/dataSets/abc/views/abc/files',
     schemaMetadata: { primaryKey: [], delta: [], dule: [], gdpr: [] },
     schemaRef:
      { id:
         'https://ns.adobe.com/acponboarding/schemas/bac62b237c00c26bd5767d7c55a28fa4',
        contentType: 'application/vnd.adobe.xed-full+json;version=1' },
     streamingIngestionEnabled: 'false' },

...
```


