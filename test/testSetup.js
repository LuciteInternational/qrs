'use strict';
var fsUtils = require( 'fs-utils' ),
	path = require( 'path' );

var TestSetup = function () {
	var testConfig = fsUtils.readYAMLSync( path.join( __dirname, './test-config.yml' ) );

	function getTestLoop () {

		var r = {};

		if ( testConfig.authentication.header.enabled ) {
			r['Header authentication'] = [{
				authentication: 'header',
				headerKey: testConfig.authentication.header.headerKey,
				headerValue: testConfig.authentication.header.headerValue,
				virtualProxy: testConfig.authentication.header.virtualProxy,
				port: testConfig.authentication.header.port || testConfig.port
			}]
		}
		if ( testConfig.authentication.ntlm.enabled ) {
			r['Ntlm authentication'] = [{
				authentication: 'ntlm',
				virtualProxy: testConfig.authentication.ntlm.virtualProxy,
				port: testConfig.authentication.ntlm.port || testConfig.port
			}]
		}

		if ( testConfig.authentication.certificates.enabled ) {
			r['Certificates based authentication'] = [{
				authentication: 'certificates',
				headerKey: testConfig.authentication.certificates.headerKey,
				headerValue: testConfig.authentication.certificates.headerValue,
				useSSL: testConfig.authentication.certificates.cert || testConfig.useSSL,
				cert: testConfig.authentication.certificates.cert,
				key: testConfig.authentication.certificates.key,
				ca: testConfig.authentication.certificates.ca,
				passphrase: testConfig.authentication.certificates.passphrase,
				virtualProxy: testConfig.authentication.certificates.virtualProxy,
				port: testConfig.authentication.certificates.port || testConfig.port
			}]
		}

		return r;

	}

	return {
		testLoop: getTestLoop()
	}

};

module.exports = new TestSetup;
