const server = Bun.serve({
	port: 4000,
	async fetch(req) {
		const url = new URL(req.url);
		console.log(url.pathname)

		if (url.pathname === '/') {
			return new Response('bun is worked fine');
		}
		// parse formdata at /action
		if (url.pathname === '/upload') {
			try {
			const formdata = await req.formData();
			const metadata = formdata.get('document');
			console.log('document metadata', document);
			const attachedDocument = formdata.get('attachment');
			console.log('document file', attachedDocument);
			const response = {
				metadata,
				attachment: `${attachedDocument}`,
			};
			return Response.json(JSON.stringify(response));
			} catch (e) {
				return Response.json(JSON.stringify({error: `${e}`}));
			}

		}

		return new Response('Not Found', { status: 404 });
	},
});
