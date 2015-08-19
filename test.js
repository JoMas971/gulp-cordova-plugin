'use strict';

/**
 * Test runner for gulp-cordova-plugin.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  19 Aug. 2015
 */

// module dependencies
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    cordova = require('cordova-lib').cordova.raw,
    Q = require('q'),
    gutil = require('gulp-util');

// Use should flavour and use sinon-chai
chai.should();
chai.use(sinonChai);

var preference = require('./');

describe('gulp-cordova-plugin', function() {
    
    beforeEach(function() {
        cordova.plugin = sinon.spy();
    });
    
    describe('Simple plugin', function() {
        
        it('Should add the `cordova-plugin-globalization` plugin', function(done) {
            var stream = preference('cordova-plugin-globalization');
            
            stream.on('end', function() {
                cordova.plugin.should.have.been.calledWithExactly('add', 'cordova-plugin-globalization', {});
                
                done();
            });
            
            stream.on('data', function() {});
            
            stream.end();
        });
        
        it('Should add the `cordova-plugin-globalization@1.0.0` plugin if the version is provided as 2nd argument', function(done) {
            var stream = preference('cordova-plugin-globalization', '1.0.0');
            
            stream.on('end', function() {
                cordova.plugin.should.have.been.calledWith('add', 'cordova-plugin-globalization@1.0.0', {});
                
                done();
            });
            
            stream.on('data', function() {});
            
            stream.end();
        });
        
        it('Should add the `cordova-plugin-globalization@1.0.0` plugin if the version is provided in the object as 2nd argument', function(done) {
            var stream = preference('cordova-plugin-globalization', {version: '1.0.0'});
            
            stream.on('end', function() {
                cordova.plugin.should.have.been.calledWith('add', 'cordova-plugin-globalization@1.0.0', {});
                
                done();
            });
            
            stream.on('data', function() {});
            
            stream.end();
        });
        
        it('Should add the `plugin.google.maps` plugin with variables if the variables are added in the options object', function(done) {
            var vars = {
                'API_KEY_FOR_ANDROID': 'ANDROID_KEY',
                'API_KEY_FOR_IOS': 'IOS_KEY'
            };
            
            var stream = preference('plugin.google.maps', {variables: vars});
            
            stream.on('end', function() {
                cordova.plugin.should.have.been.calledWith('add', 'plugin.google.maps', {cli_variables: vars});
                
                done();
            });
            
            stream.on('data', function() {});
            
            stream.end();
        });
        
        it('Should add the `plugin.google.maps@latest` plugin with variables if the version and variables are added in the options object', function(done) {
            var vars = {
                'API_KEY_FOR_ANDROID': 'ANDROID_KEY',
                'API_KEY_FOR_IOS': 'IOS_KEY'
            };
            
            var stream = preference('plugin.google.maps', {version: 'latest', variables: vars});
            
            stream.on('end', function() {
                cordova.plugin.should.have.been.calledWith('add', 'plugin.google.maps@latest', {cli_variables: vars});
                
                done();
            });
            
            stream.on('data', function() {});
            
            stream.end();
        });
    });
    
    describe('Plugin list', function() {
        
        it('Should call the add plugin method twice if two plugins are provided', function(done) {
            var stream = preference([
                'org.apache.cordova.dialogs',
                'org.apache.cordova.camera'
            ]);
            
            stream.on('end', function() {
                cordova.plugin.should.have.been.calledTwice;
                
                done();
            });
            
            stream.on('data', function() {});
            
            stream.end();
        });
        
        it('Should add the `org.apache.cordova.dialogs` and `org.apache.cordova.camera` plugins', function(done) {
            var stream = preference([
                'org.apache.cordova.dialogs',
                'org.apache.cordova.camera'
            ]);
            
            stream.on('end', function() {
                cordova.plugin.should.have.been.calledWith('add', 'org.apache.cordova.dialogs', {});
                cordova.plugin.should.have.been.calledWith('add', 'org.apache.cordova.camera', {});
                
                done();
            });
            
            stream.on('data', function() {});
            
            stream.end();
        });
        
        it('Should do nothing with the options object if provided', function(done) {
            var stream = preference([
                'org.apache.cordova.dialogs',
                'org.apache.cordova.camera'
            ], {version: '1.0.0', variables: {foo: 'bar'}});
            
            stream.on('end', function() {
                cordova.plugin.should.have.been.calledWith('add', 'org.apache.cordova.dialogs', {});
                cordova.plugin.should.have.been.calledWith('add', 'org.apache.cordova.camera', {});
                
                done();
            });
            
            stream.on('data', function() {});
            
            stream.end();
        });
    });
});