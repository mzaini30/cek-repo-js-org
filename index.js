fetch = require('node-fetch')
data = 'http://localhost:2020/cnames_active.js'
fetch(data).then(x => x.text()).then(x => {
	eval(x)
	data = []
	for (n in cnames_active){
		data.push({
			'id': n,
			'github_pages': cnames_active[n]
		})
	}
	for (x of data){
		if (x.id == ''){
			x.id = 'js.org'
		}
	}
	
	console.log(data)
})