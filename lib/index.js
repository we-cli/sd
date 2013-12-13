var exec = require('child_process').exec;

module.exports = function s(argv, done) {
	var cmds = argv.slice(2),
		sudo = exec('sudo ' + argv.join(' '));

	sudo.on('error', function(err) {
		if (done) done(err);
	});
	sudo.on('exit', function() {
		if (done) done(null);
	});
	sudo.on('close', function() {
		if (done) done(null);
	});

	process.stdin.pipe(sudo.stdin);
	sudo.stdout.pipe(process.stdout);

	//sudo.stderr.pipe(process.stderr);
	sudo.stderr.on('data', function(chunk) {
		if (chunk.toString() == 'Sorry, try again.\n') return;
		process.stdout.write(chunk);
	});
}