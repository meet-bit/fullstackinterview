import unittest
import requests

class TestBittensorWalletAPI(unittest.TestCase):
    BASE_URL = "http://localhost:3000"  # change later

    def test_create_wallet(self):
        """
        Test the /create_bittensor_wallet endpoint by sending a POST request
        and verifying the structure and presence of expected keys.
        """
        payload = {"name": "test_wallet3"}
        response = requests.post(
            f"{self.BASE_URL}/create_bittensor_wallet",
            json=payload,
            headers={"Content-Type": "application/json"}
        )

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get("success"))
        self.assertIn("wallet", data)
        self.assertIn("coldkey_address", data["wallet"])
        self.assertIn("hotkey_address", data["wallet"])
        self.assertIn("hotkey_mnemonic", data["wallet"])

    def test_wallet_creation_test(self):
        """
        Test the /test_bittensor_wallet endpoint by sending a simple name
        and expecting a successful response structure.
        """
        payload = {"name": "test_wallet"}
        response = requests.post(
            f"{self.BASE_URL}/test_bittensor_wallet",
            json=payload,
            headers={"Content-Type": "application/json"}
        )

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "pass")
        self.assertEqual(data.get("message"), "Wallet creation test passed")

    def test_missing_name_field(self):
        """
        Test behavior when no 'name' field is sent in the payload.
        """
        response = requests.post(
            f"{self.BASE_URL}/test_bittensor_wallet",
            json={},
            headers={"Content-Type": "application/json"}
        )

        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertEqual(data.get("status"), "fail")
        self.assertIn("Wallet name is required", data.get("message", ""))


if __name__ == "__main__":
    unittest.main()
