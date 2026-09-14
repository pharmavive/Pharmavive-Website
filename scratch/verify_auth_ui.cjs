const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

async function verifyAuthUI() {
  const tmp = 'C:\\Users\\naman\\AppData\\Local\\Temp\\chrome_auth_' + Date.now();
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=' + tmp,
    '--remote-debugging-port=9633',
    'http://localhost:3000/admin/signin?mode=login'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const tabs = await new Promise((res, rej) => {
      http.get('http://127.0.0.1:9633/json', r => {
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send('Page.enable');
    await new Promise(r => setTimeout(r, 1500));

    console.log('Filling in login form with namansaini.7404@gmail.com...');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const emailInput = document.getElementById('login-email');
          const passInput = document.getElementById('login-password');
          
          if (emailInput && passInput) {
            const setVal = (el, v) => {
              const proto = Object.getPrototypeOf(el);
              const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
              set.call(el, v);
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            };
            setVal(emailInput, 'namansaini.7404@gmail.com');
            setVal(passInput, '#naman2232');
            return true;
          }
          return false;
        })()
      `
    });

    await new Promise(r => setTimeout(r, 500));

    console.log('Submitting login form...');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('button[type="submit"]');
          if (btn) {
            btn.click();
            return true;
          }
          return false;
        })()
      `
    });

    // Wait for login response and UI feedback + redirect
    await new Promise(r => setTimeout(r, 4500));

    const checkSuccess = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            url: window.location.href,
            bodyText: document.body.innerText.substring(0, 300)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Post-login status:', checkSuccess.result.value);

    // Capture screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    const artifactPath = 'C:\\Users\\naman\\.gemini\\antigravity\\brain\\8189f086-d67d-41b2-abde-9226c470ceac\\auth_logged_in_state.png';
    fs.writeFileSync(artifactPath, buffer);
    console.log('Saved screenshot to:', artifactPath);

    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    chrome.kill();
    process.exit(1);
  }
}

verifyAuthUI();
