const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Calendar',
    password: 'bazepodataka',
    port: 5432, // prilagoditi...
})
let db = {
    query: async (SQL, params) => {
        try {
            const start = Date.now();
            let res = await pool.query(SQL, params);
            const duration = Date.now() - start;
            /*console.log('executed query', {
                SQL, params, duration, rows: res.rowCount
            });*/
            return res;
        } catch (error) { console.log(error) }
    }
}

/*const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "bazepodataka",
    database: "Calendar"
});*/

//client.connect();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'blabla',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json());

app.get("/", function (req, res) {

    res.render("home", {
        test: "Test message"
    })
});
/*app.get("/fetchTest", function (req, res) {
    res.json({ test: "test tekst" })
});*/
app.post("/", function (req, res) {
    let year = req.body.year;
    let month = req.body.month;
    //let day = req.body.day;
    //let date = day + "." + month + "."; //+ year + ".";

    //console.log(req.body);
    (async () => {
        let result = await db.query(
            'SELECT * FROM biljeske WHERE EXTRACT(MONTH FROM datum) = $1', [month]);
        //console.log(result.rows);
        res.json(result.rows);

    })();
});

app.get("/:year/:month/:day", function (req, res) {
    let year = parseInt(req.params.year);
    let month = parseInt(req.params.month);
    let day = parseInt(req.params.day);
    let date = day + "." + month + "." + year + ".";


    /*client.query('select * from biljeske', (err, res) => {
        if (!err) results = res.rows //console.log(res.rows);
        else console.log(err.message);


    })
    console.log(results);
    console.log(typeof (results));*/

    (async () => {
        let result = await db.query(
            'SELECT * FROM biljeske WHERE datum = $1', [date]);
        //console.log(res.rows);
        /*let res2 = await db.query(
            'SELECT * FROM biljeske WHERE datum = $1', [date]);*/

        res.render("day", {
            year: year,
            month: month,
            day: day,
            results: result.rows
        });
    })();




});

app.post("/:year/:month/:day", function (req, res) {
    let sadrzajObveze = req.body.sadrzajObveze;
    let tipBiljeske = req.body.tipBiljeske;
    let year = parseInt(req.params.year);
    let month = parseInt(req.params.month);
    let day = parseInt(req.params.day);
    let date = day + "." + month + "." + year + ".";

    (async () => {
        let result = await db.query(
            'INSERT INTO biljeske(idkorisnika, sadrzaj, datum, tipbiljeske) VALUES ($1, $2, $3, $4)', [1, sadrzajObveze, date, tipBiljeske == "obveza" ? "obveza" : "blagdan"]);
        //console.log(res.rows);

        res.redirect("/" + year + "/" + month + "/" + day);

    })();
});
app.post("/:year/:month/:day/remove", function (req, res) {
    let removeId = req.body.ukloni;
    let year = parseInt(req.params.year);
    let month = parseInt(req.params.month);
    let day = parseInt(req.params.day);
    let date = day + "." + month + "." + year + ".";
    //console.log(removeId);

    (async () => {
        let result = await db.query(
            'DELETE FROM biljeske WHERE idbiljeske = $1', [removeId]);
        //console.log(res.rows);

        res.redirect("/" + year + "/" + month + "/" + day);

    })();
});

app.post("/:year/:month/:day/cross", function (req, res) {
    let crossId = req.body.idBilj;
    let tipBiljeske = req.body.tipBiljeske;
    let year = parseInt(req.params.year);
    let month = parseInt(req.params.month);
    let day = parseInt(req.params.day);
    let date = day + "." + month + "." + year + ".";

    (async () => {
        let result = await db.query(
            'UPDATE biljeske SET tipbiljeske = $1 WHERE idbiljeske = $2', [tipBiljeske, crossId]);
        //console.log(res.rows);

        res.redirect("/" + year + "/" + month + "/" + day);

    })();

});

// sretno! :)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})