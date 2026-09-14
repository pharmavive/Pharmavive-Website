const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

async function verifyProfileFlow() {
  const tmp = 'C:\\Users\\naman\\AppData\\Local\\Temp\\chrome_prof_' + Date.now();
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--user-data-dir=' + tmp,
    '--remote-debugging-port=9677',
    'http://localhost:3000/admin/signin?mode=login'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const tabs = await new Promise((res, rej) => {
      http.get('http://127.0.0.1:9677/json', r => {
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

    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 950, deviceScaleFactor: 1, mobile: false });
    await send('Page.enable');
    await new Promise(r => setTimeout(r, 1000));

    console.log('--- Step 1: Logging in as namansaini.7404@gmail.com ---');
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
          setVal(emailInput, 'namansaini.7404@gmail.com');
          setVal(passInput, '#naman2232');
          document.querySelector('button[type="submit"]').click();
        })()
      `
    });

    // Wait 4 seconds for login & redirect to home
    await new Promise(r => setTimeout(r, 4000));

    console.log('--- Step 2: Navigating to /profile via profile link/icon ---');
    await send('Page.navigate', { url: 'http://localhost:3000/profile' });
    await new Promise(r => setTimeout(r, 2500));

    const profileState = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const nameVal = document.getElementById('profile-name')?.value;
          const emailVal = document.getElementById('profile-email')?.value;
          const instVal = document.getElementById('profile-inst')?.value;
          const roleVal = document.getElementById('profile-role')?.value;
          return { nameVal, emailVal, instVal, roleVal };
        })()
      `,
      returnByValue: true
    });
    console.log('Loaded Profile Fields:', profileState.result.value);

    console.log('--- Step 3: Editing Profile Details ---');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const setVal = (el, v) => {
            if (!el) return;
            const proto = Object.getPrototypeOf(el);
            const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
            set.call(el, v);
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          };
          setVal(document.getElementById('profile-inst'), 'Pharmavive Research & Development Center');
          setVal(document.getElementById('profile-phone'), '+91 63026 16273');
          setVal(document.getElementById('profile-country'), 'India');
          
          // Submit profile form
          const saveBtn = document.querySelector('button[type="submit"]');
          if (saveBtn) saveBtn.click();
        })()
      `
    });

    // Wait for save feedback
    await new Promise(r => setTimeout(r, 2000));

    const savedState = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            bodyText: document.body.innerText.slice(0, 400),
            instVal: document.getElementById('profile-inst')?.value,
            phoneVal: document.getElementById('profile-phone')?.value,
            countryVal: document.getElementById('profile-country')?.value,
          };
        })()
      `,
      returnByValue: true
    });
    console.log('After Saving Profile:', savedState.result.value);

    // Capture screenshot of clean profile dashboard
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    const artifactPath = 'C:\\Users\\naman\\.gemini\\antigravity\\brain\\8189f086-d67d-41b2-abde-9226c470ceac\\customer_profile_clean_header.png';
    fs.writeFileSync(artifactPath, buffer);
    console.log('Saved clean profile screenshot.');

    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    chrome.kill();
    process.exit(1);
  }
}

verifyProfileFlow();
