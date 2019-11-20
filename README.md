aio-cli-plugin-aep
==================

A plugin for CRUD operations on aep resources



<!-- tocstop -->
# Usage

```



****** Set up necessary adobe I/O dependencies **********
 
1. $ npm install -g @adobe/aio-cli

2. $ npm install -g @adobe/aio-cli-plugin-config

3. $ git clone git@git.corp.adobe.com:bgaurav/aio-cli-plugin-aep.git -b aep1

4. $ cd ${above downloaded repo path}/aio-cli-plugin-aep 

5. $ npm install

****** Set up adobe I/O production integration **********

1. go to <https://console.adobe.io/integrations> and create a production integration for test

2. Follow  the instructions on <https://www.adobe.io/apis/experienceplatform/home/tutorials/alltutorials.html#!api-specification/markdown/narrative/tutorials/authenticate_to_acp_tutorial/authenticate_to_acp_tutorial.md> 
   to get the necessary I/O config credentials

3. Create a config.json file with the following content

{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "jwt_payload": { 
    "exp": your_expiration_time_value,
    "iss": "your-org@AdobeOrg",
    "sub": "your-tech-id@techacct.adobe.com",
    "https://ims-na1.adobelogin.com/s/ent_dataservices_sdk": true,
    "aud": "https://ims-na1.adobelogin.com/c/${your_client_id}"
  },
  "token_exchange_url": "https://ims-na1.adobelogin.com/ims/exchange/jwt/"
}

4. $ aio config:set jwt-auth ${path_to_the_abobe_config.json} --file --json

5. $ aio config:set jwt-auth.jwt_private_key ${path_to_the_private_key_file_used_in_integration}

******** Finally run this simple command to list datasets in your org *****

   $ ./bin/run adobe-aep:list-ds

```
