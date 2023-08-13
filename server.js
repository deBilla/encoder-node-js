const ffmpeg = require('fluent-ffmpeg');

const inputPath = 'input.mp4';
const outputPath = 'output_dash/output.mpd';
const scaleOptions = ['scale=1280:720', 'scale=640:320'];
const videoCodec = 'libx264';
const x264Options = 'keyint=24:min-keyint=24:no-scenecut';
const videoBitrate = '2000k';

ffmpeg()
  .input(inputPath)
  .videoFilters(scaleOptions)
  .videoCodec(videoCodec)
  .addOption('-x264opts', x264Options)
  .videoBitrate(videoBitrate)
  .format('dash')
  .output(outputPath)
  .on('end', () => {
    console.log('DASH encoding complete.');
  })
  .on('error', (err) => {
    console.error('Error:', err.message);
  })
  .run();