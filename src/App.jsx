import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Terminal, Cpu, Zap, Code2, AlertTriangle, RefreshCcw, Copy, 
  CheckCircle2, Monitor, Layers, History, Share2, Volume2, VolumeX, 
  Trophy, Activity, ShieldAlert, Ghost, Thermometer, ExternalLink
} from 'lucide-react';

// --- DATA SET (UNTOUCHED) ---
const categorizedExcuses = {
  frontend: [
    "Benim tarayıcımda düzgün çalışıyordu, sanırım sizin sürüm güncel değil.",
    "Kullanıcı çok hızlı etkileşime girdi, animasyonlar çakışmış olabilir.",
    "O bir UI hatası değil, deneysel bir kullanıcı deneyimi yaklaşımı.",
    "Tarayıcı motoru standartları yanlış yorumluyor, kod aslında kusursuz.",
    "Z-index'ler arasında bir hiyerarşi çatışması var, üzerinde çalışıyoruz.",
    "Responsive tasarımda kullanılan breakpoint'ler cihazınızla uyumsuz.",
    "Önbellek (Cache) eski CSS dosyalarını tutuyor, tarayıcıyı zorla yenileyin.",
    "JavaScript paketi ağ gecikmesi nedeniyle tam yüklenememiş.",
    "CSS Specificity kuralı nedeniyle stil eziliyor, !important eklemek lazım.",
    "React Hook'ları yanlış sırada tetiklenmiş olabilir, state'i kontrol ediyoruz.",
    "Bileşen çok fazla render (re-render) oluyor, performans darboğazı oluştu.",
    "Tarayıcının karanlık mod (dark mode) ayarı renk paletini bozuyor.",
    "DOM ağacında beklenmedik bir düğüm değişikliği yaşandı.",
    "Event listener'lar arasında bir bellek sızıntısı (memory leak) var.",
    "API'den gelen JSON formatı frontend modeline uymuyor.",
    "SVG ikonu render edilirken path verisinde bir bozulma olmuş.",
    "Font dosyası sunucudan geç geliyor, metinler o yüzden kayıyor.",
    "LocalStorage dolmuş, tarayıcı veri yazmayı reddediyor.",
    "CORS hatası alıyoruz, frontend backend ile el sıkışamıyor.",
    "Mobil tarayıcının adres çubuğu viewport yüksekliğini yanlış hesaplıyor.",
    "Hydration hatası: Sunucu ve istemci çıktıları uyuşmuyor.",
    "PWA servisi çevrimdışı modda takılı kalmış olabilir.",
    "Service Worker eski bir sürümü inatla servis ediyor.",
    "Animasyon kütüphanesi GPU ivmelenmesini devre dışı bıraktı.",
    "Dokunmatik ekran hassasiyeti (Touch sensitivity) yanlış kalibre edilmiş.",
    "Metinlerin satır yüksekliği (line-height) diller arası farklılık gösteriyor.",
    "Üçüncü taraf kütüphane global değişkenleri kirletiyor.",
    "Redux store anlık bir asenkron güncelleme sırasında kilitlendi.",
    "Form verileri doğrulanırken reg-ex motoru sonsuz döngüye girdi.",
    "Web fontları yüklenirken sistem fontuyla yer değiştirme yaşandı.",
    "Tarayıcı eklentileri koddaki bir ID ile çakışıyor.",
    "İnternet Explorer hayaleti hala kodun içinde bir yerlerde geziyor.",
    "Babel transpile ederken modern özellikleri yanlış dönüştürdü.",
    "Webpack bundle boyutu çok büyüdüğü için tarayıcı dosyayı reddetti.",
    "CSS Grid yerleşimi eski tarayıcılarda desteklenmiyor.",
    "Flexbox gap özelliği henüz bu sürümde aktif değil.",
    "Media query'ler yanlış ekran yoğunluğu (pixel ratio) algılıyor.",
    "Lazy loading sırasında görsel kaynağına ulaşılamadı.",
    "Debounce süresi çok uzun tutulduğu için buton tepki vermiyor.",
    "Throttling nedeniyle kullanıcı girdileri kuyrukta bekliyor.",
    "Tarayıcı güvenliği (CSP) bazı betiklerin çalışmasını engelliyor.",
    "Cookie politikası değiştiği için oturum açılamıyor.",
    "İframe içindeki içerik ana pencereyle iletişim kuramıyor.",
    "Web Audio API donanım hızlandırması bulamadı.",
    "Canvas çizim hızı monitör yenileme hızına yetişemiyor.",
    "HTML yapısındaki bir kapanmamış tag her şeyi bozuyor.",
    "CSS Variable'lar eski bir kütüphane tarafından eziliyor.",
    "Kullanıcının ekran parlaklığı düşük olduğu için butonlar gözükmüyor.",
    "Sistem yazı tipi boyutu (font-scaling) mizanpajı kaydırdı.",
    "Websocket bağlantısı frontend tarafında sürekli kopuyor.",
    "Tarayıcı sekmeyi uyku moduna aldığı için state kayboldu.",
    "URL parametreleri çok uzun olduğu için tarayıcı isteği kesti.",
    "Base64 görseller belleği şişirdi, tarayıcı yavaşladı.",
    "React Portal yanlış bir kök dizine render yapmaya çalışıyor.",
    "Context API derinlik limiti aşıldığı için veri iletilemiyor.",
    "Yüksek çözünürlüklü ekranlarda (Retina) görseller pikselleşiyor.",
    "Frontend build tool'u eski bir sürümde kalmış.",
    "Tarayıcı çerezleri engellediği için kullanıcı profili yüklenemiyor.",
    "Web Worker arka planda çok fazla CPU tüketiyor.",
    "Frontend testleri geçti ama kullanıcı deneyimi farklı diyor."
  ],
  backend_sistem: [
    "Veritabanı migration'ı beklenmedik bir kilitlenmeye girdi, müdahale ediyoruz.",
    "Mikroservisler arası iletişimde geçici bir paket kaybı yaşanıyor.",
    "Cron job zamanlaması sunucu saatiyle uyuşmamış, manuel tetikleme lazım.",
    "Önbellek (Cache) temizlenmemiş, eski veriler sistemde asılı kalmış.",
    "Sunucu kaynakları anlık bir yüklenme sebebiyle kendisini korumaya aldı.",
    "Veritabanı bağlantı havuzu (Pool) doldu, yeni istekler reddediliyor.",
    "API anahtarı (API Key) yetkilendirme sunucusuna ulaşamıyor.",
    "Environment değişkenleri sunucu tarafında yanlış tanımlanmış.",
    "Dosya sistemi yazma izinleri (Permissions) engellendi.",
    "Docker imajı hatalı bir sürümle deploy edilmiş.",
    "Load Balancer istekleri yanlış bir node'a yönlendiriyor.",
    "SSL sertifikası geçerlilik süresi dolmuş, güvenli bağlantı kurulamıyor.",
    "Sunucunun RAM kullanımı %99'a ulaştı, Swap alanı devrede.",
    "Veritabanı index'leri bozulmuş, sorgular çok yavaş dönüyor.",
    "Redis sunucusu bellek yetersizliğinden dolayı veri siliyor.",
    "Port çakışması: Başka bir servis backend portunu işgal etmiş.",
    "DNS çözümlemesi sunucu tarafında yapılamıyor.",
    "API dökümantasyonu ile mevcut sürüm arasında fark var.",
    "JSON parsing hatası: Beklenmeyen bir karakter tespit edildi.",
    "Rate limiting devrede, kullanıcı çok fazla istek göndermiş.",
    "Kafka kuyruğu doldu, mesajlar işlenemeden bekliyor.",
    "Veritabanı şeması son güncellemeyle uyuşmazlık gösteriyor.",
    "Log dosyaları disk alanını doldurdu, sistem yazmayı durdurdu.",
    "Bağımlı olduğumuz üçüncü taraf API çökmüş durumda.",
    "Serverless fonksiyonu soğuk başlatma (Cold start) krizinde.",
    "IP beyaz listesi (Whitelist) güncellenmemiş, erişim reddedildi.",
    "Karakter seti (UTF-8) uyuşmazlığı nedeniyle veri bozuldu.",
    "İşlem (Transaction) rollback oldu, veri kaydedilemedi.",
    "Sunucunun işlemcisi thermal throttling moduna geçti.",
    "Sistem saati NTP sunucusuyla senkronize değil.",
    "Güvenlik duvarı (Firewall) backend portunu bloklamış.",
    "SSH tüneli beklenmedik bir şekilde koptu.",
    "Veritabanı sunucusu bakım moduna geçmiş.",
    "API gateway rotaları yanlış yönlendiriyor.",
    "Node.js sürümü üretim ortamında farklılık gösteriyor.",
    "Bağımlılıklar (npm install) üretimde eksik yüklenmiş.",
    "Veri şifreleme anahtarı (Encryption key) değiştirilmiş.",
    "Backend servisi 'Out of Memory' hatasıyla kapandı.",
    "Sorgu optimizasyonu yapılmadığı için veritabanı kilitlendi.",
    "Mikroservis keşif servisi (Service Discovery) çalışmıyor.",
    "Veritabanı slave sunucusu ana sunucuyla senkronize değil.",
    "İstek zaman aşımı (Timeout) süresi çok kısa tutulmuş.",
    "CORS header'ları sunucu tarafında eksik kalmış.",
    "Sistem logları anormal bir trafik artışı gösteriyor.",
    "Backend tarafındaki bir döngü sonsuzluğa doğru gidiyor.",
    "Sunucu donanımı anlık bir voltaj dalgalanması yaşadı.",
    "Veritabanı yedeklemesi sistemi aşırı yavaşlatıyor.",
    "API sürümleme (Versioning) hatası: Eski endpoint çağrılıyor.",
    "Girdi doğrulama (Validation) motoru çok katı davranıyor.",
    "Dosya yükleme limiti sunucu tarafında aşıldı.",
    "Oturum yönetim servisi (Session manager) cevap vermiyor.",
    "Yükleme dengeleyici (Load balancer) sticky session'ı unuttu.",
    "Backend mimarisi yatay büyümeye şu an izin vermiyor.",
    "Kriptografik kütüphane sunucu işlemcisiyle uyumsuz.",
    "Veri sıkıştırma algoritması CPU'yu aşırı yoruyor.",
    "Sunucunun ağ kartı saniyede çok fazla paket kaybediyor.",
    "API endpoint'i yetkisiz erişim nedeniyle kilitlendi.",
    "Veritabanı bağlantı dizgesi (Connection string) yanlış.",
    "Backend testleri yerelde geçti ama sunucuda başarısız.",
    "Backend ekibi bugün izinli, kod sahipsiz kaldı."
  ],
  ai_prompt: [
    "Yapay zeka bu talebi yanlış yorumladı, prompt'u revize etmek gerekiyor.",
    "Model güncellenmiş, eski parametreler artık aynı sonucu vermiyor.",
    "AI halüsinasyon gördüğü için veritabanı sorgusunu yanlış kurgulamış.",
    "Token limiti aşıldığı için cevap yarıda kalmış, sistem takılmış.",
    "Yapay zeka bugün biraz yorgun gibi, cevaplar çok anlamsız.",
    "Prompt mühendisliği yetersiz kalmış, daha detaylı açıklama lazım.",
    "Modelin eğitim verisinde bu konuda yeterli bilgi bulunmuyor.",
    "AI çıktısı etik filtrelere takıldı, cevap engellendi.",
    "Sıcaklık (Temperature) ayarı çok yüksek, cevaplar saçmalıyor.",
    "Yapay zeka kod yazarken mantıksal bir paradoksa girdi.",
    "Modelin bağlam penceresi (Context window) dolmuş durumda.",
    "AI API'si anlık bir kesinti yaşıyor, cevap gelmiyor.",
    "Prompt içinde çok fazla çelişkili talimat bulunuyor.",
    "Yapay zeka kendi yazdığı kodu bir sonraki adımda unuttu.",
    "Modelin tahmin olasılıkları (Top-p) çok düşük kalmış.",
    "AI motoru bu programlama dilini henüz tam öğrenememiş.",
    "Prompt içindeki değişkenler model tarafından karıştırıldı.",
    "Yapay zeka kullanıcıyı yanlış anlayıp sistemi sildi.",
    "Modelin güvenlik protokolleri koddaki bir satırı tehdit algıladı.",
    "AI bugün yaratıcılık modunda değil, sadece kopyala-yapıştır yapıyor.",
    "Prompt içindeki tonlama modelin kafasını karıştırdı.",
    "Yapay zeka çıktı formatını (JSON/Markdown) bozdu.",
    "Modelin gecikme süresi (Latency) kullanıcı sabrını aştı.",
    "AI servisi kota sınırına ulaştı, daha fazla cevap veremiyor.",
    "Prompt içindeki anahtar kelimeler model tarafından ezildi.",
    "Yapay zeka cevabı verirken bir anda başka bir dile geçti.",
    "Modelin 'system prompt'u mevcut görevle çakışıyor.",
    "AI koda yorum eklerken felsefi bir tartışmaya girdi.",
    "Modelin bilgi kesilmesi (Knowledge cutoff) tarihi çok eski.",
    "Prompt içindeki argümanlar modelin mantık süzgecinden geçmedi.",
    "Yapay zeka bugün çok fazla 'halüsinasyon' görüyor.",
    "AI çıktısındaki kod sentaks hatasıyla dolu geldi.",
    "Modelin çıkarım motoru (Inference engine) aşırı ısındı.",
    "Prompt çok kısa olduğu için model ne yapacağını şaşırdı.",
    "AI servisi bugün genel bir yavaşlama içerisinde.",
    "Modelin 'fine-tuning' verisi projeyle uyuşmuyor.",
    "Yapay zeka talimatları tersten anlamaya başladı.",
    "Prompt içindeki emojiler modelin dikkatini dağıttı.",
    "AI bugün kod yazmak yerine şiir yazmayı tercih ediyor.",
    "Modelin vektör veritabanı sorgusu boş döndü.",
    "Yapay zeka cevabı verirken sürekli aynı kelimeyi tekrar ediyor.",
    "Prompt içindeki gizli talimatlar model tarafından ifşa edildi.",
    "AI motoru işlem yaparken bir 'runtime error' verdi.",
    "Modelin cevap verme süresi sunucu tarafından kesildi.",
    "Yapay zeka bugün kendisini bir insan sanıyor.",
    "Prompt içindeki teknik terimler model için çok karmaşık.",
    "AI servisi bakım nedeniyle geçici olarak kapalı.",
    "Modelin ağırlık (Weights) dosyaları yüklenirken hata oluştu.",
    "Yapay zeka koddaki bug'ı bulmak yerine yeni bug'lar ekledi.",
    "Prompt mühendisi bugün izinli, AI başıboş kaldı.",
    "AI modeli kendisini güncellemeye çalışırken kilitlendi.",
    "Prompt içindeki boşluklar modelin algoritmasını bozdu.",
    "AI bugün sadece 'Evet' veya 'Hayır' cevabı veriyor.",
    "Modelin hafızası son 10 mesajı hatırlamıyor.",
    "Yapay zeka kodun sadece yarısını yazıp geri kalanını bize bıraktı.",
    "AI servisi başka bir modelle rekabete girmiş, cevap vermiyor.",
    "Prompt içindeki üslup AI'yı defansif bir moda soktu.",
    "Yapay zeka bugün kod yazmak yerine emekli olmayı hayal ediyor.",
    "Modelin içindeki nöral ağlar arasında bir kopukluk var.",
    "AI bugün sadece 'Coming Soon' mesajı veriyor."
  ],
  akademik_ve_sistem: [
    "Haftalık vize yoğunluğu sebebiyle algoritmik bir odaklanma sorunu yaşandı.",
    "Karmaşık veri yapıları arasında bir mantıksal döngü hatası oluştu.",
    "Sistem mimarisi teorik sınırlarına ulaştı, refactor edilmesi gerekiyor.",
    "Donanım sıcaklığı kritik seviyeye ulaştı, işlemci hızı otomatik düştü.",
    "Matematiksel kütüphane kök değerleri bulamadığı için sistem takıldı.",
    "Otomata teorisi kurallarına göre bu state geçişi imkansız.",
    "Rekürsif fonksiyon yığın (Stack) limitini aştı, sistem çöktü.",
    "Algoritma karmaşıklığı O(n^n) seviyesine çıktı, işlem bitmiyor.",
    "Donanım sürücüsü (Driver) işletim sistemiyle el sıkışamıyor.",
    "Bellek adresi hizalama hatası (Alignment error) yaşandı.",
    "Kayan nokta (Floating point) hassasiyeti veriyi bozdu.",
    "Derleyici (Compiler) kodu optimize ederken mantığı yok etti.",
    "İşlemci önbelleği (Cache miss) oranı %90'a ulaştı, sistem durdu.",
    "İşletim sistemi çekirdeği (Kernel) bir kernel panic uyarısı verdi.",
    "Dosya sistemi okuma hızı SSD limitlerine takıldı.",
    "BIOS ayarları donanımı yanlış yapılandırıyor.",
    "Grafik kartı sürücüsü kütüphane ile uyumsuz çıktı.",
    "RAM üzerindeki bir bit anlık radyasyon nedeniyle ters döndü.",
    "İşlemci çekirdekleri arasında bir yarış durumu (Race condition) var.",
    "Derleme (Build) işlemi sırasında bir segmentasyon hatası oluştu.",
    "Akademik takvimdeki yoğunluk kodun kalitesini olumsuz etkiledi.",
    "Sistem kütüphaneleri arasında sürüm çakışması (DLL Hell) var.",
    "Düşük seviyeli bellek yönetimi el ile yapılamıyor.",
    "İşlemci termal macunu özelliğini yitirmiş, sistem ısınıyor.",
    "Algoritma teoride çalışıyor ama pratikte donanım yetmiyor.",
    "Veri yapıları bellekte çok fazla fragmantasyona sebep oldu.",
    "Sistem çağrıları (System calls) işletim sistemi tarafından reddedildi.",
    "Bağlantı (Linker) aşamasında eksik bir sembol hatası alındı.",
    "Donanım kesmeleri (Interrupts) işlemciyi çok fazla meşgul ediyor.",
    "Sanal bellek alanı (Virtual memory) tamamen doldu.",
    "İşlemci komut seti bu kütüphaneyi desteklemiyor.",
    "Derleyici bayrakları (Compiler flags) yanlış ayarlanmış.",
    "Sistem saat hızı (Clock speed) kararsızlık gösteriyor.",
    "Donanım hızlandırma modülü yanıt vermeyi kesti.",
    "Yığın alanı (Heap) yönetimi sırasında bir bozulma tespit edildi.",
    "İşlemci boru hattı (Pipeline) sürekli boşalıyor, verim düştü.",
    "Algoritma için gerekli bellek miktati sistemde bulunmuyor.",
    "İşletim sistemi güncellenirken bazı API'leri kaldırmış.",
    "Donanım testleri geçti ama yazılım tarafında bir uyumsuzluk var.",
    "Sistem mimarisi 32-bit limitlerine takıldı.",
    "Matematiksel modelleme gerçek dünya verileriyle uyuşmuyor.",
    "İşlemci üzerindeki statik elektrik sistemi kilitledi.",
    "Donanım üreticisi sürücü desteğini dün itibariyle kesti.",
    "Algoritma için gerekli olan kütüphane lisans süresi dolmuş.",
    "Sistem dosyaları arasında bir bütünlük hatası var.",
    "İşlemci bugün çok fazla 'context switch' yapıyor.",
    "Donanım üzerindeki fanlar durdu, sistem kendisini koruyor.",
    "Algoritma teorik olarak kanıtlanamadığı için çalışmıyor.",
    "Sistem bugün kendisini bir hesap makinesi sanıyor.",
    "Donanım üzerindeki tozlar devreleri kısa devre yapıyor.",
    "İşlemci bugün kod yazmak istemiyor.",
    "Sistem bugün sadece 'Hello World' yazabiliyor.",
    "Donanım bugün emeklilik dilekçesi verdi.",
    "Algoritma bugün tatilde, haftaya gelin.",
    "Sistem bugün sadece 0 ve 1'lerden ibaret olduğunu fark etti.",
    "Donanım bugün bir bilgisayar olduğunu unuttu.",
    "İşlemci bugün sadece ısı üretmek için çalışıyor.",
    "Sistem bugün varoluşsal bir kriz içerisinde.",
    "Donanım bugün sadece ışık yakıp söndürüyor.",
    "Algoritma bugün bir bilmece sormayı tercih ediyor."
  ],
  klasik: [
    "Benim makinemde tıkır tıkır çalışıyor!",
    "Dün çalışıyordu, bugün neden böyle yaptı anlamak mümkün değil.",
    "Bu kod legacy (miras) sistemden geliyor, dokunursak her yer patlar.",
    "İnternetteki dokümantasyonda bu yöntemin kesin çalışacağı yazıyordu.",
    "Bu bir bug değil, kullanıcıya sürpriz yapan gizli bir özellik.",
    "Daha önce kimse bu hatayı raporlamamıştı, ilk sizde oldu.",
    "Sanırım internet kablosunda bir temassızlık var.",
    "Kodun ruhu bugün pek yerinde değil, yarın tekrar deneriz.",
    "Zaten bu özelliği kimse kullanmaz diye düşünmüştük.",
    "StackOverflow'daki en popüler cevap buydu, yanlış olamaz.",
    "Bir 'kapat-aç' yaparsak kesin düzelir.",
    "Bu hata sadece Dolunay zamanlarında ortaya çıkıyor.",
    "Kodda bir hata yok, sizin bakış açınızda bir sorun var.",
    "Aslında çalışıyor ama siz göremiyorsunuz.",
    "Bilgisayarın şarjı azaldığı için sistem performansını kıstı.",
    "Yazılımın bu sürümü sadece Pazartesi günleri çalışıyor.",
    "Daha dün gece test etmiştik, hiçbir sorun yoktu.",
    "Kodun o kısmını ben yazmadım, kimin yazdığını da bilmiyorum.",
    "Hata değil, bu bir optimizasyon tercihi.",
    "Bunu düzeltmek için tüm projeyi baştan yazmamız lazım.",
    "Zaten bu özellik gelecek sprint'te kaldırılacak.",
    "Sorun bende değil, veritabanındaki veriler bozuk.",
    "Sistem yavaş değil, siz çok hızlısınız.",
    "Bu hata mesajı aslında bir şaka, ciddiye almayın.",
    "Bilgisayarın fanı çok ses çıkarıyor, dikkatimi dağıttı.",
    "Kodun o satırı aslında orada yok, sadece öyle gözüküyor.",
    "Sistem bugün biraz içine kapanık, cevap vermek istemiyor.",
    "Hata sadece çift sayılı günlerde tetikleniyor.",
    "Kod aslında doğru ama mantık yanlış.",
    "Bunu düzeltmek için bir mucizeye ihtiyacımız var.",
    "Zaten bu projeyi hobi olarak yapıyorduk.",
    "Sorun işletim sisteminin yazı tipi ayarlarından kaynaklı.",
    "Kodun o kısmı henüz yazılmadı, sadece placeholder var.",
    "Aslında çalışıyor ama loglar yalan söylüyor.",
    "Sistem bugün kendisini bir sanat eseri olarak görüyor.",
    "Hata sadece mouse'u sol taraftan hareket ettirince oluyor.",
    "Kodun o kısmını rüyamda görmüştüm, gerçek hayatta çalışmadı.",
    "Zaten bu özelliği sadece bir kişi kullanacak.",
    "Sorun bilgisayarın masaya olan açısıyla ilgili.",
    "Kodun o satırı aslında bir yorum satırı olmalıydı.",
    "Sistem bugün sadece kahve içmek istiyor.",
    "Hata sadece klavyedeki 'A' tuşuna basınca oluyor.",
    "Kod aslında çalışmak istiyor ama çekiniyor.",
    "Zaten bu projeyi kimse satın almayacak.",
    "Sorun monitörün yenileme hızından kaynaklı.",
    "Kodun o kısmını kedim yanlışlıkla silmiş.",
    "Sistem bugün sadece müzik çalmak istiyor.",
    "Hata sadece gömlek giydiğim günlerde oluyor.",
    "Kod aslında bir yapay zeka tarafından yazıldı, ben suçsuzum.",
    "Zaten bu projeyi yarın çöpe atacağız.",
    "Sorun odadaki nem oranından kaynaklı.",
    "Kodun o satırı aslında bir gizli mesaj içeriyor.",
    "Sistem bugün sadece dinlenmek istiyor.",
    "Hata sadece sessiz ortamlarda oluyor.",
    "Kod aslında bir sosyal deneyin parçası.",
    "Zaten bu projeyi hobi bahçesi olarak görüyoruz.",
    "Sorun bilgisayarın markasından kaynaklı.",
    "Kodun o kısmını unutmuşum, normal bir durum.",
    "Sistem bugün sadece 'ERROR' yazmayı seviyor.",
    "Hata aslında bir başarı mesajı, yanlış anlaşıldı."
  ]
};

