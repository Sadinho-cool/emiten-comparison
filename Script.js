const stockData = {

    DMAS: {
        name: "Puradelta Lestari",
        price: 350,
        dividend: 15.2,
        per: 8.4,
        pbv: 1.1
    },

    SMSM: {
        name: "Selamat Sempurna",
        price: 1850,
        dividend: 6.8,
        per: 14.2,
        pbv: 2.5
    },

    BIRD: {
        name: "Blue Bird",
        price: 1700,
        dividend: 7.1,
        per: 9.8,
        pbv: 1.3
    },

    IPCC: {
        name: "Indonesia Kendaraan Terminal",
        price: 700,
        dividend: 9.5,
        per: 8.1,
        pbv: 1.0
    }
};


function formatRupiah(number) {
    return "Rp " + number.toLocaleString("id-ID");
}


function compareStocks() {

    const ticker1 = document
        .getElementById("stock1")
        .value
        .toUpperCase()
        .trim();

    const ticker2 = document
        .getElementById("stock2")
        .value
        .toUpperCase()
        .trim();

    const status = document.getElementById("status");

    if (!stockData[ticker1] || !stockData[ticker2]) {
        status.textContent =
            "Ticker belum tersedia di database contoh.";
        return;
    }

    const stock1 = stockData[ticker1];
    const stock2 = stockData[ticker2];

    document.getElementById("result").classList.remove("hidden");
    document.getElementById("comparison").classList.remove("hidden");

    document.getElementById("name1").textContent = stock1.name;
    document.getElementById("ticker1").textContent = ticker1;
    document.getElementById("price1").textContent =
        formatRupiah(stock1.price);

    document.getElementById("dividend1").textContent =
        stock1.dividend + "%";

    document.getElementById("per1").textContent =
        stock1.per + "x";

    document.getElementById("pbv1").textContent =
        stock1.pbv + "x";


    document.getElementById("name2").textContent = stock2.name;
    document.getElementById("ticker2").textContent = ticker2;
    document.getElementById("price2").textContent =
        formatRupiah(stock2.price);

    document.getElementById("dividend2").textContent =
        stock2.dividend + "%";

    document.getElementById("per2").textContent =
        stock2.per + "x";

    document.getElementById("pbv2").textContent =
        stock2.pbv + "x";


    document.getElementById("tableTicker1").textContent = ticker1;
    document.getElementById("tableTicker2").textContent = ticker2;

    document.getElementById("tablePrice1").textContent =
        formatRupiah(stock1.price);

    document.getElementById("tablePrice2").textContent =
        formatRupiah(stock2.price);

    document.getElementById("tableDividend1").textContent =
        stock1.dividend + "%";

    document.getElementById("tableDividend2").textContent =
        stock2.dividend + "%";

    document.getElementById("tablePer1").textContent =
        stock1.per + "x";

    document.getElementById("tablePer2").textContent =
        stock2.per + "x";

    document.getElementById("tablePbv1").textContent =
        stock1.pbv + "x";

    document.getElementById("tablePbv2").textContent =
        stock2.pbv + "x";

    status.textContent = "Perbandingan berhasil dibuat.";
}
