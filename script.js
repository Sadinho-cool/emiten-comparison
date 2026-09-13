/* =====================================================
   INDONESIA STOCK COMPARISON
   V1 JAVASCRIPT
===================================================== */


const API_URL =
    "https://indonesia-stock-comparison.sayyid-syafiq136.workers.dev";



/* =====================================================
   FORMATTERS
===================================================== */

function formatRupiah(number) {

    if (
        number === null ||
        number === undefined ||
        number === ""
    ) {
        return "Data tidak tersedia";
    }

    return "Rp " +
        Number(number).toLocaleString("id-ID");
}


function formatNumber(number) {

    if (
        number === null ||
        number === undefined
    ) {
        return "Data tidak tersedia";
    }

    return Number(number).toLocaleString("id-ID");
}


function formatPercent(number) {

    if (
        number === null ||
        number === undefined
    ) {
        return "Data tidak tersedia";
    }

    return Number(number).toFixed(2) + "%";
}



/* =====================================================
   API
===================================================== */

async function getStockData(ticker) {

    const response = await fetch(
        `${API_URL}/?symbol=${encodeURIComponent(ticker)}`
    );

    const data = await response.json();

    if (!response.ok || data.error) {

        throw new Error(
            data.error ||
            "Gagal mengambil data saham."
        );
    }

    return data;
}



/* =====================================================
   UI HELPERS
===================================================== */

function setStatus(
    message,
    type = ""
) {

    const status =
        document.getElementById("status");

    status.textContent = message;

    status.className = "status";

    if (type) {
        status.classList.add(type);
    }
}


function setLoading(isLoading) {

    const button =
        document.getElementById("compareButton");

    const buttonText =
        document.getElementById("buttonText");

    if (isLoading) {

        button.disabled = true;

        button.style.opacity = "0.7";

        buttonText.textContent =
            "Mengambil data...";

    } else {

        button.disabled = false;

        button.style.opacity = "1";

        buttonText.textContent =
            "Bandingkan Saham";
    }
}


function getTickerLogo(symbol) {

    if (!symbol) {
        return "?";
    }

    return symbol
        .replace(".JK", "")
        .substring(0, 2);
}



/* =====================================================
   COMPARE STOCKS
===================================================== */

async function compareStocks() {

    const ticker1 =
        document
            .getElementById("stock1")
            .value
            .toUpperCase()
            .trim();


    const ticker2 =
        document
            .getElementById("stock2")
            .value
            .toUpperCase()
            .trim();



    /* VALIDATION */

    if (!ticker1 || !ticker2) {

        setStatus(
            "Masukkan dua ticker saham terlebih dahulu.",
            "error"
        );

        return;
    }


    if (ticker1 === ticker2) {

        setStatus(
            "Pilih dua saham yang berbeda untuk dibandingkan.",
            "error"
        );

        return;
    }



    setLoading(true);

    setStatus(
        "Mengambil data saham...",
        "loading"
    );



    try {

        const [
            stock1,
            stock2
        ] = await Promise.all([

            getStockData(ticker1),

            getStockData(ticker2)

        ]);



        /* =================================================
           SHOW RESULT
        ================================================= */

        document
            .getElementById("result")
            .classList.remove("hidden");


        document
            .getElementById("comparison")
            .classList.remove("hidden");



        /* =================================================
           STOCK 1
        ================================================= */

        document
            .getElementById("name1")
            .textContent =
            stock1.name || "Unknown Company";


        document
            .getElementById("ticker1")
            .textContent =
            stock1.symbol || ticker1;


        document
            .getElementById("logo1")
            .textContent =
            getTickerLogo(stock1.symbol);


        document
            .getElementById("price1")
            .textContent =
            formatRupiah(stock1.price);


        document
            .getElementById("dividend1")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("per1")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("pbv1")
            .textContent =
            "Belum tersedia";



        /* =================================================
           STOCK 2
        ================================================= */

        document
            .getElementById("name2")
            .textContent =
            stock2.name || "Unknown Company";


        document
            .getElementById("ticker2")
            .textContent =
            stock2.symbol || ticker2;


        document
            .getElementById("logo2")
            .textContent =
            getTickerLogo(stock2.symbol);


        document
            .getElementById("price2")
            .textContent =
            formatRupiah(stock2.price);


        document
            .getElementById("dividend2")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("per2")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("pbv2")
            .textContent =
            "Belum tersedia";



        /* =================================================
           TABLE
        ================================================= */

        document
            .getElementById("tableTicker1")
            .textContent =
            stock1.symbol;


        document
            .getElementById("tableTicker2")
            .textContent =
            stock2.symbol;


        document
            .getElementById("tablePrice1")
            .textContent =
            formatRupiah(stock1.price);


        document
            .getElementById("tablePrice2")
            .textContent =
            formatRupiah(stock2.price);


        document
            .getElementById("tableDividend1")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("tableDividend2")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("tablePer1")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("tablePer2")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("tablePbv1")
            .textContent =
            "Belum tersedia";


        document
            .getElementById("tablePbv2")
            .textContent =
            "Belum tersedia";



        /* =================================================
           SUCCESS
        ================================================= */

        setStatus(
            `Perbandingan ${stock1.symbol} vs ${stock2.symbol} berhasil dibuat.`,
            "success"
        );


        /* Scroll ke hasil */

        document
            .getElementById("result")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


    } catch (error) {

        console.error(error);

        setStatus(
            "Gagal mengambil data. Pastikan ticker benar dan coba lagi.",
            "error"
        );

    } finally {

        setLoading(false);
    }
}



/* =====================================================
   ENTER KEY
===================================================== */

document
    .getElementById("stock1")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                document
                    .getElementById("stock2")
                    .focus();
            }
        }
    );


document
    .getElementById("stock2")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                compareStocks();
            }
        }
    );



/* =====================================================
   AUTO UPPERCASE
===================================================== */

document
    .querySelectorAll(
        "#stock1, #stock2"
    )
    .forEach(function(input) {

        input.addEventListener(
            "input",
            function() {

                this.value =
                    this.value.toUpperCase();
            }
        );

    });



/* =====================================================
   DARK MODE
===================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


const savedTheme =
    localStorage.getItem(
        "isc-theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";
}


themeToggle.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "isc-theme",
            isDark ? "dark" : "light"
        );


        themeToggle.textContent =
            isDark ? "☀️" : "🌙";

    }
);
