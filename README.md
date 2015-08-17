# gulp-cordova-plugin

> Add plugins to your cordova project.

## Installation

```bash
npm install --save-dev gulp-cordova-plugin
```

## Usage

The following example will add three plugins to the cordova project. The `plugin.google.maps` plugin expects two extra
variables.

```javascript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(plugin('org.apache.cordova.dialogs'))
        .pipe(plugin('org.apache.cordova.camera'))
        .pipe(plugin('plugin.google.maps', {variables: {'API_KEY_FOR_ANDROID': 'xxx', 'API_KEY_FOR_IOS': 'xxx'}}));
});
```

You can also pass an array of plugins instead of one plugin at a time.

```javascript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(plugin([
            'org.apache.cordova.dialogs',
            'org.apache.cordova.camera'
        ]));
});
```

This method is faster because it adds the plugins in parallel instead of in series. The downside on the other hand is that you can't provide
an options object for a plugin.

A third way of adding plugins is by passing an object with the name of the plugin as key and an options object as value.

```javascript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(plugin({
            'org.apache.cordova.dialogs': true
            'org.apache.cordova.camera': true,
            'plugin.google.maps': {variables: {'API_KEY_FOR_ANDROID': 'xxx', 'API_KEY_FOR_IOS': 'xxx'}}
        }));
});
```

This approach is fast because it adds the plugins in parallel and the benefit is that you can pass in an options object.

## API

### plugin(plugin [, options])

#### plugin

*Required*  
Type: `string`

The plugin that should be added to the project.

#### options

Type: `object`

Extra options for the plugin that should be added.

### plugin(plugins)

#### plugins

*Required*  
Type: `string[]`

A list of plugins that should be added to the project.

### plugin(plugins)

#### plugins

*Required*  
Type: `object`

The key of the object is the name of the plugin and the value is either `true` or an options object.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
