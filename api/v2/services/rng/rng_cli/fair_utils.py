from secrets import SystemRandom, token_hex
from provably_fair import ProvablyFair, RolledData
random = SystemRandom()


def fair_fisher_yates_shuffle(deck=None, deck_count=1, client_seed=''):
    """
    Perform the Fisher-Yates shuffle algorithm on a deck of cards, using a provably fair method
    to determine the shuffle order. This algorithm ensures that each card has an equal probability
    of ending up in any position in the deck.

    :param deck: Optional; A list of tuples representing cards in a deck, where each tuple
                 contains a value and a suit. If None, a standard deck of 52 cards is created.
    :param deck_count: Optional; An integer specifying the number of decks to be combined and shuffled.
                       Defaults to 1, meaning a single standard deck.
    :param client_seed: Optional; A string used as a client-provided seed for the shuffle to ensure
                          that the shuffle process is unique and cannot be predicted or repeated.
                          If not provided, a random 32-character string is generated and used.

    :return: A tuple containing the shuffled deck of cards, a list of `RolledData` objects representing
             the sequence of rolls (random choices) made during the shuffle, and the server seed.
             This can be used to verify the fairness of the shuffle.
    """
    # Initialize the deck with a standard 52-card set if no deck is provided
    if deck is None:
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
        # Create a deck as a list of tuples, each tuple representing a card
        deck = [(value, suit) for suit in suits for value in values for i in range(deck_count)]

    server_seed = token_hex(32)
    client_seed = client_seed or token_hex(16)
    fair_random = ProvablyFair(server_seed)
    rolled_data_list = []
    nonce = 0
    # Loop over the deck in reverse order
    for i in range(len(deck) - 1, 0, -1):
        # Select a random index from 0 to i
        roll_data = fair_random.roll(client_seed=client_seed, nonce=nonce, min_val=0, max_val=i)
        rolled_data_list.append(roll_data)
        j = roll_data.roll
        # Swap the current card with the card at the randomly selected index
        deck[i], deck[j] = deck[j], deck[i]
        nonce += 1

    # Return the shuffled deck
    return deck, rolled_data_list, server_seed


def fair_keno_numbers(min_number=0, max_number=100, draw_count=20, client_seed=None):
    """
    Generate a specified count of unique random numbers within a given range for Keno,
    using the ProvablyFair class to ensure the fairness of the draw.

    :param min_number: The lowest possible number in the range (inclusive).
    :param max_number: The highest possible number in the range (inclusive).
    :param draw_count: The number of unique numbers to draw.
    :param client_seed: Optional client seed for the ProvablyFair roll. If not provided,
                        a new random seed is generated.

    :return: A tuple containing the list of unique random numbers, the list of RolledData objects,
             and the server seed for backend verification.
    """
    if draw_count > max_number - min_number + 1:
        raise ValueError("Draw count cannot exceed the number of available numbers in the range")

    # Initialize ProvablyFair with a server seed
    server_seed = token_hex(32)
    client_seed = client_seed or token_hex(32)
    fair_random = ProvablyFair(server_seed)

    numbers = {}
    rolled_data_list = []
    nonce = 0
    while len(numbers) < draw_count:
        roll_data = fair_random.roll(client_seed, nonce, max_val=max_number, min_val=min_number)
        if roll_data.roll not in numbers:
            numbers[roll_data.roll] = None  # Add to dict with None as the value
            rolled_data_list.append(roll_data)
        nonce += 1  # Increment nonce to ensure different results for each roll

    return list(numbers.keys()), rolled_data_list, server_seed


def fair_generate_slot_numbers(ranges, client_seed=None):
    """
    Generate a random number for each range specified for a slot game using a provably fair algorithm.

    This function iterates over a list of range specifications, each defined by a dictionary
    with 'low' and 'high' keys. For each range, a random number is generated that falls within
    that range (inclusive of both low and high), using a provably fair method.

    :param ranges: A list of dictionaries, each containing 'low' and 'high' keys
                   defining the range for each slot.
    :param client_seed: Optional client seed for the ProvablyFair roll. If not provided,
                        a new random seed is generated.
    :return: A tuple containing the list of random numbers for each range, the list of RolledData objects,
             and the server seed for backend verification.
    """
    server_seed = token_hex(32)
    client_seed = client_seed or token_hex(16)
    fair_random = ProvablyFair(server_seed)

    results = []
    rolled_data_list = []
    nonce = 0

    for range_dict in ranges:
        low = range_dict['low']
        high = range_dict['high']

        roll_data = fair_random.roll(client_seed, nonce, max_val=high, min_val=low)
        results.append(roll_data.roll)
        rolled_data_list.append(roll_data)

        nonce += 1  # Increment nonce to ensure different results for each roll

    return results, rolled_data_list, server_seed


def verify_roll(server_seed: str, rolled_data: RolledData) -> bool:
    """
    Verifies whether a roll is fair by comparing it against the original server seed.

    This function checks if the roll result, originally generated during the game, matches
    a new roll result generated with the original server seed and client seed. If both results match,
    it confirms that the original roll was conducted fairly.

    :param server_seed: The server seed used during the original roll.
    :param rolled_data: A RolledData instance containing details of the original roll, including
                        the client seed and nonce used for that roll.
    :return: True if the verification succeeds (i.e., the original roll is confirmed to be fair),
             False otherwise.
    """
    instance = ProvablyFair(server_seed)
    calculated_roll = instance.roll(rolled_data.client_seed, rolled_data.nonce,
                                    rolled_data.max_val, rolled_data.min_val)
    return calculated_roll.roll == rolled_data.roll