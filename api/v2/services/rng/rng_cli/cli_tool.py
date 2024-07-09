import argparse
from secrets import SystemRandom, token_hex
import json
from fair_utils import fair_keno_numbers, fair_generate_slot_numbers, fair_fisher_yates_shuffle, verify_roll
from utils import keno_numbers, generate_slot_numbers, fisher_yates_shuffle
from provably_fair import RolledData
random = SystemRandom()


def to_serializable(obj):
    """
    Convert non-serializable objects to serializable format.
    """
    if hasattr(obj, 'to_dict'):
        return obj.to_dict()
    elif isinstance(obj, list):
        return [to_serializable(item) for item in obj]
    return obj


def main():
    parser = argparse.ArgumentParser(
        description="Generate random outcomes for games using provably fair or normal methods.")

    parser.add_argument("--game", choices=['keno', 'slot', 'shuffle', 'verify'], required=True,
                        help="The game to generate outcomes for or 'verify' to check the results.")
    parser.add_argument("--method", choices=['fair', 'normal'], required=False,
                        help="Method of generation (fair for provably fair, normal for standard randomness).")
    parser.add_argument("--min_number", type=int, default=1, help="Minimum number for Keno (default: 1).")
    parser.add_argument("--max_number", type=int, default=80, help="Maximum number for Keno (default: 80).")
    parser.add_argument("--draw_count", type=int, default=20, help="Numbers to draw for Keno (default: 20).")
    parser.add_argument("--slot_ranges", type=str, help="Slot ranges in 'low,high;low,high;...' format.")
    parser.add_argument("--deck_count", type=int, default=1, help="Number of decks to shuffle (default: 1).")
    parser.add_argument("--client_seed", type=str, help="Client seed for provably fair generation.")
    parser.add_argument("--server_seed", type=str, help="Server seed for verification.")
    parser.add_argument("--roll", type=int, help="The roll number to verify (if applicable).")
    parser.add_argument("--nonce", type=int, help="The nonce used in the roll (if applicable).")
    parser.add_argument("--min_val", type=int, help="Minimum value for the roll (for verification).")
    parser.add_argument("--max_val", type=int, help="Maximum value for the roll (for verification).")

    args = parser.parse_args()

    client_seed = args.client_seed or token_hex(32)

    if args.game == 'verify':
        if not args.server_seed or not args.client_seed or args.nonce is None or args.roll is None:
            print("Verification requires server_seed, client_seed, nonce, and roll number.")
            return
        rolled_data = RolledData(args.roll, args.nonce, args.min_val, args.max_val, '',
                                 args.client_seed)  # server_seed_hash is not used in verification
        is_valid = verify_roll(args.server_seed, rolled_data)
        print(json.dumps([is_valid]))
        return

    response = {}

    if args.game == 'keno':
        if args.method == 'fair':
            numbers, rolled_data, server_seed = fair_keno_numbers(args.min_number, args.max_number, args.draw_count,
                                                                  client_seed)
            response = {"keno_numbers": numbers, "server_seed": server_seed, "rolled_data": to_serializable(rolled_data)}
        else:
            numbers = keno_numbers(args.min_number, args.max_number, args.draw_count)
            response = {"keno_numbers": numbers}

    elif args.game == 'slot':
        if args.slot_ranges:
            ranges = [dict(zip(['low', 'high'], map(int, r.split(',')))) for r in args.slot_ranges.split(';')]
        else:
            ranges = [{'low': 0, 'high': 100}]  # Default range

        if args.method == 'fair':
            slot_numbers, rolled_data, server_seed = fair_generate_slot_numbers(ranges, client_seed)
            response = {"slot_numbers": slot_numbers, "server_seed": server_seed,
                        "rolled_data": to_serializable(rolled_data)}
        else:
            slot_numbers = generate_slot_numbers(ranges)
            response = {"slot_numbers": slot_numbers}

    elif args.game == 'shuffle':
        if args.method == 'fair':
            deck, rolled_data, server_seed = fair_fisher_yates_shuffle(deck_count=args.deck_count,
                                                                       client_seed=client_seed)
            response = {"shuffled_deck": deck, "server_seed": server_seed, "rolled_data": to_serializable(rolled_data)}
        else:
            deck = fisher_yates_shuffle(deck_count=args.deck_count)
            response = {"shuffled_deck": deck}

    print(json.dumps(response, indent=2))
    # print(response['rolled_data'])


if __name__ == "__main__":
    main()