import { Heart, House, LayoutDashboard, Search, UserRound } from "lucide-react";

import {
  FaUserDoctor,
  FaBolt,
  FaWrench,
  FaHelmetSafety,
  FaHammer,
  FaPaintRoller,
  FaGear,
  FaMobileScreen,
  FaLaptop,
  FaFan,
  FaBroom,
  FaUsers,
  FaCar,
  FaCamera,
  FaScissors,
  FaDumbbell,
  FaTruck,
  FaWifi,
  FaShieldHalved,
  FaPersonChalkboard,
} from "react-icons/fa6";

import {
  MdRestaurant,
  MdLocalLaundryService,
  MdLocalHospital,
} from "react-icons/md";

import {
  GiSewingMachine,
  GiWaterDrop,
} from "react-icons/gi";

import {
  BsShop,
  BsFillBuildingsFill,
} from "react-icons/bs";

export const categories = [
  {
    title: "Doctor",
    key: "doctor",
    icon: FaUserDoctor,
    color: "#16a34a",
    bgColor: "#dcfce7",
  },
  {
    title: "Electrician",
    key: "electrician",
    icon: FaBolt,
    color: "#eab308",
    bgColor: "#fef9c3",
  },
  {
    title: "Plumber",
    key: "plumber",
    icon: FaWrench,
    color: "#2563eb",
    bgColor: "#dbeafe",
  },
  {
    title: "Teacher",
    key: "teacher",
    icon: FaPersonChalkboard,
    color: "#9333ea",
    bgColor: "#f3e8ff",
  },
  {
    title: "Contractor",
    key: "contractor",
    icon: FaHelmetSafety,
    color: "#ea580c",
    bgColor: "#ffedd5",
  },
  {
    title: "Carpenter",
    key: "carpenter",
    icon: FaHammer,
    color: "#b45309",
    bgColor: "#fef3c7",
  },
  {
    title: "Painter",
    key: "painter",
    icon: FaPaintRoller,
    color: "#db2777",
    bgColor: "#fce7f3",
  },
  {
    title: "Mechanic",
    key: "mechanic",
    icon: FaGear,
    color: "#374151",
    bgColor: "#e5e7eb",
  },
  {
    title: "Mobile Repair",
    key: "mobile_repair",
    icon: FaMobileScreen,
    color: "#0891b2",
    bgColor: "#cffafe",
  },
  {
    title: "Computer Repair",
    key: "computer_repair",
    icon: FaLaptop,
    color: "#4f46e5",
    bgColor: "#e0e7ff",
  },
  {
    title: "AC Repair",
    key: "ac_repair",
    icon: FaFan,
    color: "#0284c7",
    bgColor: "#e0f2fe",
  },
  {
    title: "Cleaner",
    key: "cleaner",
    icon: FaBroom,
    color: "#059669",
    bgColor: "#d1fae5",
  },
  {
    title: "Worker",
    key: "worker",
    icon: FaUsers,
    color: "#44403c",
    bgColor: "#f5f5f4",
  },
  {
    title: "Driver",
    key: "driver",
    icon: FaCar,
    color: "#dc2626",
    bgColor: "#fee2e2",
  },
  {
    title: "Photographer",
    key: "photographer",
    icon: FaCamera,
    color: "#c026d3",
    bgColor: "#fae8ff",
  },
  {
    title: "Tailor",
    key: "tailor",
    icon: FaScissors,
    color: "#e11d48",
    bgColor: "#ffe4e6",
  },
  {
    title: "Gym Trainer",
    key: "gym_trainer",
    icon: FaDumbbell,
    color: "#65a30d",
    bgColor: "#ecfccb",
  },
  {
    title: "Tractor Service",
    key: "tractor_service",
    icon: FaTruck,
    color: "#ca8a04",
    bgColor: "#fef9c3",
  },
  {
    title: "Restaurant",
    key: "restaurant",
    icon: MdRestaurant,
    color: "#ef4444",
    bgColor: "#fee2e2",
  },
  {
    title: "Medical Store",
    key: "medical_store",
    icon: MdLocalHospital,
    color: "#b91c1c",
    bgColor: "#fee2e2",
  },
  {
    title: "Laundry",
    key: "laundry",
    icon: MdLocalLaundryService,
    color: "#0e7490",
    bgColor: "#cffafe",
  },
  {
    title: "Water Supplier",
    key: "water_supplier",
    icon: GiWaterDrop,
    color: "#0369a1",
    bgColor: "#e0f2fe",
  },
  {
    title: "Internet Service",
    key: "internet_service",
    icon: FaWifi,
    color: "#4338ca",
    bgColor: "#e0e7ff",
  },
  {
    title: "Security Guard",
    key: "security_guard",
    icon: FaShieldHalved,
    color: "#334155",
    bgColor: "#e2e8f0",
  },
  {
    title: "Grocery Shop",
    key: "grocery_shop",
    icon: BsShop,
    color: "#15803d",
    bgColor: "#dcfce7",
  },
  {
    title: "Hotel",
    key: "hotel",
    icon: BsFillBuildingsFill,
    color: "#0f766e",
    bgColor: "#ccfbf1",
  },
  {
    title: "Tailoring",
    key: "tailoring",
    icon: GiSewingMachine,
    color: "#be185d",
    bgColor: "#fce7f3",
  },
];


export const userMenu = [
    {
        icon: House,
        href: '/user',
        text: 'Home'
    },
    {
        icon: LayoutDashboard,
        href: '/user/categories',
        text: 'Categories'
    },
    {
        icon: Search,
        href: '/user/search',
        text: 'Search'
    },
    {
        icon: Heart,
        href: '/user/saved',
        text: 'Saved'
    },
    {
        icon: UserRound,
        href: '/user/profile',
        text: 'Profile'
    },
]
