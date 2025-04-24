# 🧪 Full-Stack Coding Challenge: Chrome TAO Wallet Extension

## 📘 Overview

Design and implement a Chrome extension that serves as a lightweight Bittensor (TAO) wallet. The extension must support **creating** and **importing** a wallet using a mnemonic phrase and securely storing it **encrypted client-side**.

---

## ✅ Core Features

### 1. Create Wallet
- Generate a new wallet compatible with the Bittensor network (`sr25519` keypair).
- Display the **12-word mnemonic** to the user.
- Prompt the user to set a password for encryption.

### 2. Import Wallet
- Allow the user to **input an existing 12-word mnemonic**.
- Prompt the user to set a password for encryption.

### 3. Encrypt & Store
- Use **AES-GCM** or **AES-CBC** via the **Web Crypto API**.
- Encrypt the private key or full keypair using a key derived from the user’s password.
- Store encrypted data in `chrome.storage.local` or `IndexedDB`.
- Do **not** store passwords.
- Use **PBKDF2**, **scrypt**, or **Argon2** to hash and salt the password for key derivation.

---

## 🔐 Security Requirements

- Password should **never be stored in plaintext**.
- Use proper salting and hashing (e.g., PBKDF2 with SHA-256).
- Follow best practices around secure cryptographic key storage and retrieval.

---

## 💡 Bonus Points (Optional but Impressive)

- Add a simple UI (`popup.html`) to toggle between "Create" and "Import" views.
- Implement a "Lock/Unlock" session state.
- Add mnemonic validation (e.g., using `bip39`).
- Use `@polkadot/util-crypto` or a Bittensor-compatible key generation library.
- Add TypeScript support with clear types and interfaces.

---

## 📦 Deliverables

- A fully functional Chrome Extension.
- Include a `README.md` with:
  - Setup and installation instructions.
  - Any assumptions made.
  - How to test each flow (create/import).

---

## 📊 Evaluation Criteria

- 🧠 Security hygiene (passwords, encryption, Web Crypto usage)
- 🧱 Code structure and modularity
- ⚙️ Understanding of Chrome extension architecture (manifest, background, popup, content)
- 🧪 Testability and clarity of flows
- 🎨 Bonus: User interface polish and UX design

---

## 🧳 Submission

Please submit a GitHub repository link or a ZIP archive containing your extension code and the README.

Good luck!
