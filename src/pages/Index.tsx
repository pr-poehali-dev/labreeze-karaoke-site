import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ────────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    id: 1,
    title: "Live Cover Band",
    date: "20 июня",
    time: "20:00",
    image: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/5dbaaf80-b935-494b-816b-68c4e40539fd.jpg",
    description: "Живые выступления любимых хитов 80–2000-х. Зажигательная атмосфера у самого моря.",
    tag: "Живая музыка",
  },
  {
    id: 2,
    title: "Karaoke Night",
    date: "22 июня",
    time: "19:00",
    image: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/6b08763e-92c9-4e82-862f-d03bb2b35b8e.jpg",
    description: "Профессиональный звук, ведущий и огромная база песен. Звезда вечера — ты.",
    tag: "Караоке",
  },
  {
    id: 3,
    title: "Закатный вечер",
    date: "25 июня",
    time: "18:30",
    image: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/3a2571a2-fe22-492f-8fb3-f546f510e5d1.jpg",
    description: "Особый вечер с живой музыкой под открытым небом и видом на море в момент заката.",
    tag: "Специальное",
  },
];

const MENU = [
  {
    category: "Горячее",
    items: [
      { name: "Сибас на мангале", desc: "Лимон, тимьян, оливковое масло", price: 1490 },
      { name: "Рибай на углях", desc: "250 г, соус демиглас, картофель", price: 2290 },
      { name: "Паста с морепродуктами", desc: "Тальятелле, мидии, креветки, сливки", price: 890 },
    ],
  },
  {
    category: "Закуски",
    items: [
      { name: "Карпаччо из тунца", desc: "Каперсы, пармезан, руккола", price: 690 },
      { name: "Брускетта с авокадо", desc: "Томаты черри, микрозелень", price: 390 },
      { name: "Устрицы", desc: "3 шт., лимон, соус мигньонетт", price: 850 },
    ],
  },
  {
    category: "Напитки",
    items: [
      { name: "Авторский лимонад", desc: "Маракуйя, мята, лайм", price: 290 },
      { name: "Бокал розового вина", desc: "Прованс, 150 мл", price: 490 },
      { name: "Шампанское", desc: "Брют, 150 мл", price: 590 },
    ],
  },
];

