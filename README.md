TAO Wallet Extension
description: A lightweight Chrome extension for managing a Bittensor (TAO) wallet.
sections:
  - heading: 🧪 Full-Stack Coding Challenge: Chrome TAO Wallet Extension
    content: Design and implement a Chrome extension that serves as a lightweight Bittensor (TAO) wallet. The extension should provide a user-friendly interface for managing a Bittensor wallet.

  -  ✅ Core Features
    items:
      - Basic Wallet Management:
          - Create a simple UI (`popup.html`) with a clean, modern design
          - Implement a toggle between "Create" and "Import" wallet views
          - Add basic form validation for user inputs
      - Create Wallet:
          - Generate a new wallet using the Bittensor network
          - Display the 12-word mnemonic to the user
          - Implement a simple password protection mechanism
      - Import Wallet:
          - Allow users to input an existing 12-word mnemonic
          - Validate the mnemonic format
          - Implement the same password protection as the create flow
      - Session Management:
          - Implement a "Lock/Unlock" feature to manage the wallet session
          - Store wallet data securely using Chrome's storage APIs
          - Handle basic error cases and user feedback

  -  💡 Bonus Points (Optional)
    items:
      - Add a simple transaction history view
      - Implement basic wallet balance display
      - Add animations for better user experience
      - Use TypeScript for better code organization
      - Add unit tests for core functionality

  - 📦 Deliverables
    items:
      - A functional Chrome Extension with a clean UI
      - Include a `README.md` with:
        - Setup and installation instructions
        - Screenshots of the UI
        - Basic usage instructions

  -  📊 Evaluation Criteria
    items:
      - 🎨 UI/UX implementation and attention to detail
      - 🧱 Code organization and structure
      - 🧪 Understanding of basic security concepts
      - 📝 Documentation quality
      - 🚀 Problem-solving approach

  ## 🧳 Submission
    content: Please submit a public GitHub repository link containing your extension code and the README. Good luck!

  ### ⚙️ Backend Setup (Python + Flask)
    steps:
      - Clone the Repository
      - Install Rust (Required for `bittensor_wallet`):
        - `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
        - `source $HOME/.cargo/env`
        - Ensure Rust is installed with: `rustc --version`
      - Install Python Dependencies: `pip3 install -r requirements.txt`
      - Run the Flask Backend: `python3 wallet.py` (Server starts at http://localhost:3000)

  ### 🧹 Chrome Extension Setup
    steps:
      - Open Chrome Extensions Page: `chrome://extensions/`
      - Enable Developer Mode
      - Click "Load unpacked"
      - Select the `dist/` directory inside the cloned project
      - The extension named **TAO Wallet Extension** should now appear and be usable


## 🧑‍💻 Usage Instructions

### 1. Enter Wallet Name and Password
![Enter wallet name and a user password](images/1.png)
*Enter a wallet name and a user password.*

---

### 2. Backend Wallet Creation
![Wallet creation request sent to Flask server](images/2.png)
*This will redirect a request to the Flask server where actual wallet creation takes place.  
Select and re-enter a password to create your wallet.  
(In future versions, password-based generation and encryption should move to client-side.)*

---

### 3. Wallet Added, Locked View
![Hotkey available but locked](images/3.png)
*Once added, your wallet hotkey (blurred) will be shown.  
You will need the user password you created earlier to unlock it.*

---

### 4. Unlocking Wallet
![Hotkey unlocked after entering password](images/4.png)
*Enter your password to unlock the 12-word mnemonic (hotkey).*

---

### 5. Copying Mnemonic
![Copy the mnemonic to clipboard](images/5.png)
*You can copy the mnemonic from the clipboard.*

---

### 6. Success!
![Mnemonic copied](images/6.png)
*It is copied now — save it somewhere safe!*
