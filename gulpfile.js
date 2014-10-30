var gulp = require('gulp');
var fs = require('fs');
var nunjucks = require('nunjucks');
var cheerio = require('cheerio');
var _ = require('lodash');

// ==================================================================
//  TEST
// ==================================================================

var slideMarker    = '# --------------------------------------------------- #';
var subslideMarker = '# ----- #';

gulp.task('md', function () {
  fs.readFile('./generator/presentation.md', 'ascii', function(err, file) {

    var slideSplit = file.split(slideMarker);

    var slides = [];

    _.each(slideSplit, function(slide) {
      var subslideSplit = slide.split(subslideMarker);
      if(subslideSplit.length > 1) {
        subslideSplit = _.filter(subslideSplit, function(item) {
          return item !== '\n' && item !== '\n\n';
        });
        slides.push({
          multi: true,
          slides: subslideSplit
        });
      } else {
        slides.push({
          single: true,
          slide: slide
        });
      }
    });

    var rendered = nunjucks.render('./generator/template.html', { slides: slides });

    fs.readFile('./index.html', { encoding: 'utf8' }, function(err, data) {
      if(err) {
        console.error(err);
      }

      var $ = cheerio.load(data);
      $('.reveal .slides').html(rendered);

      fs.writeFileSync('index.html', $.html());
      return;
    });

  });
});

gulp.task('watch', function () {
  gulp.watch('generator/presentation.md', { interval: 200 }, ['md']);
});

gulp.task('default', ['md', 'watch']);


