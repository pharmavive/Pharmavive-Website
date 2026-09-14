const http = require('http');
const { spawn } = require('child_process');

async function testAdminLogin() {
  const tmp = 'C:\\Users\\naman\\AppData\\Local\\Temp\\chrome_adm_' + Date.now();
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=' + tmp,
    '--remote-debugging-port=9655',
    'http://localhost:3000/admin/signin?mode=login'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const tabs = await new Promise((res, rej) => {
      http.get('http://127.0.0.1:9655/json', r => {
        let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
      }).on('error', rej);
    });

    const pageTab = tabs.find(t => t.type === 'page') || tabs[0];
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise(res => {
        const cur = id++;
        const h = e => {
          const d = JSON.parse(e.data.toString());
          if (d.id === cur) {
            ws.removeEventListener('message', h);
            res(d.result);
          }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: cur, method, params }));
      });
    }

    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.enable');
    await new Promise(r => setTimeout(r, 1000));

    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const emailInput = document.getElementById('login-email');
          const passInput = document.getElementById('login-password');
          const setVal = (el, v) => {
            const proto = Object.getPrototypeOf(el);
            const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
            set.call(el, v);
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          };
          setVal(emailInput, 'admin@pharmavive.com');
          setVal(passInput, 'admin123');
          document.querySelector('button[type="submit"]').click();
        })()
      `
    });

    await new Promise(r => setTimeout(r, 4500));

    const finalState = await send('Runtime.evaluate', {
      expression: '({ href: window.location.href, title: document.title })',
      returnByValue: true
    });
    console.log('Admin Final State:', finalState.result.value);

    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error(err);
    chrome.kill();
    process.exit(1);
  }
}
testAdminLogin();
