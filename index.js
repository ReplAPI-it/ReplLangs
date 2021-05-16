import express from 'express';
import rateLimit from 'express-rate-limit';
import ReplAPI from 'replapi-it';
import langsAPI from './utils/langsAPI.js';

const app = express();
const replapi = ReplAPI({
	username: 'ReplAPIit',
});

app.use(
	'/*',
	rateLimit({
		windowMs: 5 * 60 * 1000,
		max: 100,
	})
);

app.get('/', (req, res) => {
	res.end('Send Get Requests to `/[username]/[slug]`');
});

app.get('/:username/:slug', async (req, res) => {
	const repl = new replapi.Repl(req.params.username, req.params.slug);
	const info = await repl.replRestfulData();
	const { status, data } = langsAPI(info);
	
	res.status(status).end(JSON.stringify(data));
});

app.listen(3000);
