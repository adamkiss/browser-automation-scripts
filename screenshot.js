(async () => {
	const parse = require('url').parse

	const width = parseInt(process.argv[2], 10)
	const url = parse(process.argv[3])
	const file = (url.hostname + url.path).replace(/\//g,' ').trim().replace(/[\s\.]/g,'_')

	const p = await require('puppeteer').launch()
	const page = await p.newPage()

	await page.goto(url.href)
	await page.setViewport({
		width, height: width / 16 * 9
	})
	await page.screenshot({
		path: `out/${file}.jpg`,
		type: 'jpeg',
		quality: 90,
		fullPage: true
	})

	p.close()
})()