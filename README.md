# Build
Open the Casiono.html in browser.

the index.php file is just used for hosting on heroku


# Casiono
Roulette Table Simulator for Red/Black, High/Low, anything with the ~48% probability to test the  strategies eg. Martingale Strategy

Simple simulator over 1,10 or 100 bets.

# Navigation
* click the roulette table or press enter to spin
* click the bag of money add money to wallet
* hover over on win/on lose to change behaviour on win/lose
* click reset to reset

# Default Variables
**found at the top of the Casiono.js file
- MAX_BET - max bet amount per spin. Default:400;
- MIN_BET - minimum bet amount. Default:0;
- CASH_ADD - how much more cash to "top up" wallet when you need to. Default:100;
- CASH_DEFAULT - how much cash you start with. Default:300;

# ON WIN/LOSS
how you will change your bet each win and or loss per spin.

### Examples:
- ONWIN = 0.5; when you bet 10 and win, the next bet will be 5
- ONLOSE = 2; when you bet 10 and lose, the next bet will be 20
- ONWIN = 1; when you bet 10 and win, the next bet will be 10

# Rand
it uses system rand
