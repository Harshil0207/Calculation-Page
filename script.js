(function() {
    // Elements
    const body = document.body;
    const themeToggleBtn = document.querySelector('.theme-toggle');

    const bfYesterdayInput = document.getElementById('bfYesterday');
    const cashInput = document.getElementById('cash');
    const googlePayInput = document.getElementById('googlePay');
    const depositInput = document.getElementById('deposit');

    const btnSumBFYesterdayCash = document.getElementById('btnSumBFYesterdayCash');
    const btnSumAll = document.getElementById('btnSumAll');

    const googlePaySection = document.getElementById('googlePaySection');
    const depositSection = document.getElementById('depositSection');

    const resultDisplay = document.getElementById('resultDisplay');
    const bfTomorrowResult = document.getElementById('bfTomorrowResult');

    const card = document.getElementById('card');

    // Enable buttons if inputs filled properly
    function updateBtnStates() {
      btnSumBFYesterdayCash.disabled = !(bfYesterdayInput.value.trim() !== '' && cashInput.value.trim() !== '');
      btnSumAll.disabled = !(btnSumBFYesterdayCash.disabled === false && googlePayInput.value.trim() !== '');
    }

    // Theme toggle
    themeToggleBtn.addEventListener('click', () => {
      const darkModeActive = body.classList.toggle('dark-theme');
      themeToggleBtn.textContent = darkModeActive ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    });

    // Input listeners to enable buttons
    [bfYesterdayInput, cashInput].forEach(input => {
      input.addEventListener('input', () => {
        updateBtnStates();
      });
    });
    googlePayInput.addEventListener('input', () => {
      updateBtnStates();
    });

    // Button 1 click
    btnSumBFYesterdayCash.addEventListener('click', () => {
      const bfYesterday = parseFloat(bfYesterdayInput.value) || 0;
      const cash = parseFloat(cashInput.value) || 0;

      const sum = bfYesterday + cash;
      resultDisplay.textContent = `Total BF Yesterday + Cash: ₹${sum.toFixed(2)}`;

      // Show Google Pay Section and clear previous values
      googlePaySection.style.display = 'block';
      googlePayInput.value = '';
      btnSumAll.disabled = true;

      // Hide deposit section and bfTomorrow
      depositSection.style.display = 'none';
      bfTomorrowResult.textContent = '';

      // Add deposit field enabled status handled later
    });

    // Button 2 click
    btnSumAll.addEventListener('click', () => {
      const bfYesterday = parseFloat(bfYesterdayInput.value) || 0;
      const cash = parseFloat(cashInput.value) || 0;
      const googlePay = parseFloat(googlePayInput.value) || 0;

      const total = bfYesterday + cash + googlePay;
      const cashAndBFYesterday = bfYesterday + cash;

      resultDisplay.textContent = `Total : BF Yesterday + Cash + Google Pay: ₹${total.toFixed(2)}\n`
       resultDisplay.textContent = `BF Yesterday + Cash: ₹${cashAndBFYesterday.toFixed(2)}\n`;

      // Show deposit input section and clear previous deposit
      depositSection.style.display = 'block';
      depositInput.value = '';
      bfTomorrowResult.textContent = '';

      // Listen for deposit input to calculate BF Tomorrow live
    });

    depositInput.addEventListener('input', () => {
      const bfYesterday = parseFloat(bfYesterdayInput.value) || 0;
      const cash = parseFloat(cashInput.value) || 0;
      const deposit = parseFloat(depositInput.value) || 0;

      const bfTomorrow = (bfYesterday + cash) - deposit;

      bfTomorrowResult.textContent = `BF Tomorrow = (BF Yesterday + Cash) - Deposit = ₹${bfTomorrow.toFixed(2)}`;
    });

    // 3D card interaction on mouse move
    card.addEventListener('mousemove', (e) => {
      const bounds = card.getBoundingClientRect();
      const centerX = bounds.left + bounds.width/2;
      const centerY = bounds.top + bounds.height/2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotateX = ((+1) * deltaY / bounds.height * 15).toFixed(2);
      const rotateY = ((-1) * deltaX / bounds.width * 15).toFixed(2);

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });

  })();
