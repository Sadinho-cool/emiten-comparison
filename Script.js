
const API_URL =
    "https://indonesia-stock-comparison.sayyid-syafiq136.workers.dev";

function formatRupiah(number) {
    if (number === null || number === undefined) {
        return "Data tidak tersedia";
    }

    return "Rp " + Number(number).toLocaleString("id-ID");
}

function formatNumber(number) {
    if (number === null || number === undefined) {
        return "Data tidak tersedia";
    }

    return Number(number).toLocaleString("id-ID");
}

function formatPercent(number) {
    if (number === null || number === undefined) {
        return "Data tidak tersedia";
    }

    return Number(number).toFixed(2) + "%";
}

async function getStockData(ticker) {
    const response = await fetch(
        `${API_URL}/?symbol=${encodeURIComponent(ticker)}`
    );

    const data = await response.json();

    if (!response.ok || data.error) {
        throw new Error(data.error || "Gagal mengambil data saham.");
    }

    return data;
}

async function compareStocks() {
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

    if (!ticker1 || !ticker2) {
        status.textContent = "Masukkan dua ticker saham terlebih dahulu.";
        return;
    }

    status.textContent = "Sedang mengambil data saham...";

    try {
        const [stock1, stock2] = await Promise.all([
            getStockData(ticker1),
            getStockData(ticker2)
        ]);

        document.getElementById("result").classList.remove("hidden");
        document.getElementById("comparison").classList.remove("hidden");

        // Saham pertama
        document.getElementById("name1").textContent = stock1.name;
        document.getElementById("ticker1").textContent = stock1.symbol;
        document.getElementById("price1").textContent =
            formatRupiah(stock1.price);

        document.getElementById("dividend1").textContent =
            "Belum tersedia";

        document.getElementById("per1").textContent =
            "Belum tersedia";

        document.getElementById("pbv1").textContent =
            "Belum tersedia";

        // Saham kedua
        document.getElementById("name2").textContent = stock2.name;
        document.getElementById("ticker2").textContent = stock2.symbol;
        document.getElementById("price2").textContent =
            formatRupiah(stock2.price);

        document.getElementById("dividend2").textContent =
            "Belum tersedia";

        document.getElementById("per2").textContent =
            "Belum tersedia";

        document.getElementById("pbv2").textContent =
            "Belum tersedia";

        // Tabel perbandingan
        document.getElementById("tableTicker1").textContent = stock1.symbol;
        document.getElementById("tableTicker2").textContent = stock2.symbol;

        document.getElementById("tablePrice1").textContent =
            formatRupiah(stock1.price);

        document.getElementById("tablePrice2").textContent =
            formatRupiah(stock2.price);

        document.getElementById("tableDividend1").textContent =
            "Belum tersedia";

        document.getElementById("tableDividend2").textContent =
            "Belum tersedia";

        document.getElementById("tablePer1").textContent =
            "Belum tersedia";

        document.getElementById("tablePer2").textContent =
            "Belum tersedia";

        document.getElementById("tablePbv1").textContent =
            "Belum tersedia";

        document.getElementById("tablePbv2").textContent =
            "Belum tersedia";

        status.textContent =
            "Perbandingan berhasil dibuat menggunakan data API.";

    } catch (error) {
        console.error(error);

        status.textContent =
            "Gagal mengambil data. Pastikan ticker benar dan coba lagi.";
    }
}
