from dataclasses import asdict, dataclass
from hashlib import sha256, sha512
from hmac import new
from secrets import token_hex
from typing import Any, Dict, Optional, TypedDict


class RolledDataDict(TypedDict):
    roll: int
    nonce: int
    min_val: int
    max_val: int
    server_seed_hash: str
    client_seed: str


@dataclass
class RolledData:
    roll: int
    nonce: int
    min_val: int
    max_val: int
    server_seed_hash: str
    client_seed: str

    def to_dict(self) -> Dict[str, Any]:
        """Converts the rolled data into a dictionary."""
        return asdict(self)

    @classmethod
    def from_dict(cls, d: RolledDataDict) -> 'RolledData':
        """Creates a RolledData instance from a dictionary."""
        return cls(**d)


class ProvablyFair:
    def __init__(self, server_seed: Optional[str] = None) -> None:
        """
        Initializes the provably fair system with a server seed. If no server seed is provided,
        it generates a new one randomly.

        :param server_seed: An optional string representing the server seed. If not provided,
                            a new server seed is generated randomly.
        """
        self.server_seed = server_seed or self.generate_server_seed()
        self.server_seed_hash = self.hash_server_seed(self.server_seed)

    def generate_server_seed(self) -> str:
        """
        Generates a random server seed using a secure method. This seed is used in the
        cryptographic operations to ensure fairness.

        :return: A 32-character hexadecimal string representing the server seed.
        """
        return token_hex(32)

    def hash_server_seed(self, server_seed: str) -> str:
        """
        Computes the SHA-256 hash of the server seed. This hash is used for verification purposes
        to ensure that the server seed has not been altered.

        :param server_seed: The server seed to be hashed.
        :return: The SHA-256 hash of the server seed as a hexadecimal string.
        """
        return sha256(server_seed.encode()).hexdigest()

    def roll(self, client_seed: str, nonce: int = 0, max_val: int =100, min_val: int = 0) -> RolledData:
        """
        Generates a roll result based on the client seed, nonce, and specified value range. This method
        is used to simulate a fair roll in a gaming or gambling context.

        :param client_seed: The client seed used for the current roll, ensuring the roll's uniqueness.
        :param nonce: An integer that is incremented with each roll to ensure different outcomes.
        :param max_val: The maximum value for the roll, inclusive.
        :param min_val: The minimum value for the roll, inclusive.
        :return: A `RolledData` object containing the roll result and related data.
        """
        hmac_object = new(
            self.server_seed.encode(),
            f"{client_seed}-{nonce}".encode(),
            sha512,
        )
        hmac_hash = hmac_object.hexdigest()

        roll_number_str = hmac_hash
        roll_number = int(roll_number_str, 16)
        total_range = max_val - min_val + 1
        roll_number = roll_number % total_range
        roll_number += min_val

        return RolledData(roll_number, nonce, min_val, max_val, self.server_seed_hash, client_seed)




