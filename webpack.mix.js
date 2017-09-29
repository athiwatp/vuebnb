const mix = require('laravel-mix');
mix
  .js('resources/assets/js/app.js', 'public/js')
  .styles([
    'node_modules/font-awesome/css/font-awesome.css',
    'resources/assets/css/style.css'
  ], 'public/css/style.css')
  .copy('node_modules/font-awesome/fonts',  'public/fonts')
  .copy('resources/assets/images', 'public/images')
;
