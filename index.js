fetch = require('node-fetch')
data = 'http://localhost:2020/cnames_active.js'
fetch(data).then(x => x.text()).then(x => {
	eval(x)
	data = []
	for (n in cnames_active){
		data.push({
			'id': n,
			'github_pages': cnames_active[n],
			'repo': ''
		})
	}
	for (x of data){
		if (x.id == ''){
			x.id = 'js.org'
		}
	}
	for (x of data){
		if (x.github_pages.includes('github.io')) {
			pisah = x.github_pages.split('/')
			x.repo = `${pisah[0].replace('.github.io', '')}/${pisah[1] ? pisah[1] : pisah[0]}`
		}
	}
	console.log(data)
})