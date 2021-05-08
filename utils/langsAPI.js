import filenames from './filenames.js';

export default function langsAPI(data) {
	if (data.name === 'NotFoundError') {
		return {
			error: "It seems like this Repl doesn't exist.",
		};
	}

	if (data.fileNames.length === 0) {
		return {
			error: "It seems like this Repl doesn't have files.",
		};
	}

	const fileExtensions = data.fileNames.map((file) => {
		const ignored = [
			'.replit',
			'.gitignore',
			'.eslintrc.json',
			'.eslintignore',
			'.prettierrc.json',
			'.prettierignore',
			'package.json',
			'package-lock.json',
			'package-lock.toml',
			'poetry.lock',
		];
		if (!ignored.includes(file)) return file.split('.').pop();
	});

	const fileCount = {};

	for (let i = fileExtensions.length - 1; i > -1; i -= 1) {
		if (fileExtensions[i] !== undefined) {
			if (!fileCount[fileExtensions[i]]) {
				fileCount[fileExtensions[i]] = 1;
			} else {
				fileCount[fileExtensions[i]] += 1;
			}
		}
	}

	const finalData = [];
	for (const [key, value] of Object.entries(fileCount)) {
		if (filenames[key]) {
			finalData.push({ name: filenames[key], count: value });
		} else {
			finalData.push({ name: key, count: value });
		}
	}

	finalData.sort((a, b) => a.count - b.count);

	const result = {
		totalLanguages: fileExtensions.length,
		languageCounts: finalData,
	};

	return result;
}
