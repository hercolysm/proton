console.log("Iniciando o aplicativo...");

const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', ()=>{

	// cria nova janela
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		devTools: true
		//BrowserWindow.webContents.openDevTools()
	});

	win.on('closed', () => {
		win = null;
	});

	//win.loadURL('https://www.github.com'); // carrega uma página web
	
	win.loadURL(`file://${__dirname}/index.html`); // carrega um arquivo local

	setTimeout(function() {
		let string = document.getElementById('teste');
		console.log(string);
	});
});
