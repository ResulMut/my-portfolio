let iletisimFormu = document.getElementById("iletisimFormu");
let formDurumu = document.getElementById("formDurumu");

iletisimFormu.addEventListener("submit", function(event) {
    
    // 1. NİNJA HAMLESİ: Sayfanın Formspree'ye gitmesini DURDUR! 🛑
    event.preventDefault();
    
    // 2. Formun içindeki verileri (isim, mail, mesaj) bir paket haline getir.
    let veriPaketi = new FormData(iletisimFormu);

    // Kullanıcıya gönderiliyor hissi verelim
    formDurumu.textContent = "Mesaj gönderiliyor... ⏳";
    formDurumu.style.color = "white"; // Sitenin rengine göre uyarla

    // 3. Arka kapıdan (Fetch API) gizlice Formspree'ye gönder! 🚀
    fetch(iletisimFormu.action, {
        method: iletisimFormu.method,
        body: veriPaketi,
        headers: {
            'Accept': 'application/json' // Formspree'ye "Bana site açma, sadece JSON (tamam) mesajı yolla" diyoruz.
        }
    }).then(response => {
        if (response.ok) {
            // EĞER BAŞARILIYSA:
            formDurumu.textContent = "Harika! Mesajınız bana ulaştı.";
            formDurumu.style.color = "#e0e0e0";
            iletisimFormu.reset(); // İçerideki yazıları temizle (Sıfırla)
        } else {
            // EĞER FORMSPREE HATA VERİRSE:
            formDurumu.textContent = "Eyvah, bir sorun oluştu. Lütfen tekrar deneyin. 😢";
            formDurumu.style.color = "red";
        }
    }).catch(error => {
        // EĞER İNTERNET KOPARSA:
        formDurumu.textContent = "Bağlantı hatası! İnternetinizi kontrol edin. 📡";
        formDurumu.style.color = "red";
    });
});