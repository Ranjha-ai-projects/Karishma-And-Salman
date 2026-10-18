export interface EventScheduleItem {
  label: string;
  time: string;
}

export interface EventTheme {
  primaryColor: string;
  secondaryColor: string;
  panelBg: string;
  cardBorder: string;
  buttonBg: string;
  buttonHoverBg: string;
  buttonText: string;
  buttonBorder: string;
  tagBg: string;
  tagText: string;
  archStroke: string;
  iconBorder: string;
  iconBg: string;
}

export interface WeddingEvent {
  id: string;
  tag: string; // e.g. "CEREMONY 1"
  title: string; // e.g. "Haldi"
  subtitle?: string; // Poetic subtitle
  icon: string; // path to icon
  image: string; // path to artwork image
  date: string; // e.g. "Thursday, 03 Dec 2026"
  time: string; // e.g. "04:00 PM onwards"
  venue: string; // e.g. "Nabipur, Sultanpur"
  directionsUrl?: string; // map directions URL
  gradientBg: string;
  theme: EventTheme;
  schedule?: EventScheduleItem[];
}

export interface InvitationData {
  bismillah: string;
  bismillahTranslation: string;
  hostHeader: string;
  familyIntro: string;
  invitationNote: string;
  quranVerse: string;
  quranVerseTranslation: string;
  quranReference: string;
  bride: {
    name: string;
    subtitle: string;
    parents: string;
  };
  groom: {
    name: string;
    subtitle: string;
    parents: string;
  };
  mainEvent: {
    blessing: string;
    title: string;
    date: string;
    time: string;
    venue: string;
    dateRangeBadge: string;
    locationBadge: string;
    targetTimestamp: string; // for countdown ISO string
    timeline?: EventScheduleItem[];
  };
  saveTheDate: {
    header: string;
    title: string;
    badge: string;
    revealText: string;
    location: string;
    revealedDate: string;
  };
  countdown: {
    header: string;
    title: string;
    footerNote: string;
    targetDate: string;
  };
  events: WeddingEvent[];
  venue: {
    header: string;
    title: string;
    name: string;
    cityState: string;
    description: string;
    address: string;
    directionsUrl: string;
    mapEmbedUrl: string;
    image: string;
    secondaryImage?: string;
  };
  family: {
    header: string;
    title: string;
    names: string[];
    closing: string;
  };
  thankYou: {
    header: string;
    title: string;
    message: string;
    signOff: string;
  };
  musicUrl: string;
}

