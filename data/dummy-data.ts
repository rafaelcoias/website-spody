export interface StudySpot {
  id: string
  name: string
  type: string
  capacity: number
  location: {
    address: string
    coordinates: { lat: number; lng: number }
  }
  amenities: string[]
  image: string
  rating: number
  isQuiet: boolean
  hasWifi: boolean
  hasPrinter: boolean
  hasCoffee: boolean
  university?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: {
    name: string
    address: string
    coordinates: { lat: number; lng: number }
  }
  image: string
  category: string
  isHot: boolean
  organizer: string
}

export const studySpots: StudySpot[] = [
  {
    id: "1",
    name: "Spody Gulbenkiap",
    type: "Sala de estudo",
    capacity: 200,
    location: {
      address: "Av. de Berna 45A, 1067-001 Lisboa",
      coordinates: { lat: 38.7372, lng: -9.1545 },
    },
    amenities: ["wifi", "printer", "coffee", "quiet"],
    image: "/images/spots/1.png",
    rating: 4.5,
    isQuiet: true,
    hasWifi: true,
    hasPrinter: true,
    hasCoffee: true,
    university: "Universidade de Lisboa",
  },
  {
    id: "2",
    name: "Caleidoscópio",
    type: "Sala de estudo",
    capacity: 175,
    location: {
      address: "Rua do Carmo 2, 1200-094 Lisboa",
      coordinates: { lat: 38.7115, lng: -9.1405 },
    },
    amenities: ["wifi", "quiet", "group_study"],
    image: "/images/spots/2.png",
    rating: 4.2,
    isQuiet: true,
    hasWifi: true,
    hasPrinter: false,
    hasCoffee: false,
  },
  {
    id: "3",
    name: "Biblioteca Central",
    type: "Biblioteca",
    capacity: 300,
    location: {
      address: "Campo Grande 016, 1749-016 Lisboa",
      coordinates: { lat: 38.7569, lng: -9.1553 },
    },
    amenities: ["wifi", "quiet", "books", "printer"],
    image: "/images/spots/3.png",
    rating: 4.7,
    isQuiet: true,
    hasWifi: true,
    hasPrinter: true,
    hasCoffee: false,
  },
  {
    id: "4",
    name: "Café Estudante",
    type: "Café",
    capacity: 50,
    location: {
      address: "Rua da Escola Politécnica 58, 1250-102 Lisboa",
      coordinates: { lat: 38.7223, lng: -9.1573 },
    },
    amenities: ["wifi", "coffee", "food", "social"],
    image: "/images/spots/4.png",
    rating: 4.0,
    isQuiet: false,
    hasWifi: true,
    hasPrinter: false,
    hasCoffee: true,
  },
  {
    id: "5",
    name: "Sala Silenciosa IST",
    type: "Sala de estudo",
    capacity: 80,
    location: {
      address: "Av. Rovisco Pais 1, 1049-001 Lisboa",
      coordinates: { lat: 38.7369, lng: -9.1395 },
    },
    amenities: ["wifi", "quiet", "individual"],
    image: "/images/spots/5.png",
    rating: 4.8,
    isQuiet: true,
    hasWifi: true,
    hasPrinter: false,
    hasCoffee: false,
    university: "Instituto Superior Técnico",
  },
  {
    id: "6",
    name: "Coworking Príncipe Real",
    type: "Coworking",
    capacity: 120,
    location: {
      address: "Praça do Príncipe Real 26, 1250-184 Lisboa",
      coordinates: { lat: 38.7155, lng: -9.1485 },
    },
    amenities: ["wifi", "coffee", "printer", "meeting_rooms"],
    image: "/images/spots/6.png",
    rating: 4.3,
    isQuiet: false,
    hasWifi: true,
    hasPrinter: true,
    hasCoffee: true,
  },
  {
    id: "7",
    name: "Biblioteca Camões",
    type: "Biblioteca",
    capacity: 150,
    location: {
      address: "Largo do Camões 2, 1200-862 Lisboa",
      coordinates: { lat: 38.7105, lng: -9.1425 },
    },
    amenities: ["wifi", "quiet", "books", "research"],
    image: "/images/spots/7.png",
    rating: 4.4,
    isQuiet: true,
    hasWifi: true,
    hasPrinter: true,
    hasCoffee: false,
  },
  {
    id: "8",
    name: "Hub Criativo",
    type: "Espaço criativo",
    capacity: 60,
    location: {
      address: "Rua do Norte 17, 1200-284 Lisboa",
      coordinates: { lat: 38.7125, lng: -9.1465 },
    },
    amenities: ["wifi", "creative", "collaborative", "coffee"],
    image: "/images/spots/8.png",
    rating: 4.1,
    isQuiet: false,
    hasWifi: true,
    hasPrinter: true,
    hasCoffee: true,
  },
  {
    id: "9",
    name: "Sala 24h FCUL",
    type: "Sala de estudo",
    capacity: 100,
    location: {
      address: "Campo Grande 016, 1749-016 Lisboa",
      coordinates: { lat: 38.7575, lng: -9.1565 },
    },
    amenities: ["wifi", "24h", "quiet", "security"],
    image: "/images/spots/9.png",
    rating: 4.6,
    isQuiet: true,
    hasWifi: true,
    hasPrinter: false,
    hasCoffee: false,
    university: "Faculdade de Ciências",
  },
  {
    id: "10",
    name: "Terraço Estudo",
    type: "Espaço exterior",
    capacity: 40,
    location: {
      address: "Miradouro da Senhora do Monte, 1170-253 Lisboa",
      coordinates: { lat: 38.7185, lng: -9.1335 },
    },
    amenities: ["wifi", "outdoor", "view", "fresh_air"],
    image: "/images/spots/10.png",
    rating: 4.2,
    isQuiet: true,
    hasWifi: true,
    hasPrinter: false,
    hasCoffee: false,
  },
]

