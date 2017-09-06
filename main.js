console.log("Iniciando o aplicativo...")

// constantes

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

// variaveis globais

let win

// eventos

app.on('ready', criarJanela)

app.on('window-all-closed', () => {
	// se nao for MAC
	if(process.platform !== 'darwin'){
		app.quit() // tenta fechar todas as janelas
	}
})

app.on('activate', () => {
	if(win === null){
		criarJanela() // MAC
	}
})


// funções

function criarJanela(){

	// cria nova janela
	win = new BrowserWindow({
		width: 800,
		height: 600,
		devTools: true
	})

	// carrega o arquivo
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))
	// ou
	//win.loadURL('https://www.github.com') // carrega uma página web
	// ou
	//win.loadURL(`file://${__dirname}/index.html`) // carrega um arquivo local
	
	// abre devtools
	win.webContents.openDevTools()

	// quando a janela for fechada
	win.on('closed', () => {
		win = null
	})

	win.webContents.on('dom-ready', () => {
		console.log('DOM carregado!')
		// mostra alerta js
		win.webContents.executeJavaScript(
			`alert('DOM carregado!');`
		)
		win.webContents.printToPDF({}, (error, data) => {
			if (error) throw error
			fs.writeFile('/tmp/print.pdf', data, (error) => {
				if (error) throw error
				console.log('Arquivo PDF gerado com sucesso!')
			})
		})
	})

	win.webContents.on('did-fail-load', () => {
		console.log('Erro ao carregar a página!')
	})

	win.webContents.on('did-finish-load', () => {
		console.log('Carregamento finalizado!')

		win.webContents.send('ping', 'Teste de envio de mensagem. Isso funciona!')
	})


}