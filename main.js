let iletisimFormu = document.getElementById("iletisimFormu");
let formDurumu = document.getElementById("formDurumu");

iletisimFormu.addEventListener("submit", function(event) {
    event.preventDefault();
    let veriPaketi = new FormData(iletisimFormu);
    formDurumu.textContent = "Mesaj gönderiliyor... ⏳";
    formDurumu.style.color = "white";
    fetch(iletisimFormu.action, {
        method: iletisimFormu.method,
        body: veriPaketi,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formDurumu.textContent = "Harika! Mesajınız bana ulaştı.";
            formDurumu.style.color = "#e0e0e0";
            iletisimFormu.reset();
        } else {
            formDurumu.textContent = "Eyvah, bir sorun oluştu. sLütfen tekrar deneyin. 😢";
            formDurumu.style.color = "red";
        }
    }).catch(error => {
        formDurumu.textContent = "Bağlantı hatası! İnternetinizi kontrol edin. 📡";
        formDurumu.style.color = "red";
    });
});
let darkThemeBtn = document.getElementById("darkThemeBtn");
darkThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("aydinlik-mod");
    if (document.body.classList.contains("aydinlik-mod")) {
        darkThemeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        darkThemeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});