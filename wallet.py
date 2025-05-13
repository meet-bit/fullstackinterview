from flask import Flask, request, jsonify
from flask_cors import CORS
from bittensor_wallet import Wallet
import os
import json
import logging

app = Flask(__name__)
CORS(app, origins="*")  # Allow all origins to bypass CORS later change it to specific extension


# Set up logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/create_bittensor_wallet', methods=['POST'])
def create_wallet():
    logging.debug("Request received")

    try:
        data = request.get_json()
        wallet_name = data.get("name")
        #I think hotkey name is optional, can remove it rn not messing around with it and moving on!
        hotkey_name = "test"

        if not wallet_name:
            return jsonify({"error": "Wallet name, password, and hotkey name are required"}), 400

        # Use present working directory for wallet path
        wallet_path = os.path.join(os.getcwd(), "wallets")

        # Create wallet
        wallet = Wallet(name=wallet_name, path=wallet_path, hotkey=hotkey_name)
        wallet.create()

        # Construct file paths
        hotkey_file = os.path.join(wallet_path, wallet_name, "hotkeys", hotkey_name)
        coldkeypub_file = os.path.join(wallet_path, wallet_name, "coldkeypub.txt")

        # Load hotkey JSON (includes secretPhrase)
        with open(hotkey_file, 'r') as f:
            hotkey_data = json.load(f)

        # Load coldkeypub JSON (no mnemonic)
        with open(coldkeypub_file, 'r') as f:
            coldkeypub_data = json.load(f)

        # Extract values
        hotkey_mnemonic = hotkey_data.get("secretPhrase", "Not available")
        hotkey_address = hotkey_data.get("ss58Address", "Not available")
        coldkey_address = coldkeypub_data.get("ss58Address", "Not available")

        return jsonify({
            "success": True,
            "wallet": {
                "coldkey_address": coldkey_address,
                "hotkey_address": hotkey_address,
                "hotkey_mnemonic": hotkey_mnemonic
            }
        })

    except Exception as e:
        logging.error(f"Error during wallet creation: {str(e)}")
        return jsonify({"error": str(e)}), 500
    

#this is a test api when I was testing CORS blocking on chrome, can be used with unit tests in chrome.
@app.route('/test_bittensor_wallet', methods=['POST'])
def test_wallet_creation():
    logging.debug("Test request received")

    try:
        # Here we will just check if the request body contains the expected 'name' field
        data = request.get_json()
        wallet_name = data.get("name")

        if not wallet_name:
            return jsonify({"status": "fail", "message": "Wallet name is required"}), 400

        # If the wallet name is provided, return a success message
        return jsonify({"status": "pass", "message": "Wallet creation test passed"}), 200

    except Exception as e:
        logging.error(f"Error during test: {str(e)}")
        return jsonify({"status": "fail", "message": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=3000)