export const invitationData: InvitationData = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  bismillahTranslation: "In the name of Allah, the Most Gracious, the Most Merciful",
  hostHeader: "Mohd. Shameem & Family",
  familyIntro: "✦ TOGETHER WITH THEIR FAMILIES ✦",
  invitationNote: "Cordially invite you to grace the auspicious occasion of the wedding ceremony of their beloved daughter",
  quranVerse: "وَخَلَقْنَاكُمْ أَزْوَاجًا",
  quranVerseTranslation: "“And We created you in pairs.”",
  quranReference: "— QUR'AN 78:8",
  bride: {
    name: "Karishma Siddiqui",
    subtitle: "D/o Mohd. Shameem",
    parents: "Nabipur, Sultanpur"
  },
  groom: {
    name: "Salman Siddiqui",
    subtitle: "S/o Late Mohd. Nizamuddin",
    parents: "Pihani, Hardoi"
  },
  mainEvent: {
    blessing: "إِنْ شَاءَ ٱللَّٰهُ",
    title: "Nikah Ceremony",
    date: "Saturday, 05 December 2026",
    time: "Barat 7:00 PM · Dinner 8:00 PM · Nikah 9:00 PM · Rukhsati 11:00 PM",
    venue: "Green Marriage Point, Nabipur Dihwa, Sultanpur",
    dateRangeBadge: "03–05 DEC 2026",
    locationBadge: "SULTANPUR, UTTAR PRADESH",
    targetTimestamp: "2026-12-05T21:00:00+05:30",
    timeline: [
      { label: "Barat", time: "7:00 PM" },
      { label: "Dinner", time: "8:00 PM" },
      { label: "Nikah", time: "9:00 PM" },
      { label: "Rukhsati", time: "11:00 PM" }
    ]
  },
  saveTheDate: {
    header: "MARK YOUR CALENDAR",
    title: "Save the Date",
    badge: "THREE DAYS OF CELEBRATION",
    revealText: "Swipe the gold to unveil our wedding dates",
    location: "SULTANPUR, UTTAR PRADESH",
    revealedDate: "03 Dec — 05 Dec, 2026 ✦"
  },
  countdown: {
    header: "THE COUNTDOWN BEGINS",
    title: "Counting the Moments",
    footerNote: "Until forever begins ✦ 05 December 2026",
    targetDate: "2026-12-05T21:00:00"
  },
  events: [
    {
      id: "haldi",
      tag: "CEREMONY 1",
      title: "Haldi",
      subtitle: "An auspicious morning bathed in love, laughter, and golden marigolds.",
      icon: "/assets/flower-haldi-transparent.png",
      image: "/assets/haldi.png",
      date: "Thursday, 03 Dec 2026",
      time: "04:00 PM onwards",
      venue: "Nabipur, Sultanpur",
      directionsUrl: "https://maps.google.com/?q=Nabipur+Sultanpur+Uttar+Pradesh",
      gradientBg: "from-[#fffcf5] via-[#faf4e4] to-[#f4e8cb]",
      theme: {
        primaryColor: "#91600e",
        secondaryColor: "#7e5309",
        panelBg: "bg-gradient-to-b from-[#fffefc] via-[#fbf7ee] to-[#f6ecdb]",
        cardBorder: "border-[#dfbd6c]/60 hover:border-[#dfbd6c]",
        buttonBg: "bg-gradient-to-r from-[#d8a946] via-[#c69733] to-[#b88624]",
        buttonHoverBg: "hover:from-[#c69733] hover:to-[#a7771a]",
        buttonText: "text-[#2e1904]",
        buttonBorder: "border-[#a37624]/60",
        tagBg: "bg-[#faedce] border border-[#e5bf70]/60",
        tagText: "text-[#87580b]",
        archStroke: "#caa045",
        iconBorder: "border-[#dfbd6c]",
        iconBg: "bg-[#fdf8eb]"
      }
    },
    {
      id: "mehendi",
      tag: "CEREMONY 2",
      title: "Mehndi",
      subtitle: "An evening of intricate henna patterns, folk songs, and timeless joy.",
      icon: "/assets/leaves-mehendi-transparent.png",
      image: "/assets/mehendi.png",
      date: "Friday, 04 Dec 2026",
      time: "08:00 PM onwards",
      venue: "Nabipur, Sultanpur",
      directionsUrl: "https://maps.google.com/?q=Nabipur+Sultanpur+Uttar+Pradesh",
      gradientBg: "from-[#f7fbf8] via-[#eef6f0] to-[#e0ede2]",
      theme: {
        primaryColor: "#1a5232",
        secondaryColor: "#154529",
        panelBg: "bg-gradient-to-b from-[#fdfefd] via-[#f4f8f5] to-[#e8efe9]",
        cardBorder: "border-[#87b893]/60 hover:border-[#87b893]",
        buttonBg: "bg-gradient-to-r from-[#1c5634] via-[#16472b] to-[#103821]",
        buttonHoverBg: "hover:from-[#16472b] hover:to-[#0b2917]",
        buttonText: "text-[#f3f9f4]",
        buttonBorder: "border-[#2c774c]/70",
        tagBg: "bg-[#e5f1e8] border border-[#9ac6a4]/60",
        tagText: "text-[#1a5232]",
        archStroke: "#528e65",
        iconBorder: "border-[#87b893]",
        iconBg: "bg-[#eef6f0]"
      }
    },
    {
      id: "nikah",
      tag: "CEREMONY 3",
      title: "Nikah & Barat",
      subtitle: "The sacred union of two hearts, heartfelt duas, and eternal vows under the stars.",
      icon: "/assets/lotus-nikah-transparent.png",
      image: "/assets/nikah.png",
      date: "Saturday, 05 Dec 2026",
      time: "Barat 7:00 PM onwards",
      venue: "Green Marriage Point, Nabipur Dihwa, Sultanpur",
      directionsUrl: "https://maps.app.goo.gl/4AmvFfDbLiwj2pSJA",
      gradientBg: "from-[#fffcfc] via-[#fcf3f2] to-[#f4e2e2]",
      theme: {
        primaryColor: "#6b1228",
        secondaryColor: "#570d1e",
        panelBg: "bg-gradient-to-b from-[#fffdfd] via-[#fbf3f3] to-[#f6e4e5]",
        cardBorder: "border-[#c48191]/60 hover:border-[#c48191]",
        buttonBg: "bg-gradient-to-r from-[#6b1228] via-[#5c0e21] to-[#470817]",
        buttonHoverBg: "hover:from-[#5c0e21] hover:to-[#380410]",
        buttonText: "text-[#fdf0f2]",
        buttonBorder: "border-[#8a1c37]/70",
        tagBg: "bg-[#fae6e9] border border-[#d897a4]/60",
        tagText: "text-[#6b1228]",
        archStroke: "#9d314a",
        iconBorder: "border-[#c48191]",
        iconBg: "bg-[#f9e8ea]"
      },
      schedule: [
        { label: "Barat", time: "7:00 PM" },
        { label: "Dinner", time: "8:00 PM" },
        { label: "Nikah", time: "9:00 PM" },
        { label: "Rukhsati", time: "11:00 PM" }
      ]
    }
  ],
  venue: {
    header: "WHERE WE BEGIN FOREVER",
    title: "The Wedding Venue",
    name: "Green Marriage Point",
    cityState: "NABIPUR DIHWA, SULTANPUR",
    description: "A scenic open lawn and grand celebration pavilion in Nabipur Dihwa, Sultanpur, chosen to welcome our esteemed guests, family, and loved ones as Karishma & Salman unite in holy matrimony.",
    address: "Green Marriage Point, Nabipur Dihwa, Sultanpur, Uttar Pradesh",
    directionsUrl: "https://maps.app.goo.gl/4AmvFfDbLiwj2pSJA",
    mapEmbedUrl: "https://maps.google.com/maps?q=Green+Marriage+Point+Nabipur+Dihwa+Sultanpur&t=&z=15&ie=UTF8&iwloc=&output=embed",
    image: "/assets/venue.jpg",
    secondaryImage: "/assets/venue-lawn.jpg"
  },
  family: {
    header: "WITH WARM REGARDS",
    title: "Looking Forward to Welcoming You",
    names: [
      "Mohd. Shameem & Family",
      "Siddiqui Family"
    ],
    closing: "Relatives & Friends"
  },
  thankYou: {
    header: "FROM THE BOTTOM OF OUR HEARTS",
    title: "Thank You",
    message: "To every soul who has loved us, prayed for us, and blessed us — your presence and duas are a gift we will cherish forever. May Allah bless your homes with the same joy and barakah you bring to ours.",
    signOff: "— Karishma & Salman"
  },
  musicUrl: "/assets/music.mp3"
};
