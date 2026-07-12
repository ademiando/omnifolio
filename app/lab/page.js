
(function initCalculator() {
    // 1. Setup CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .calc-body { background: #000; color: #fff; min-height: 100vh; display: flex; justify-content: center; align-items: flex-end; padding: 20px; font-family: sans-serif; }
        .calc-ui { width: 100%; max-width: 400px; }
        .display { text-align: right; margin-bottom: 20px; }
        .btn-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .btn { height: 70px; border-radius: 50%; border: none; font-size: 20px; background: #1c1c1c; color: white; cursor: pointer; transition: 0.2s; }
        .btn:active { opacity: 0.6; }
        .btn-op { background: #f1a33c; }
        .btn-eq { background: #4f46e5; }
        .btn-func { background: #333; font-size: 16px; }
    `;
    document.head.appendChild(style);

    // 2. Setup Struktur HTML
    const container = document.createElement('div');
    container.className = 'calc-body';
    container.innerHTML = `
        <div class="calc-ui">
            <div class="display">
                <div id="prev" style="color: #666; font-size: 1.2rem; height: 30px;"></div>
                <div id="curr" style="font-size: 3.5rem; overflow: hidden; white-space: nowrap;">0</div>
            </div>
            <div class="btn-grid" id="btn-grid"></div>
        </div>
    `;
    document.body.appendChild(container);

    // 3. Logika Kalkulator
    let expr = '0';
    const currEl = document.getElementById('curr');
    const prevEl = document.getElementById('prev');

    const buttons = [
        ['sin', 'cos', 'tan', 'C'],
        ['log', 'ln', 'xʸ', '⌫'],
        ['7', '8', '9', '÷'],
        ['4', '5', '6', '×'],
        ['1', '2', '3', '-'],
        ['0', ',', '=', '+']
    ];

    const btnGrid = document.getElementById('btn-grid');
    buttons.flat().forEach(text => {
        const b = document.createElement('button');
        b.innerText = text;
        b.className = 'btn ' + (['÷','×','-','+','='].includes(text) ? 'btn-op' : (text === '=' ? 'btn-eq' : 'btn-func'));
        if (text >= '0' && text <= '9' || text === ',') b.className = 'btn';
        
        b.onclick = () => handleInput(text);
        btnGrid.appendChild(b);
    });

    function handleInput(val) {
        if (val === 'C') { expr = '0'; }
        else if (val === '⌫') { expr = expr.length > 1 ? expr.slice(0, -1) : '0'; }
        else if (val === '=') { calculate(); return; }
        else if (['sin','cos','tan','log','ln'].includes(val)) { expr += val + '('; }
        else if (val === 'xʸ') { expr += '**'; }
        else if (val === ',') { expr += '.'; }
        else { expr = (expr === '0' && val !== '.') ? val : expr + val; }
        update();
    }

    function calculate() {
        try {
            let p = expr.replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(').replace(/tan\(/g, 'Math.tan(').replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(');
            prevEl.innerText = expr.replace(/\*/g, '×').replace(/\//g, '÷') + ' =';
            expr = eval(p).toString();
        } catch { expr = 'Error'; }
        update();
    }

    function update() {
        currEl.innerText = expr.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
})();
