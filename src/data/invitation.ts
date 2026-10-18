export interface EventScheduleItem {
  label: string;
  time: string;
}

export interface WeddingEvent {
  id: string;
  tag: string; // e.g. "CEREMONY 1"
  title: string; // e.g. "Haldi"
  icon: string; // path to icon
  image: string; // path to artwork image
  date: string; // e.g. "Thu, 03 Dec 2026"
  time: string; // e.g. "04:00 PM onwards"
  venue: string; // e.g. "Nabipur, Sultanpur"
  gradientBg: string; // e.g. "from-[#fcf8ec] to-[#f9f2dd]"
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
      icon: "/assets/flower-haldi-transparent.png",
      image: "/assets/haldi.jpg",
      date: "Thursday, 03 Dec 2026",
      time: "04:00 PM onwards",
      venue: "Nabipur, Sultanpur",
      gradientBg: "from-[#fbf5e6] via-[#f8eed1] to-[#f4e6bc]"
    },
    {
      id: "mehendi",
      tag: "CEREMONY 2",
      title: "Mehndi",
      icon: "/assets/leaves-mehendi-transparent.png",
      image: "/assets/mehendi.jpg",
      date: "Friday, 04 Dec 2026",
      time: "08:00 PM onwards",
      venue: "Nabipur, Sultanpur",
      gradientBg: "from-[#eef5ee] via-[#e2eee1] to-[#d4e4d3]"
    },
    {
      id: "nikah",
      tag: "CEREMONY 3",
      title: "Nikah & Barat",
      icon: "/assets/lotus-nikah-transparent.png",
      image: "/assets/nikah.jpg",
      date: "Saturday, 05 Dec 2026",
      time: "Barat 7:00 PM onwards",
      venue: "Green Marriage Point, Nabipur Dihwa, Sultanpur",
      gradientBg: "from-[#f0f4f9] via-[#e5eef7] to-[#d6e4f2]",
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