// --- AUDIO ENGINE ---
const audio = (() => {
  let ctx = null;
  let muted = false;
  const init = () => { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); };
  return {
    play: (t) => {
      if (muted) return;
      init();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      if (t === 'tick') {
        osc.type = 'square'; osc.frequency.setValueAtTime(80, ctx.currentTime);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.03);
        osc.start(); osc.stop(ctx.currentTime + 0.03);
      } else if (t === 'success') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(660, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.start(); osc.stop(ctx.currentTime + 0.6);
      } else if (t === 'error') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(110, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
      }
    },
    toggle: () => { muted = !muted; return muted; }
  };
})();

// --- UTILS ---
const formatExcuse = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
const getFontSize = (text) => text.length > 80 ? 'text-xl' : text.length > 50 ? 'text-2xl' : 'text-4xl';

// --- COMPONENTS ---

const DigitalRain = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, cols;
    const fs = 14;
    const drops = [];
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.floor(w / fs);
      for (let i = 0; i < cols; i++) drops[i] = 1;
    };
    window.addEventListener('resize', resize);
    resize();
    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = fs + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = i * fs;
        const y = drops[i] * fs;
        ctx.fillStyle = Math.random() > 0.95 ? '#fff' : '#ef444433';
        ctx.fillText(text, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      requestAnimationFrame(draw);
    };
    draw();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <canvas ref={canvasRef} className="canvas-bg opacity-30" />;
};

