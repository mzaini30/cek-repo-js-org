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
	jalankan = () => {
		fetch(`https://github.com/${data[angka].repo}`).then(z => z.text()).then(hasil => {
			console.log(`Cek ${data[angka].repo}`)
			if (hasil.includes('<title>Page not found')) {
				kosong.push('\n' + 'https://github.com/' + data[angka].repo)
			}
			fs.writeFile('hasil.txt', kosong, () => {})
			angka += 1
			if (angka < data.length){
				jalankan()
			}
		})
	}
	jalankan()
})