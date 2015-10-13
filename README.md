# qrs [![NPM version](https://badge.fury.io/js/qrs.svg)](http://badge.fury.io/js/qrs)

> Node.js library to communicate with Qlik Sense Repository Service (QRS) API.

## Installation

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i qrs --save
```

***

<!-- toc -->

* [Usage](#usage)
* [Configuration Options](#configuration-options)
* [Prepare Qlik Sense server](#prepare-qlik-sense-server)
* [API](#api)
* [Examples](#examples)
* [Running tests](#running-tests)
* [Contributing](#contributing)
* [Author](#author)
* [License](#license)

_(Table of contents generated by [verb])_

<!-- tocstop -->

***

## Usage

```js
var QRS = require('qrs');
var config = {
    "host": 'qsSingle',
    "useSSL": false,    
    "xrfkey": 'ABCDEFG123456789',
    "authentication": "header",
    "headerKey": 'hdr-usr',
    "headerValue": 'qsSingle\\swr'      
};
var qrs = new QRS( config );

// Now run your command like
qrs.get('about', function( data ) {
    
    // do something with the result
    
});
```

## Configuration Options

The configuration passed to the constructor of _qrs_ drives how authentication is handled.

### Typical configurations

**Example using Windows authentication**

(TBD)

**Example using header authentication**

```javascript
var config = {
    host: 'server.mydomain.com',
    useSSL: true,
    authentication: 'header',
    virtualProxy: 'hdr',
    headerKey: 'hdr-usr',
    headerValue: 'mydomain\\justme'
}; 
```

**Example using certificates**

```js
var config = {
    host: 'server.mydomain.com',
    useSSL: true,
    authentication: 'certificates',
    cert: 'C:\\CertStore\\client.pem',
    key: 'C:\\CertStore\\client_key.pem',
    ca: 'C:\\CertStore\\root.pem',
    port: 4242,
    headerKey: 'X-Qlik-User',
    headerValue: 'UserDirectory:Internal;UserId:sa_repository'
};
```

### All options

* **`host`** - Qualified / fully qualified name or IP-address of the server where the Qlik Sense Repository server is running on, defaults to "`127.0.0.1`"
* **`useSSL`** - Whether to use SSL or not, defaults to `false`.
* **`authentication`** - Authentication method, can be "`windows`", "`certificates`" or "`header`", defaults to "`windows`".
* **`headerKey`** -
* **`headerValue`** -
* **`virtualProxy`** - Name of the virtual proxy.
* **`port`** - Port to be used.

## Prepare Qlik Sense server

There are several options to ensure that communication between this node.js module and Qlik Sense server is working properly:

* 
**Authenticating with a server certificate** - See http://help.qlik.com/sense/2.1/en-us/developer/Subsystems/RepositoryServiceAPI/Content/RepositoryServiceAPI/RepositoryServiceAPI-Connect-API-Authenticate-Reqs-Certificate.htm
* 
**Authenticating with HTTP headers** - See http://help.qlik.com/sense/2.1/en-us/developer/Subsystems/RepositoryServiceAPI/Content/RepositoryServiceAPI/RepositoryServiceAPI-Connect-API-Authenticate-Reqs-Http-Headers.htm

## API

### [qrs](lib%5Cqrs.js#L34)

Work with Qlik Sense's REST based Repository API (qrs) from within node.js.

**Configuration options:**

**Params**

* `qrsConfig` **{Object}**: Global configuration options

**Example**

```js
var QRS = require('qrs');
var config =  {

var qrs = new QRS( config );
```

### [.setConfig](lib%5Cqrs.js#L56)

Set global configurations options for qrs. Can be used to change the configuration options after `qrs` has been initialized.

**Params**

* `qrsConfig` **{Object}**: Global configuration options

### [.getConfig](lib%5Cqrs.js#L69)

Return the current configuration options.

* `returns` **{qrsConfig}**: qrsConfig Configuration object.

### [.set](lib%5Cqrs.js#L86)

Change a single configuration property.

**Example:**

**Params**

* **{}**: key {string} Key of the property
* **{}**: val {Object} Value

**Example**

```js
qrs.set('host', 'myhost.domain.com');
```

### [.getConfigValue](lib%5Cqrs.js#L96)

Retrieve a single configuration property.

**Params**

* **{}**: key {String}  Key of the property
* `returns` **{*}**: Value of the requested property, otherwise undefined.

### [.getUrl](lib%5Cqrs.js#L108)

Return the Url for the REST call considering the given configuration options

**Params**

* **{}**: endpoint {string} Endpoint for the qrs call.
* **{}**: {{String,String}[]} params Additional URL parameters as key/value array.
* `returns` **{String}**: The constructed Url.

### [.request](lib%5Cqrs.js#L176)

(Internal) generic method to send requests to QRS. Typically this method is only used internally, use `get`, `post`, `put` or `delete`.

**Params**

* `method` **{String}**: Http method, can be `GET`, `POST`, `PUT` or `DELETE` (defaults to `GET`).
* `endpoint` **{String}**: Endpoint to be used. Check the online documentation of the Qlik Sense Repository API to get a list of all endpoints available.
* `urlParams` **{String[]}**: Additional URL parameters, defined as key/value array.
* `body` **{Object}**: JSON object to be used as the body for the Http request.
* `returns` **{promise}**: Returns a promise.

**Example**

```js
var QRS = require('qrs');

var qrsConfig = ...; // Set configuration options
var qrs = new QRS( qrsConfig );

qrs.request( 'GET', 'about', null, null)
   .then( function( data ) {
            console.log( 'about', data );
        }, function ( err ) {
            console.error( 'An error occurred: ', err);
        });
```

### [.post](lib%5Cqrs.js#L243)

Same as `request()` but with `method: 'POST'`.

**Params**

* `endpoint` **{String}**: QRS endpoint to be used.
* **{String[]}**: urlParams Additional URL parameters, defined as key/value array.
* **{Object}**: body Body to be posted, defined as JSON object.
* `returns` __{_|promise}_*

### [.delete](lib%5Cqrs.js#L256)

Same as `request()` but with `method: 'DELETE'`.

**Params**

* **{}**: endpoint
* **{}**: id
* **{}**: urlParams
* `returns` __{_|promise}_*

### [.put](lib%5Cqrs.js#L271)

Same as `request()` but with `method: 'PUT'`.

**Params**

* **{}**: endpoint
* **{}**: id
* **{}**: urlParams
* **{}**: body
* `returns` __{_|promise}_*

### [.plugins](lib%5Cqrs.js#L286)

Returns an array of loaded plugins. Use `registerPlugin()` to load a plugin.

## Examples

### Using the generic `query`

(TBD)

### Using `get`

(TBD)

### Using `delete`

(TBD)

### Using `put`

(TBD)

### Retrieving all endpoints

(TBD)

### Get a list of all extensions

(TBD)

### Upload an extension

(TBD)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/stefanwalther/qrs/issues/new).

## Author

**Stefan Walther**

+ [qliksite.io](http://qliksite.io)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)
* [github.com/stefanwalther](http://github.com/stefanwalther)

## License

Copyright © 2015 Stefan Walther
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 13, 2015._