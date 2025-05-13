document.addEventListener("DOMContentLoaded", () => {
  // === UI References ===
  const toggleCreateBtn = document.getElementById("toggle-create")!;
  const toggleImportBtn = document.getElementById("toggle-import")!;
  const createView = document.getElementById("create-view")!;
  const importView = document.getElementById("import-view")!;
  const output = document.getElementById("output")!;

  const createWalletBtn = document.getElementById("create-wallet")!;
  const importWalletBtn = document.getElementById("import-wallet")!;
  const walletNameInput = document.getElementById("wallet-name") as HTMLInputElement;
  const createError = document.getElementById("create-error")!;
  const importError = document.getElementById("import-error")!;

  // === View Switcher ===
  function switchView(showCreate: boolean) {
    // Toggle views
    createView.style.display = showCreate ? "block" : "none";
    importView.style.display = showCreate ? "none" : "block";

    // Clear output area
    output.textContent = "";

    // Clear all inputs
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });

    // Reset error messages
    createError.textContent = "";
    importError.textContent = "";
  }

  toggleCreateBtn.addEventListener("click", () => switchView(true));
  toggleImportBtn.addEventListener("click", () => switchView(false));

  // === Wallet Creation Handler ===
  createWalletBtn.addEventListener("click", async () => {
    const name = walletNameInput.value.trim();
    const password = (document.getElementById("wallet-password") as HTMLInputElement).value;

    if (name === "" || password === "") {
      createError.textContent = "Wallet name and password cannot be empty.";
      return;
    }

    createError.textContent = "";

    try {
      const response = await fetch("http://localhost:3000/create_bittensor_wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
        mode: "cors",
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (data.success) {
        // Store password locally (temp)
        chrome.storage.local.set({ [`wallet-password-${name}`]: password });

        // Show wallet details
        output.innerHTML = `
          <p><strong>Coldkey Address:</strong> ${data.wallet.coldkey_address}</p>
          <p><strong>Hotkey Address:</strong> ${data.wallet.hotkey_address}</p>
          <p><strong>Mnemonic:</strong> 
            <span id="mnemonic-text" style="filter: blur(6px); user-select: none;">${data.wallet.hotkey_mnemonic}</span>
            <button id="copy-mnemonic" class="copy-btn" disabled>
              <i class="fas fa-clipboard"></i>
            </button>
          </p>
          <input type="password" id="mnemonic-password" placeholder="Enter password to unlock" />
          <button id="unlock-btn">Unlock</button>
        `;

        // Unlock + Copy Mnemonic logic
        const copyBtn = document.getElementById("copy-mnemonic") as HTMLButtonElement;
        const mnemonicTextEl = document.getElementById("mnemonic-text")!;
        const passwordInput = document.getElementById("mnemonic-password") as HTMLInputElement;
        const unlockBtn = document.getElementById("unlock-btn")!;

        unlockBtn.addEventListener("click", () => {
          //validate session password
          chrome.storage.local.get(`wallet-password-${name}`, (result) => {
            const storedPassword = result[`wallet-password-${name}`];
            const enteredPassword = passwordInput.value;

            if (enteredPassword === storedPassword) {
              mnemonicTextEl.setAttribute("style", "filter: none;");
              copyBtn.disabled = false;
              alert("Mnemonic unlocked!");
            } else {
              alert("Incorrect password.");
            }
          });
        });

        copyBtn.addEventListener("click", () => {
          const mnemonic = mnemonicTextEl.textContent || "";
          navigator.clipboard.writeText(mnemonic).then(() => {
            alert("Mnemonic copied to clipboard!");
          }).catch((err) => {
            console.error("Error copying text: ", err);
          });
        });

      } else {
        createError.textContent = "Wallet creation failed.";
      }
    } catch (err) {
      createError.textContent = "Error: " + (err instanceof Error ? err.message : "Something went wrong.");
    }
  });

  // === Wallet Import Handler ===
  importWalletBtn.addEventListener("click", () => {
    const name = (document.getElementById("wallet-name-import") as HTMLInputElement).value.trim();
    const mnemonic = (document.getElementById("wallet-mnemonic") as HTMLTextAreaElement).value.trim();
    const password = (document.getElementById("wallet-password-import") as HTMLInputElement).value;

    
    if (!name || !mnemonic || !password) {
      importError.textContent = "All fields are required.";
      return;
    }

    // mneumonic validation
    const words = mnemonic.split(/\s+/);
    if (words.length !== 12) {
      importError.textContent = "Mnemonic must be exactly 12 words.";
      return;
    }

    // Store mnemonic and password in Chrome storage, later permanant solution must be found
    chrome.storage.local.set({
      [`wallet-mnemonic-${name}`]: mnemonic,
      [`wallet-password-${name}`]: password,
    }, () => {
      importError.textContent = "";
      (document.getElementById("wallet-name-import") as HTMLInputElement).value = "";
      (document.getElementById("wallet-mnemonic") as HTMLTextAreaElement).value = "";
      (document.getElementById("wallet-password-import") as HTMLInputElement).value = "";

      // Fake balance + transactions (TODO: API integration, running out of time here)
      output.innerHTML = `
        <p><strong>Wallet Imported Successfully!</strong></p>
        <p>Welcome to your wallet, <strong>${name}</strong>.</p>

        <div class="wallet-balance">
          <p><strong>Balance:</strong> 42.1337 TAO</p>
        </div>

        <div class="transaction-history">
          <p><strong>Transaction History:</strong></p>
          <ul>
            <li>
              <span class="tx-date">2025-05-10</span>
              <span class="tx-action">Received</span>
              <span class="tx-amount">+5.0000 TAO</span>
              <span class="tx-party">From: Validator X</span>
            </li>
            <li>
              <span class="tx-date">2025-05-09</span>
              <span class="tx-action">Sent</span>
              <span class="tx-amount">-1.2500 TAO</span>
              <span class="tx-party">To: Node Y</span>
            </li>
            <li>
              <span class="tx-date">2025-05-08</span>
              <span class="tx-action">Received</span>
              <span class="tx-amount">+10.0000 TAO</span>
              <span class="tx-party">From: Subtensor"</span>
            </li>
          </ul>
        </div>
      `;
    });
  });

  // === Error Reset Listeners ===

  walletNameInput.addEventListener("input", () => {
    if (walletNameInput.value.trim() !== "") {
      createError.textContent = "";
    }
  });

  (document.getElementById("wallet-password-import") as HTMLInputElement).addEventListener("input", () => {
    const val = (document.getElementById("wallet-password-import") as HTMLInputElement).value;
    if (val !== "") {
      createError.textContent = "";
    }
  });

  (document.getElementById("wallet-name") as HTMLInputElement).addEventListener("input", () => {
    importError.textContent = "";
  });

  (document.getElementById("wallet-mnemonic") as HTMLTextAreaElement).addEventListener("input", () => {
    importError.textContent = "";
  });

  (document.getElementById("wallet-password") as HTMLInputElement).addEventListener("input", () => {
    importError.textContent = "";
  });
});
