/*!
 * qrs <https://github.com/stefanwalther/qrs>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

var chai = require( 'chai' ),
  assert = chai.assert,
  should = chai.should(),
  QRS = new require( './../lib/qrs' ),
  leche = require( 'leche' ),
  withData = leche.withData,
  extend = require( 'extend-shallow' ),
  fsUtils = require( 'fs-utils' ),
  path = require( 'path' ),
  logger = require( './../lib/logger.js' ),
  setup = require( './testSetup' );

var testConfig = fsUtils.readYAMLSync( path.join( __dirname, './test-config.yml' ) );

var globalConfig = {
  host: testConfig.host,
  useSSL: testConfig.useSSL,
  xrfkey: testConfig.xrfkey,
  fiddler: testConfig.fiddler
};
var qrs;

describe( 'qrs object', function () {

  /**
   * Reset the configuration before each test.
   */
  beforeEach( function ( done ) {

    qrs = new QRS( globalConfig );
    done();

  } );

  it( 'should be properly set up', function ( done ) {
    assert( typeof(qrs) === 'object' );
    assert( typeof(qrs.set) === 'function' );
    qrs.getConfig().should.not.be.empty;
    done();
  } );

  it( 'should receive startup params', function ( done ) {

    var qrs2 = new QRS( {host: 'testhost'} );
    var cfg = qrs2.getConfig();
    should.exist( cfg );
    qrs2.getConfig().should.have.property( 'host', 'testhost' );
    done();
  } );

  it( 'should allow to change params', function ( done ) {
    var qrs2 = new QRS( {host: 'testhost'} );
    qrs2.set( 'host', 'testhost2' );
    qrs2.getConfig().should.have.property( 'host', 'testhost2' );
    done();
  } );

  it( 'should properly create URLs', function ( done ) {

    // Default
    qrs.setConfig( {useSSL: false, host: 'myHost', xrfkey: '123456789ABCDEFG', virtualProxy: ''} );
    qrs.getUrl( 'ssl/ping' ).should.equal( 'http://myHost/qrs/ssl/ping/?xrfkey=123456789ABCDEFG' );

    // SSL
    qrs.setConfig( {useSSL: true, host: 'myHost', xrfkey: '123456789ABCDEFG', virtualProxy: ''} );
    qrs.getUrl( 'ssl/ping' ).should.equal( 'https://myHost/qrs/ssl/ping/?xrfkey=123456789ABCDEFG' );

    // Virtual Proxy
    qrs.setConfig( {useSSL: false, host: 'myHost', xrfkey: '123456789ABCDEFG', virtualProxy: 'sso'} );
    qrs.getUrl( 'ssl/ping' ).should.equal( 'http://myHost/sso/qrs/ssl/ping/?xrfkey=123456789ABCDEFG' );

    done();
  } );

} );