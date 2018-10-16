const args = process.argv.slice(2);
const fork = require('child_process').fork;
const chokidar = require('chokidar');

let proc = fork(require.resolve('./_server.js'), args, {
  stdio: 'inherit'
});

function restart() {
  proc.kill();
  proc = fork(require.resolve('./_server.js'), args, {
    stdio: 'inherit'
  });
}

chokidar
  .watch('.', {
    ignoreInitial: true
  })
  .on('all', function() {
    setTimeout(restart, 100);
  });