export const events: Event[] = [
  {
    id: "1",
    title: "Lisbon Newcomers Welcome Club - November meetup",
    description:
      "Join us for a welcoming meetup for new students in Lisbon. Meet fellow students, make friends, and discover the city together.",
    date: "21 Outubro 2022",
    time: "17:30 - 20:00",
    location: {
      name: "Altice Arena",
      address: "Parque das Nações, 1990-200 Lisboa",
      coordinates: { lat: 38.7681, lng: -9.0947 },
    },
    image: "/images/events/1.png",
    category: "Social",
    isHot: true,
    organizer: "Lisbon Student Association",
  },
  {
    id: "2",
    title: "Tech Talk: AI in Education",
    description:
      "Discover how artificial intelligence is transforming education. Guest speakers from leading tech companies.",
    date: "25 Outubro 2022",
    time: "18:00 - 20:30",
    location: {
      name: "IST Alameda",
      address: "Av. Rovisco Pais 1, 1049-001 Lisboa",
      coordinates: { lat: 38.7369, lng: -9.1395 },
    },
    image: "/images/events/2.png",
    category: "Academic",
    isHot: false,
    organizer: "Tech Students Lisboa",
  },
  {
    id: "3",
    title: "Study Group: Mathematics",
    description: "Weekly mathematics study group for engineering students. All levels welcome.",
    date: "26 Outubro 2022",
    time: "14:00 - 16:00",
    location: {
      name: "Biblioteca IST",
      address: "Av. Rovisco Pais 1, 1049-001 Lisboa",
      coordinates: { lat: 38.7369, lng: -9.1395 },
    },
    image: "/images/events/3.png",
    category: "Study",
    isHot: false,
    organizer: "Math Study Circle",
  },
  {
    id: "4",
    title: "Career Fair 2022",
    description: "Meet top employers and discover internship and job opportunities. Bring your CV!",
    date: "28 Outubro 2022",
    time: "09:00 - 17:00",
    location: {
      name: "Pavilhão Carlos Lopes",
      address: "Av. de Berna 15, 1050-036 Lisboa",
      coordinates: { lat: 38.7385, lng: -9.1535 },
    },
    image: "/images/events/4.png",
    category: "Career",
    isHot: true,
    organizer: "University Career Services",
  },
  {
    id: "5",
    title: "Portuguese Language Exchange",
    description: "Practice Portuguese with native speakers and help others learn your language.",
    date: "29 Outubro 2022",
    time: "19:00 - 21:00",
    location: {
      name: "Café Central",
      address: "Rua Ivens 2-4, 1200-225 Lisboa",
      coordinates: { lat: 38.7095, lng: -9.1415 },
    },
    image: "/images/events/5.png",
    category: "Social",
    isHot: false,
    organizer: "Language Exchange Lisboa",
  },
  {
    id: "6",
    title: "Startup Pitch Competition",
    description: "Present your startup idea and compete for prizes. Open to all students.",
    date: "2 Novembro 2022",
    time: "15:00 - 18:00",
    location: {
      name: "ISCTE Business School",
      address: "Av. das Forças Armadas, 1649-026 Lisboa",
      coordinates: { lat: 38.7505, lng: -9.1545 },
    },
    image: "/images/events/6.png",
    category: "Business",
    isHot: true,
    organizer: "Entrepreneurship Club",
  },
  {
    id: "7",
    title: "Photography Workshop",
    description: "Learn the basics of photography and explore Lisbon through your lens.",
    date: "5 Novembro 2022",
    time: "10:00 - 13:00",
    location: {
      name: "Miradouro da Senhora do Monte",
      address: "1170-253 Lisboa",
      coordinates: { lat: 38.7185, lng: -9.1335 },
    },
    image: "/images/events/7.png",
    category: "Creative",
    isHot: false,
    organizer: "Photography Society",
  },
  {
    id: "8",
    title: "Mental Health Awareness Seminar",
    description: "Important discussion about student mental health and available resources.",
    date: "8 Novembro 2022",
    time: "16:00 - 18:00",
    location: {
      name: "Aula Magna",
      address: "Alameda da Universidade, 1649-004 Lisboa",
      coordinates: { lat: 38.7505, lng: -9.1585 },
    },
    image: "/images/events/8.png",
    category: "Wellness",
    isHot: false,
    organizer: "Student Wellness Center",
  },
  {
    id: "9",
    title: "International Food Festival",
    description: "Taste cuisines from around the world prepared by international students.",
    date: "12 Novembro 2022",
    time: "12:00 - 16:00",
    location: {
      name: "Cidade Universitária",
      address: "Campo Grande, 1749-016 Lisboa",
      coordinates: { lat: 38.7555, lng: -9.1575 },
    },
    image: "/images/events/9.png",
    category: "Cultural",
    isHot: true,
    organizer: "International Students Association",
  },
  {
    id: "10",
    title: "Coding Bootcamp: React Basics",
    description: "Learn React fundamentals in this intensive weekend bootcamp.",
    date: "19 Novembro 2022",
    time: "09:00 - 17:00",
    location: {
      name: "42 Lisboa",
      address: "Av. de Berna 26C, 1050-036 Lisboa",
      coordinates: { lat: 38.7375, lng: -9.1525 },
    },
    image: "/images/events/10.png",
    category: "Tech",
    isHot: false,
    organizer: "Coding Club Lisboa",
  },
]
