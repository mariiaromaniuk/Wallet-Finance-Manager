const plaid = require('plaid');
const moment = require('moment');
const { Budget, Transaction, Account } = require("../db/model");
const {SECRET_CLIENT_ID,SECTRET_KEY,PUBLIC_PLAID} =require('../../secrets')

module.exports = router;


const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID || SECRET_CLIENT_ID;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY || PUBLIC_PLAID;
const PLAID_SECRET = process.env.PLAID_SECRET || SECTRET_KEY;
const PLAID_ENV = 'sandbox';

const plaidClient = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    PLAID_ENV
);


// when user signs up for our app - pulls 2 months data & saves to db
router.post('/plaid_exchange', async (req, res, next) => {
    let ACCESS_TOKEN = 'null';
    let ITEM_ID = null;
    const user = req.user;

    try {
        /*-----------get public token fron frontend------------------*/
        let publicToken = req.body.public_token;

        /*--------exchange public token for accesstoken and itemID-----------*/
        await plaidClient.exchangePublicToken(
            publicToken,
            async (error, tokenResponse) => {
                if (error !== null) {
                    var msg = 'Could not exchange public_token!';
                    console.log(msg + '\n' + error);
                }
                ACCESS_TOKEN = tokenResponse.access_token;
                ITEM_ID = tokenResponse.item_id;

                //saving  ITEM (BANK INFORMATION) to our database
                // Item, is a set of credentials (map of key value pairs) associated with a financial institution.
                const item = await Item.create({
                    accessToken: ACCESS_TOKEN,
                    bank: ITEM_ID,
                    userId: user.id
                });

                /*-------------get ACOUNTS & TRANSACTIONS details from the last 5 months-----------*/
                let startDate = moment()
                    .subtract(90, 'days')
                    .format('YYYY-MM-DD');
                let endDate = moment().format('YYYY-MM-DD');


                //https://plaid.com/docs/#transactions

                await plaidClient.getTransactions(
                    ACCESS_TOKEN,
                    startDate,
                    endDate,
                    async (err, transactionResponse) => {
                        //Check for errors
                        if (err !== null) {
                            if (plaid.isPlaidError(err)) {

                                // Plaid Error
                                console.log(`${err.error_code} : ${err.error_message}`)
                            } else {
                                // If is not a plaid error is a connection error
                                console.log(err.toString());
                            }
                        }

                        //saving  ACCOUNT to our database
                        transactionResponse.accounts.map(async account => {
                            await Account.create({
                                account_id: account.account_id,
                                current_balance: account.balances.current,
                                available_balance: account.balances.available,
                                userId: user.id,
                                name: account.name
                            });
                        });

                        //saving  TRANSACTION to our database
                        transactionResponse.transactions.map(async transaction => {
                            await Transaction.create({
                                amount: transaction.amount,
                                name: transaction.name,
                                date: transaction.date,
                                accountId: transaction.account_id,
                                userId: user.id,
                                category1: transaction.category[0],
                                category2: transaction.category[1]
                            });
                        });
                    }
                );
            }
        );

        // Grabbing from our database (account and transactions) and sending it back as a JSON
        const accounts = await Account.findAll({
            where: {
                userId: user.id
            }
        });

        const trans = await Transaction.findAll({
            where: {
                userId: user.id
            }
        });

        const budget = await Budget.findAll({
            where: {
                userId: user.id
            }
        });

        res.json({ accounts, trans, budget });
    } catch (err) {
        // Indicates plaid API error
        console.log('Exchange token returned an error', {
            error_type: err.error_type,
            error_code: res.statusCode,
            error_message: err.error_message,
            display_message: err.display_message,
            request_id: err.request_id,
            status_code: err.status_code
        });
        next(err);
    }
});