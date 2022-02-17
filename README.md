aio-cli-plugin-aep
==================

A plugin for CRUD operations on aep resources

<!-- toc -->
* [Getting started](#getting-started)
* [Technical requirements](#technical-requirements)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Getting started

See the [Adobe Developer App Builder docs](https://www.adobe.io/apis/experienceplatform/project-firefly/docs.html)

# Technical requirements

See the [App Builder - Setting up Your Environment doc](https://www.adobe.io/apis/experienceplatform/project-firefly/docs.html#!AdobeDocs/project-firefly/master/getting_started/setup.md)

# Setup

Before we can call any AEP commands we need to first create the project, add the Adobe Experience Platform API to it and setup the Service Account to talk to it.

1. Go to [https://developer.adobe.com/console/home](https://developer.adobe.com/console/home)
2. Click on _Create new project_
3. Click on _Add to Project_ -> _API_ then choose _Adobe Experience Platform_ and click on _Next_
4. Choose _Option 1 - Generate a key pair_ and click on _Generate keypair_
5. Download the _Config_ zip file(note location) and click on _Next_
6. Choose _Launch - techops_ product profile and click on _Save configured API_
7. Now you should see some credential details under _Service Account (JWT)_ section, next you're going to create a JSON file that contains these credential details
```
{
  "client_id": "<copy/paste CLIENT ID>",
  "client_secret": "<copy/paste CLIENT SECRET>",
  "technical_account_id": "<copy/paste TECHNICAL ACCOUNT ID>",
  "meta_scopes": ["ent_reactor_sdk"],
  "ims_org_id": "<copy/paste ORGANIZATION ID>",
  "private_key": "<see next step for this one>"
}
```
8. Unpack the _Config_ zip file and note location of _private.key_
9. Run the following command to turn the contents in this file into one line
```
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' <location of private.key file>
```
10. Copy/paste the contents to `private_key` attribute in the JSON file
11. Next we're going to set the IMS Context with this JSON file
```
aio config:set ims.contexts.jwt <name of JSON file> --file --json
```
12. Run the following command to set the IMS context for authentication
```
aio auth:ctx --set=jwt
```

Now you should be all setup to authenticate and call the AEP commands.

# Usage

```
$ aio auth:login
$ aio aep:datasets:list
```

# Commands
* [`aio aep:datasets:list`](#aio-aep-datasets-list)

## `aio aep:datasets:list`

List AEP datasets

```
List all the AEP datasets

USAGE
  $ aio aep:datasets:list

OPTIONS
  -v, --verbose  Verbose output
```
