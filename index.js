const colors = require('colors/safe');
const cliProgress = require('cli-progress');

const replapi = require('replapi-it');

const files = require('./utils/filenames');

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

console.clear();
console.log(colors.rainbow(`
______ ___________ _                           
| ___ \\  ___| ___ \\ |                          
| |_/ / |__ | |_/ / |     __ _ _ __   __ _ ___ 
|    /|  __||  __/| |    / _\` | '_ \\ / _\` / __|
| |\\ \\| |___| |   | |___| (_| | | | | (_| \\__ \\
\\_| \\_\\____/\\_|  \\_____/\\__,_|_| |_|\\__, |___/
                                      __/ |    
                                     |___/     
`));
console.log(colors.italic('Get the amount of languages a Repl has!\n'));

function objectSortByValue(obj) {
	let entries = Object.entries(obj);

	entries.sort(function(a, b) {
		return a.count - b.count;
	});

	let sorted = {};
	for (let i of entries) {
		sorted[i.name] = i.count;
	}

	return sorted;
}

readline.question('Enter anything to get started! \n', enter => {
	console.clear();
	console.log(colors.rainbow('R E P L A N G S!'));
	console.log(colors.italic('Get the amount of languages a Repl has!\n'));

	readline.question(
		colors.underline("Who's Repl Are You Interested In? \n"),
		username => {
			readline.question(
				colors.underline("\nWhat's the Repl's Name? \n"),
				async slug => {
					let repl = new replapi.Repl(username, slug);
					let info = await repl.replRESTData();

					if (info.name == 'NotFoundError') {
						console.log("\nHmm, it seem's this Repl doesn't exist :/");
						process.exit(0);
					}

					let fileExtensions = info.fileNames.map(file => {
						return file.split('.')[1];
					});

					if (fileExtensions.length === 0) {
						console.log('\nThis Repl looks empty :/');
						process.exit(0);
					}

					let fileCount = {};

					for (let i = fileExtensions.length - 1; i > -1; i--) {
						if (!fileCount[fileExtensions[i]]) {
							fileCount[fileExtensions[i]] = 1;
						} else {
							fileCount[fileExtensions[i]] += 1;
						}
					}

					let finalData = [];
					for (const [key, value] of Object.entries(fileCount)) {
						if (files[key]) {
							finalData.push({ name: files[key], count: value });
						} else {
							finalData.push({ name: key, count: value });
						}
					}

					finalData.sort((a, b) => {
						return a.count - b.count;
					});

					console.log("\nHere's the Data!");
					console.log(
						colors.underline(`\n\nSummary for "${slug}" by ${username}`)
					);
					for (let i = finalData.length - 1; i > -1; i--) {
						const bar = new cliProgress.SingleBar(
							{
								format: '{bar} {percentage}%'
							},
							cliProgress.Presets.shades_grey
						);
						console.log(`${finalData[i].name.toUpperCase()}: `);
						bar.start(
							100,
							((finalData[i].count / fileExtensions.length) * 100).toFixed(1)
						);
						bar.stop();
					}
					console.log("\n\n\n\nThanks for using REPLangs!");
					readline.close();
				}
			);
		}
	);
});