const GALLERY = [
  { src: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/3a2571a2-fe22-492f-8fb3-f546f510e5d1.jpg", alt: "Закат с террасы", tall: true },
  { src: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/8b5b213e-c203-4b8b-af5d-07fcd068a06e.jpg", alt: "Летняя терраса", tall: false },
  { src: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/5edfb41e-05ac-444b-a855-ebc3d0bf5b30.jpg", alt: "Вечерний зал", tall: false },
  { src: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/a2282e95-267e-4722-a854-2bd8cda71614.jpg", alt: "Блюда ЛаБриз", tall: true },
  { src: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/75d18a04-72c5-433c-8fd8-4eadf7209248.jpg", alt: "Коктейли", tall: false },
  { src: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/86ea65a4-ecf9-48b5-ade4-738ee283fbbe.jpg", alt: "Еда и напитки", tall: false },
  { src: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/b0a2583b-4afd-49d0-9f5f-4d7197ed7129.jpg", alt: "Атмосфера заведения", tall: true },
  { src: "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/607b67cb-27cd-4778-a055-6ed6ad4ce22d.jpg", alt: "Вывеска Karaoke", tall: false },
];

// ─── SCROLL REVEAL HOOK ──────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "О нас" },
    { href: "#events", label: "Афиша" },
    { href: "#karaoke", label: "Караоке" },
    { href: "#menu", label: "Меню" },
    { href: "#gallery", label: "Галерея" },
    { href: "#booking", label: "Бронирование" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: scrolled ? "rgba(255,254,249,0.92)" : "transparent",
        boxShadow: scrolled ? "0 1px 30px rgba(26,58,92,0.08)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <img
            src="https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/06c0b432-0a15-44b7-8ab1-8f830beee38f.png"
            alt="ЛаБриз"
            className="object-contain transition-all duration-300"
            style={{
              width: scrolled ? 48 : 56,
              height: scrolled ? 48 : 56,
            }}
          />
          <span
            className="hidden sm:block font-brand text-xl transition-colors duration-300"
            style={{ color: scrolled ? "var(--sea)" : "white" }}
          >
            ЛаБриз
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-sm tracking-wide transition-colors duration-200"
                style={{ color: scrolled ? "#2a3a4a" : "rgba(255,255,255,0.88)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "var(--sea)" : "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "#2a3a4a" : "rgba(255,255,255,0.88)")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="tel:+79885506888"
          className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300"
          style={
            scrolled
              ? { backgroundColor: "var(--sea)", color: "white" }
              : { backgroundColor: "rgba(255,255,255,0.18)", color: "white", border: "1px solid rgba(255,255,255,0.4)" }
          }
        >
          <Icon name="Phone" size={14} />
          +7 988 550-68-88
        </a>

        <button
          className="lg:hidden p-2 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: scrolled ? "var(--sea)" : "white" }}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden px-6 py-5 border-t"
          style={{ backgroundColor: "rgba(255,254,249,0.97)", borderColor: "var(--sand)" }}
        >
          <ul className="flex flex-col gap-4 mb-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-body text-base"
                  style={{ color: "var(--sea)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="tel:+79885506888" className="flex items-center gap-2 font-body font-medium text-sm" style={{ color: "var(--sea)" }}>
            <Icon name="Phone" size={16} />
            +7 988 550-68-88
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[10s]"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/3a2571a2-fe22-492f-8fb3-f546f510e5d1.jpg)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10,25,45,0.35) 0%, rgba(10,25,45,0.1) 40%, rgba(10,25,45,0.6) 100%)",
        }}
      />

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 100 }}>
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path d="M0,50 C480,100 960,0 1440,50 L1440,100 L0,100 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="font-body text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 animate-fade-in"
          style={{ color: "var(--gold-light)", opacity: 0, animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          Анапа · Первая линия · У моря
        </p>
        <h1
          className="font-brand text-8xl sm:text-9xl text-white mb-3 animate-fade-in-up"
          style={{ lineHeight: 1.1, opacity: 0, animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          ЛаБриз
        </h1>
        <p
          className="font-display text-2xl sm:text-3xl md:text-4xl italic font-light mb-5 animate-fade-in-up"
          style={{ color: "var(--gold-light)", opacity: 0, animationDelay: "0.45s", animationFillMode: "forwards" }}
        >
          Вкус заката у моря
        </p>
        <p
          className="font-body text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          Музыка, вкус и эмоции на первой линии Анапы
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.75s", animationFillMode: "forwards" }}
        >
          <a
            href="#booking"
            className="px-8 py-4 rounded-full font-body font-semibold text-base transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{ backgroundColor: "var(--gold)", color: "#1a2533" }}
          >
            Забронировать стол
          </a>
          <a
            href="tel:+79885506888"
            className="px-8 py-4 rounded-full font-body font-medium text-base text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center justify-center gap-2"
            style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}
          >
            <Icon name="Phone" size={16} />
            Позвонить
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "rgba(255,255,255,0.45)" }}>
        <Icon name="ChevronDown" size={26} />
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" style={{ backgroundColor: "var(--cream)" }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="reveal">
          <p className="font-body text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "var(--gold)" }}>
            О нас
          </p>
          <h2
            className="font-display text-5xl sm:text-6xl font-light leading-[1.1] mb-6"
            style={{ color: "var(--sea)" }}
          >
            Каждый вечер —<br />
            <em>маленький концерт</em>
          </h2>
          <div className="gold-divider mb-8" />
          <p className="font-body text-base leading-relaxed mb-5" style={{ color: "#3d4f60" }}>
            ЛаБриз — это место, где каждый вечер превращается в маленький концерт. Профессиональное
            караоке, качественный звук, уютная атмосфера, кухня, напитки и незабываемые закаты над морем.
          </p>
          <p className="font-display text-2xl italic font-light" style={{ color: "var(--sea)" }}>
            Здесь главный артист — ты.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { value: "5+", label: "лет у моря" },
              { value: "2000+", label: "песен в базе" },
              { value: "1-я", label: "линия Анапы" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-5 text-center"
                style={{ backgroundColor: "var(--sand)" }}
              >
                <p className="font-display text-4xl font-semibold" style={{ color: "var(--gold)" }}>
                  {stat.value}
                </p>
                <p className="font-body text-xs mt-1" style={{ color: "#7a8a9a" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal delay-200 relative">
          <div
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 40px 90px rgba(26,58,92,0.18)" }}
          >
            <img
              src="https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/6b08763e-92c9-4e82-862f-d03bb2b35b8e.jpg"
              alt="Интерьер ЛаБриз"
              className="w-full object-cover"
              style={{ height: 500 }}
            />
          </div>
          <div
            className="absolute -bottom-5 -left-5 rounded-2xl px-6 py-4 shadow-xl"
            style={{ backgroundColor: "var(--gold)", color: "#1a2533" }}
          >
            <p className="font-body text-xs font-semibold uppercase tracking-wider">Открыто сейчас</p>
            <p className="font-display text-xl font-semibold mt-0.5">11:00 — 03:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────

function Events() {
  return (
    <section id="events" style={{ backgroundColor: "var(--sand)" }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Афиша
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-light" style={{ color: "var(--sea)" }}>
            Ближайшие события
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map((ev, i) => (
            <div
              key={ev.id}
              className="reveal card-hover bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 8px 40px rgba(26,58,92,0.09)", animationDelay: `${i * 0.12}s` }}
            >
              <div className="relative overflow-hidden" style={{ height: 210 }}>
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="font-body text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "var(--gold)", color: "#1a2533" }}
                  >
                    {ev.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center gap-1.5 font-body text-xs" style={{ color: "var(--sea)" }}>
                    <Icon name="Calendar" size={12} />
                    {ev.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-body text-xs" style={{ color: "var(--sea)" }}>
                    <Icon name="Clock" size={12} />
                    {ev.time}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium mb-2" style={{ color: "var(--sea)" }}>
                  {ev.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#7a8a9a" }}>
                  {ev.description}
                </p>
                <a
                  href="#booking"
                  className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-medium transition-opacity hover:opacity-60"
                  style={{ color: "var(--gold)" }}
                >
                  Забронировать место
                  <Icon name="ArrowRight" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── KARAOKE ─────────────────────────────────────────────────────────────────

function Karaoke() {
  const features = [
    { icon: "Mic2", title: "Профессиональный звук", desc: "Студийное оборудование Shure и JBL. Ты звучишь как звезда." },
    { icon: "Music", title: "База 2000+ песен", desc: "Русские, зарубежные, ретро и новинки. Обновляется каждый месяц." },
    { icon: "Users", title: "Ведущий и шоу", desc: "Опытный ведущий создаёт атмосферу и вовлекает весь зал." },
    { icon: "Star", title: "Дуэты и конкурсы", desc: "Пой с друзьями, участвуй в конкурсах и выигрывай призы." },
    { icon: "Sunset", title: "Вечерняя атмосфера", desc: "Мягкий свет, живые цветы, море за окном — всё для вдохновения." },
    { icon: "Heart", title: "Для всех", desc: "От романтических вечеров для двоих до корпоративов на 50 человек." },
  ];

  return (
    <section id="karaoke" style={{ backgroundColor: "var(--cream)" }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="reveal order-2 lg:order-1">
          <div
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 40px 90px rgba(26,58,92,0.15)" }}
          >
            <img
              src="https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/5dbaaf80-b935-494b-816b-68c4e40539fd.jpg"
              alt="Живое выступление"
              className="w-full object-cover"
              style={{ height: 540 }}
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="reveal">
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--gold)" }}>
              Караоке
            </p>
            <h2 className="font-display text-5xl sm:text-6xl font-light leading-[1.1] mb-4" style={{ color: "var(--sea)" }}>
              Ты — <em>звезда</em><br />этого вечера
            </h2>
            <div className="gold-divider mb-8" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div key={f.title} className="reveal flex gap-4" style={{ animationDelay: `${i * 0.08}s` }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--sea)", color: "var(--gold-light)" }}
                >
                  <Icon name={f.icon} size={17} fallback="Music" />
                </div>
                <div>
                  <p className="font-body font-semibold text-sm mb-0.5" style={{ color: "var(--sea)" }}>{f.title}</p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "#7a8a9a" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MENU ─────────────────────────────────────────────────────────────────────

const MENU_IMAGES = [
  {
    label: "Кухня",
    images: [
      "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/5d12ebeb-dd54-4af4-9d1f-a21a76b9c330.jpeg",
      "https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/823712a2-62a7-42d0-b4a8-807f74eff3dd.jpeg",
    ],
  },
];

function Menu() {
  const [activeImageMenu, setActiveImageMenu] = useState(0);

  return (
    <section id="menu" style={{ backgroundColor: "var(--sea)" }} className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Меню
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-light text-white">
            Вкус у самого моря
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="reveal">
          <div className="flex justify-center gap-3 mb-8">
            {["Основное меню", "Пицца и детское"].map((label, i) => (
              <button
                key={i}
                onClick={() => setActiveImageMenu(i)}
                className="font-body text-sm px-6 py-2.5 rounded-full transition-all duration-300"
                style={
                  activeImageMenu === i
                    ? { backgroundColor: "var(--gold)", color: "#1a2533", fontWeight: 600 }
                    : { backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={MENU_IMAGES[0].images[activeImageMenu]}
              alt="Меню ЛаБриз"
              className="w-full h-auto"
              style={{ display: "block" }}
            />
          </div>
        </div>

        <p className="text-center mt-10 font-body text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          Полное меню доступно в ресторане и у администратора
        </p>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section id="gallery" style={{ backgroundColor: "var(--cream)" }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Галерея
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-light" style={{ color: "var(--sea)" }}>
            Атмосфера ЛаБриз
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="masonry-grid reveal">
          {GALLERY.map((photo, i) => (
            <div
              key={i}
              className="card-hover rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ height: photo.tall ? 340 : 220 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BOOKING ─────────────────────────────────────────────────────────────────

function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", guests: "2", comment: "" });
  const [callForm, setCallForm] = useState({ name: "", phone: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const [callSubmitted, setCallSubmitted] = useState(false);
  const [showCallForm, setShowCallForm] = useState(false);

  const inputStyle = {
    borderColor: "var(--border)",
    backgroundColor: "var(--cream)",
    color: "#1a2533",
    width: "100%",
    borderRadius: 12,
    padding: "12px 16px",
    fontFamily: "'Golos Text', sans-serif",
    fontSize: 14,
    border: "1px solid var(--border)",
    outline: "none",
  };

  return (
    <section id="booking" style={{ backgroundColor: "var(--sand)" }} className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Бронирование
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-light" style={{ color: "var(--sea)" }}>
            Забронировать стол
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Main form */}
          <div
            className="reveal bg-white rounded-3xl p-8"
            style={{ boxShadow: "0 20px 70px rgba(26,58,92,0.1)" }}
          >
            {submitted ? (
              <div className="text-center py-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "var(--gold)", color: "#1a2533" }}
                >
                  <Icon name="Check" size={28} />
                </div>
                <h3 className="font-display text-3xl mb-2" style={{ color: "var(--sea)" }}>Заявка принята!</h3>
                <p className="font-body text-sm" style={{ color: "#7a8a9a" }}>
                  Мы свяжемся с вами в течение 30 минут для подтверждения.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <h3 className="font-display text-2xl mb-2" style={{ color: "var(--sea)" }}>Ваши данные</h3>
                {[
                  { key: "name", label: "Имя", type: "text", placeholder: "Ваше имя" },
                  { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 ___ ___-__-__" },
                  { key: "date", label: "Дата визита", type: "date", placeholder: "" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="font-body text-xs font-semibold mb-1.5 block" style={{ color: "var(--sea)" }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-body text-xs font-semibold mb-1.5 block" style={{ color: "var(--sea)" }}>
                    Количество гостей
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    style={inputStyle}
                  >
                    {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                      <option key={n} value={n}>{n} {n === "8+" ? "и более человек" : "чел."}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs font-semibold mb-1.5 block" style={{ color: "var(--sea)" }}>
                    Комментарий
                  </label>
                  <textarea
                    placeholder="Особые пожелания, повод, предпочтения..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    rows={3}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 hover:opacity-90 hover:scale-[1.01]"
                  style={{ backgroundColor: "var(--sea)", color: "white" }}
                >
                  Забронировать стол
                </button>
              </form>
            )}
          </div>

          {/* Right column */}
          <div className="reveal delay-200 space-y-6">
            <div
              className="rounded-3xl p-7 text-white"
              style={{ backgroundColor: "var(--sea)" }}
            >
              <h3 className="font-display text-2xl font-light mb-5">Контакты</h3>
              <div className="space-y-4">
                {[
                  { icon: "MapPin", text: "Анапа, Набережная улица, 34" },
                  { icon: "Phone", text: "+7 988 550-68-88", href: "tel:+79885506888" },
                  { icon: "Clock", text: "11:00 — 03:00, без выходных" },
                ].map((c) => (
                  <div key={c.icon} className="flex items-center gap-3">
                    <span style={{ color: "var(--gold-light)", flexShrink: 0 }}><Icon name={c.icon} size={15} fallback="MapPin" /></span>
                    {c.href ? (
                      <a href={c.href} className="font-body text-sm hover:opacity-75">{c.text}</a>
                    ) : (
                      <span className="font-body text-sm">{c.text}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5 mt-6">
                {[
                  { label: "WhatsApp", href: "https://wa.me/79885506888", icon: "MessageCircle", bg: "#25D366" },
                  { label: "Telegram", href: "https://t.me/karaoke_anapa", icon: "Send", bg: "#229ED9" },
                  { label: "MAX", href: "https://max.ru/labriz_anapa", icon: "MessageSquare", bg: "#FF6B35" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-sm font-medium transition-all hover:scale-105"
                    style={{ backgroundColor: s.bg, color: "white" }}
                  >
                    <Icon name={s.icon} size={14} fallback="MessageCircle" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Callback */}
            <div
              className="bg-white rounded-3xl p-6"
              style={{ boxShadow: "0 10px 40px rgba(26,58,92,0.08)" }}
            >
              {callSubmitted ? (
                <div className="text-center py-4">
                  <span className="flex justify-center" style={{ color: "var(--gold)" }}><Icon name="PhoneCall" size={36} /></span>
                  <p className="font-display text-xl mt-2" style={{ color: "var(--sea)" }}>Перезвоним скоро!</p>
                  <p className="font-body text-xs mt-1" style={{ color: "#7a8a9a" }}>Обычно в течение 15 минут</p>
                </div>
              ) : !showCallForm ? (
                <div>
                  <p className="font-body text-sm mb-4 text-center" style={{ color: "#7a8a9a" }}>
                    Хотите, чтобы мы перезвонили?
                  </p>
                  <button
                    onClick={() => setShowCallForm(true)}
                    className="w-full py-3.5 rounded-xl font-body font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.01] flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--gold)", color: "#1a2533" }}
                  >
                    <Icon name="PhoneCall" size={15} />
                    Заказать обратный звонок
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setCallSubmitted(true); }} className="space-y-4">
                  <h3 className="font-display text-xl mb-1" style={{ color: "var(--sea)" }}>Обратный звонок</h3>
                  {[
                    { key: "name", label: "Имя", type: "text", placeholder: "Ваше имя" },
                    { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 ___ ___-__-__" },
                    { key: "time", label: "Удобное время", type: "text", placeholder: "Например: с 14 до 17" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="font-body text-xs font-semibold mb-1 block" style={{ color: "var(--sea)" }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required
                        value={callForm[f.key as keyof typeof callForm]}
                        onChange={(e) => setCallForm({ ...callForm, [f.key]: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-body font-semibold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "var(--sea)", color: "white" }}
                  >
                    Отправить
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACTS ────────────────────────────────────────────────────────────────

function Contacts() {
  return (
    <section id="contacts" style={{ backgroundColor: "var(--cream)" }} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--gold)" }}>
            Контакты
          </p>
          <h2 className="font-display text-5xl sm:text-6xl font-light" style={{ color: "var(--sea)" }}>
            Как нас найти
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="reveal rounded-3xl overflow-hidden shadow-xl" style={{ height: 420 }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.315102%2C44.898815&z=17&l=map&pt=37.315102%2C44.898815%2Cpm2rdm~%D0%9B%D0%B0%D0%91%D1%80%D0%B8%D0%B7"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Карта ЛаБриз"
              style={{ border: 0, display: "block" }}
              allowFullScreen
            />
          </div>

          <div className="reveal delay-200">
            <div
              className="rounded-3xl p-8 bg-white"
              style={{ boxShadow: "0 10px 50px rgba(26,58,92,0.08)" }}
            >
              <h3 className="font-display text-3xl font-light mb-7" style={{ color: "var(--sea)" }}>ЛаБриз</h3>
              <div className="space-y-5">
                {[
                  { icon: "MapPin", label: "Адрес", text: "Анапа, Набережная улица, 34" },
                  { icon: "Phone", label: "Телефон", text: "+7 988 550-68-88", href: "tel:+79885506888" },
                  { icon: "Clock", label: "Режим работы", text: "11:00 — 03:00, без выходных" },
                ].map((c) => (
                  <div key={c.icon} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#e8f0f8", color: "var(--sea)" }}
                    >
                      <Icon name={c.icon} size={17} fallback="MapPin" />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-wider mb-0.5" style={{ color: "var(--gold)" }}>
                        {c.label}
                      </p>
                      {c.href ? (
                        <a href={c.href} className="font-body text-sm hover:opacity-70 transition-opacity" style={{ color: "#3d4f60" }}>
                          {c.text}
                        </a>
                      ) : (
                        <p className="font-body text-sm" style={{ color: "#3d4f60" }}>{c.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--sand)" }}>
                <p className="font-body text-xs uppercase tracking-wider mb-4" style={{ color: "var(--gold)" }}>
                  Следите за нами
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "ВКонтакте", href: "https://vk.com/labrizanapa", icon: "Users", bg: "#0077FF" },
                    { label: "Telegram", href: "https://t.me/karaoke_anapa", icon: "Send", bg: "#229ED9" },
                    { label: "WhatsApp", href: "https://wa.me/79885506888", icon: "MessageCircle", bg: "#25D366" },
                    { label: "MAX", href: "https://max.ru/labriz_anapa", icon: "MessageSquare", bg: "#FF6B35" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-all hover:scale-105"
                      style={{ backgroundColor: s.bg, color: "white" }}
                    >
                      <Icon name={s.icon} size={14} fallback="Users" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--sea)" }} className="py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/3fa0fa67-7615-44dd-ac91-dea1559fd9c7/bucket/06c0b432-0a15-44b7-8ab1-8f830beee38f.png"
            alt="ЛаБриз"
            className="w-14 h-14 object-contain"
          />
          <div>
            <p className="font-brand text-2xl text-white">ЛаБриз</p>
            <p className="font-body text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
              Вкус заката у моря
            </p>
          </div>
        </div>
        <p className="font-body text-xs text-center" style={{ color: "rgba(255,255,255,0.28)" }}>
          © 2024 ЛаБриз · Анапа, Набережная улица, 34
        </p>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Index() {
  useReveal();

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", backgroundColor: "var(--cream)" }}>
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Karaoke />
      <Menu />
      <Gallery />
      <Booking />
      <Contacts />
      <Footer />
    </div>
  );
}