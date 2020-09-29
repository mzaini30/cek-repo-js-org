fetch = require('node-fetch')
fs = require('fs')
// data = 'http://localhost:2020/cnames_active.js'
data = 'https://raw.githubusercontent.com/js-org/js.org/master/cnames_active.js'
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
	kosong = []
	fs.writeFile('hasil.txt', '', () => {})
	angka = 0
	jalankan = setInterval(() => {
		data.splice(angka, angka + 49).map(x => {
			fetch(`https://github.com/${x.repo}`).then(z => z.text()).then(hasil => {
				if (hasil.includes('<title>Page not found')) {
					kosong.push('\n' + 'https://github.com/' + x.repo)
				}
				fs.writeFile('hasil.txt', kosong, () => {})
			})
		})
		angka += 50
		console.log('Loading...')
		if (angka > data.length){
			clearInterval(jalankan)
		}
	}, 5000)
})