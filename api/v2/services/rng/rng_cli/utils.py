from secrets import SystemRandom
random = SystemRandom()


def fisher_yates_shuffle(deck=None, deck_count=1):
    """
    Perform the Fisher-Yates shuffle on a deck of cards.

    If no deck is provided, a standard deck of playing cards is created and shuffled.

    :param deck: A list of tuples representing cards in a deck, with each tuple
                 containing a value and a suit. If None, a standard deck is created.
    :param deck_count: An integer specifying the number of decks to be created.
    :return: A shuffled deck of cards.
    """
    # Initialize the deck with a standard 52-card set if no deck is provided
    if deck is None:
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]
        # Create a deck as a list of tuples, each tuple representing a card
        deck = [(value, suit) for suit in suits for value in values for i in range(deck_count)]

    # Loop over the deck in reverse order
    for i in range(len(deck) - 1, 0, -1):
        # Select a random index from 0 to i
        j = random.randint(0, i)
        # Swap the current card with the card at the randomly selected index
        deck[i], deck[j] = deck[j], deck[i]

    # Return the shuffled deck
    return deck


def keno_numbers(min_number=0, max_number=100, draw_count=20):
    """
    Generate a specified count of unique random numbers within a given range for Keno.

    :param min_number: The lowest possible number in the range (inclusive).
    :param max_number: The highest possible number in the range (inclusive).
    :param draw_count: The number of unique numbers to draw.
    :return: A list of unique random numbers.
    """
    if draw_count > max_number - min_number + 1:
        raise ValueError("Draw count cannot exceed the number of available numbers in the range")

    return random.sample(range(min_number, max_number + 1), k=draw_count)


def generate_slot_numbers(ranges):
    """
    Generate a random number for each range specified for a slot game.

    This function iterates over a list of range specifications, each defined by a dictionary
    with 'low' and 'high' keys. For each range, a random number is generated that falls within
    that range (inclusive of both low and high). The function returns a list of these random
    numbers, one for each specified range.

    :param ranges: A list of dictionaries, each containing 'low' and 'high' keys
                   defining the range for each slot.
    :return: A list of random numbers, one for each range provided.
    """

    results = [random.randint(r['low'], r['high']) for r in ranges]

    # Return the list of generated random numbers
    return results