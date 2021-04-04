const colors = require('colors/safe');
const cliProgress = require('cli-progress');

const replapi = require('replapi-it');

const files = require('./utils/filenames');

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

console.clear();
console.log(
	colors.rainbow(`
______ ___________ _                           
| ___ \\  ___| ___ \\ |                          
| |_/ / |__ | |_/ / |     __ _ _ __   __ _ ___ 
|    /|  __||  __/| |    / _\` | '_ \\ / _\` / __|
| |\\ \\| |___| |   | |___| (_| | | | | (_| \\__ \\
\\_| \\_\\____/\\_|  \\_____/\\__,_|_| |_|\\__, |___/
                                      __/ |    
                                     |___/     
`)
);
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

function replLangs(data) {
	if (data.name == 'NotFoundError') {
		return {
			error: "It seems like this Repl doesn't exist."
		};
	}

	if (data.fileNames.length === 0) {
		return {
			error: "It seems like this Repl doesn't have files."
		};
	}

	let fileExtensions = data.fileNames.map(file => {
		return file.split('.').pop();
	});

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

	let result = {
		totalLanguages: fileExtensions.length,
		languageCounts: finalData
	};

	return result;
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

					let data = replLangs(info);
					try {
					  let totalLangs = data.languageCounts.length;
						console.log("\nHere's the Data!");
						console.log(
							colors.underline(`\n\nSummary for "${slug}" by ${username}`)
						);
						for (let i = totalLangs - 1; i > -1; i--) {
							const bar = new cliProgress.SingleBar(
								{
									format: '{bar} {percentage}%'
								},
								cliProgress.Presets.shades_grey
							);
							console.log(`${data.languageCounts[i].name.toUpperCase()}: `);
							bar.start(
								100,
								(
									(data.languageCounts[i].count / data.totalLanguages) *
									100
								).toFixed(1)
							);
							bar.stop();
						}
					} catch (err) {
						console.log('\n\n\n' + data.error);
					}
					console.log('\n\n\n\nThanks for using REPLangs!');
					readline.close();
				}
			);
		}
	);
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.end('Send Get Requests to `/[username]/[slug]`');
});

app.get('/:username/:slug', async (req, res) => {
	let repl = new replapi.Repl(req.params.username, req.params.slug);
	let info = await repl.replRESTData();

	res.end(JSON.stringify(replLangs(info)));
});

app.listen(3000);