export default function App() {
  const [category, setCategory] = useState('rastgele');
  const [currentExcuse, setCurrentExcuse] = useState("Awaiting command...");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [overheat, setOverheat] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [scrambleText, setScrambleText] = useState("");
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState(() => JSON.parse(localStorage.getItem('v5_stats') || '{"total":0,"cat":{}}'));

  const machineRef = useRef(null);
  const lastClickTime = useRef(0);
  const scrambleInterval = useRef(null);

  // --- 3D TILT ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sprX = useSpring(useTransform(mouseY, [-400, 400], [8, -8]), { stiffness: 150, damping: 30 });
  const sprY = useSpring(useTransform(mouseX, [-400, 400], [-8, 8]), { stiffness: 150, damping: 30 });

  useEffect(() => {
    localStorage.setItem('v5_stats', JSON.stringify(stats));
  }, [stats]);

  // Konami Code: BUG
  useEffect(() => {
    let keys = [];
    const handler = (e) => {
      keys.push(e.key.toUpperCase());
      keys = keys.slice(-3);
      if (keys.join('') === 'BUG') {
        setOverheat(true);
        setCurrentExcuse("FATAL ERROR: System core breached by BUG protocol.");
        audio.play('error');
        setTimeout(() => setOverheat(false), 8000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const spin = useCallback(async () => {
    if (isSpinning || overheat) return;

    const now = Date.now();
    if (now - lastClickTime.current < 450) {
      setClickCount(c => {
        if (c >= 4) {
          setOverheat(true);
          audio.play('error');
          setCurrentExcuse("THERMAL SHUTDOWN: Critical temperature reached!");
          setTimeout(() => { setOverheat(false); setClickCount(0); }, 5000);
          return c;
        }
        return c + 1;
      });
    } else {
      setClickCount(0);
    }
    lastClickTime.current = now;

    setIsSpinning(true);
    const chars = "01ABCDEF#$@&*";
    
    // Decipher Animation
    scrambleInterval.current = setInterval(() => {
      let res = "";
      for (let i = 0; i < 20; i++) res += chars[Math.floor(Math.random() * chars.length)];
      setScrambleText(res);
      audio.play('tick');
    }, 80);

    setTimeout(() => {
      clearInterval(scrambleInterval.current);
      const pool = category === 'rastgele' ? Object.values(categorizedExcuses).flat() : categorizedExcuses[category];
      const result = pool[Math.floor(Math.random() * pool.length)];
      setCurrentExcuse(formatExcuse(result));
      audio.play('success');
      setStats(s => ({
        total: s.total + 1,
        cat: { ...s.cat, [category]: (s.cat[category] || 0) + 1 }
      }));
      setIsSpinning(false);
    }, 2000);
  }, [isSpinning, overheat, clickCount, category]);

  // Keyboard trigger
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.code === 'Space' || e.code === 'Enter') && document.activeElement === document.body) {
        e.preventDefault();
        spin();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [spin]);

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative transition-all duration-1000 ${overheat ? 'overheat-active' : ''}`}
      onMouseMove={(e) => {
        const rect = machineRef.current?.getBoundingClientRect();
        if (rect) {
          mouseX.set(e.clientX - (rect.left + rect.width / 2));
          mouseY.set(e.clientY - (rect.top + rect.height / 2));
        }
      }}
    >
      <DigitalRain />

      {/* HUD PANEL */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="fixed top-6 left-6 hud-panel p-4 rounded-xl z-50 font-mono text-[9px] hidden md:block">
        <div className="flex items-center gap-2 text-red-500 mb-3 opacity-80">
          <Activity size={12} /> <span>CORE_V5.0_STABLE</span>
        </div>
        <div className="space-y-1.5 text-slate-400">
          <p className="flex justify-between gap-6">TOTAL_EXCUSES: <span className="text-white font-bold">{stats.total}</span></p>
          <p className="flex justify-between gap-6">UPTIME: <span className="text-green-500">100%</span></p>
          <p className="flex justify-between gap-6">LATENCY: <span className="text-blue-400">0.02ms</span></p>
        </div>
      </motion.div>

      {/* MUTE TOGGLE */}
      <button 
        onClick={() => setIsMuted(audio.toggle())}
        className="fixed top-6 right-6 p-4 rounded-xl hud-panel text-red-500/80 hover:text-red-500 transition-all z-50 active:scale-90"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* HEADER */}
      <header className="mb-12 text-center z-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            V5.0 <span className="text-red-600">DIAMOND</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2 text-slate-600 font-mono text-[9px] tracking-[0.6em] uppercase">
            <Thermometer size={10} className={overheat ? "text-red-500 animate-pulse" : ""} />
            <span>Neural Responsibility Engine</span>
          </div>
        </motion.div>
      </header>

      {/* CATEGORIES */}
      <nav className="flex flex-wrap justify-center gap-2 mb-14 z-20 max-w-2xl">
        {[
          { id: 'rastgele', label: 'Rastgele', icon: <Ghost size={14} /> },
          { id: 'frontend', label: 'Frontend', icon: <Monitor size={14} /> },
          { id: 'backend_sistem', label: 'Backend', icon: <Layers size={14} /> },
          { id: 'ai_prompt', label: 'AI/Prompt', icon: <Zap size={14} /> },
          { id: 'akademik_ve_sistem', label: 'Vize/Sistem', icon: <Code2 size={14} /> },
          { id: 'klasik', label: 'Klasik', icon: <History size={14} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => !isSpinning && !overheat && setCategory(tab.id)}
            className={`neon-tab px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-white/5 transition-all ${category === tab.id ? 'active' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      {/* DIAMOND MACHINE */}
      <motion.div 
        ref={machineRef}
        style={{ rotateX: sprX, rotateY: sprY, perspective: 1500 }}
        className="relative w-full max-w-5xl z-10"
      >
        <div className="diamond-border rounded-[3.5rem] p-4 glass-panel">
          <div 
            className="digital-screen h-80 md:h-[450px] rounded-[3rem] flex items-center justify-center px-12 relative"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setSpotlight({ x: e.clientX - r.left, y: e.clientY - r.top });
            }}
          >
            {/* SPOTLIGHT EFFECT */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-40 z-20"
              style={{ background: `radial-gradient(circle 200px at ${spotlight.x}px ${spotlight.y}px, rgba(239, 68, 68, 0.15), transparent)` }}
            />
            
            <div className="absolute inset-0 crt-overlay opacity-30" />
            
            {overheat && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-40 bg-red-950/40 backdrop-blur-md flex flex-col items-center justify-center text-red-500 font-black gap-6 text-center px-12">
                <ShieldAlert size={80} className="animate-siren" />
                <h2 className="text-4xl uppercase italic tracking-tighter drop-shadow-lg">Core Failure</h2>
                <p className="font-mono text-xs text-white/70">EMERGENCY COOLING PROTOCOL INITIATED. DO NOT REBOOT.</p>
              </motion.div>
            )}

            <div className="relative z-30 text-center w-full">
              <AnimatePresence mode="wait">
                {!isSpinning ? (
                  <motion.div
                    key="excuse"
                    initial={{ opacity: 0, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative group"
                  >
                    <p className={`font-black text-white leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 ${getFontSize(currentExcuse)}`}>
                      {currentExcuse}
                    </p>

                    {!overheat && currentExcuse !== "Awaiting command..." && (
                      <div className="absolute -bottom-24 right-0 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="relative group/btn">
                          <button onClick={() => { navigator.clipboard.writeText(currentExcuse); setShowToast(true); setTimeout(() => setShowToast(false), 2000); }} className="p-3.5 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-red-500/50 transition-all"><Copy size={18} /></button>
                          <span className="tooltip">KOPYALA</span>
                        </div>
                        <div className="relative group/btn">
                          <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentExcuse)}`, '_blank')} className="p-3.5 rounded-xl glass-panel text-slate-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all"><Share2 size={18} /></button>
                          <span className="tooltip">PAYLAŞ</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                    <p className="scramble-text text-5xl md:text-8xl font-black text-red-500/30 tracking-[0.2em]">{scrambleText}</p>
                    <p className="text-[10px] font-mono text-red-500/50 tracking-[1em] animate-pulse">DECIPHERING_KERNEL...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute left-0 w-full h-[1px] bg-red-600/30 top-1/2 -translate-y-1/2 z-40" />
          </div>
        </div>
      </motion.div>

      {/* DIAMOND ACTION */}
      <footer className="mt-16 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={spin}
          disabled={isSpinning || overheat}
          className={`
            relative px-24 py-9 rounded-[2.5rem] text-3xl font-black text-white uppercase tracking-tighter
            transition-all duration-300 group overflow-hidden
            ${isSpinning || overheat ? 'opacity-20 cursor-not-allowed' : 'shadow-[0_0_50px_rgba(239,68,68,0.4)] hover:shadow-[0_0_80px_rgba(239,68,68,0.7)]'}
          `}
          style={{ background: 'linear-gradient(135deg, #ef4444 0%, #7f1d1d 100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="relative flex items-center gap-6">
            {isSpinning ? <RefreshCcw className="animate-spin" size={32} /> : <Zap size={32} fill="white" />}
            <span>{isSpinning ? "SYNCING" : "GENERATE"}</span>
          </div>
        </motion.button>
      </footer>

      {/* TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="fixed bottom-12 bg-slate-900 border border-red-500/40 px-10 py-5 rounded-2xl flex items-center gap-4 text-white font-bold shadow-2xl z-50 backdrop-blur-xl">
            <CheckCircle2 className="text-green-500" /> <span className="tracking-widest text-xs">DATA_SYNCED_TO_CLIPBOARD</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16 flex gap-12 text-[8px] font-mono text-slate-800 uppercase tracking-[1em] opacity-50">
        <span>Diamond_Release</span>
        <span>Awwwards_Submission</span>
        <span>Neural_Responsibility</span>
      </div>
    </div>
  );
}
