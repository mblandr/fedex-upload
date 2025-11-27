const server = Bun.serve({
	port: 4000,
	async fetch(req) {
		const url = new URL(req.url);

		if (url.pathname === '/') {
			return new Response('bun is worked fine');
		}
		// parse formdata at /action
		if (url.pathname === '/upload') {
			const formdata = await req.formData();
			const document = formdata.get('document');
			console.log('document metadata', document);
			const attachedDocument = formdata.get('attachment');
			console.log('document file', attachedDocument);

			await Bun.write('profilePicture.png', profilePicture);
			return new Response('Success');
		}

		return new Response('Not Found', { status: 404 });
	},
});
