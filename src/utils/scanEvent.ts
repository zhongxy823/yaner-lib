let code = '';
let lastTime: number, nextTime, lastCode: number, nextCode;

function scanEvent(e: any, cb: Function) {
  nextCode = e.which;
  nextTime = new Date().getTime();

  if (lastCode != null && lastTime != null && nextTime - lastTime <= 30) {
    code += String.fromCharCode(lastCode);
  } else if (
    lastCode != null &&
    lastTime != null &&
    nextTime - lastTime > 100
  ) {
    code = '';
  }

  lastCode = nextCode;
  lastTime = nextTime;
  if (e.which === 13) {
    cb(code);
    code = '';
  }
}

export { scanEvent };
