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
    color: "text-emerald-600 fill-emerald-600",
  },
  {
    title: "Electrician",
    key: "electrician",
    icon: FaBolt,
    color: "text-yellow-500 fill-yellow-500",
  },
  {
    title: "Plumber",
    key: "plumber",
    icon: FaWrench,
    color: "text-blue-600 fill-blue-600",
  },
  {
    title: "Teacher",
    key: "teacher",
    icon: FaPersonChalkboard,
    color: "text-violet-600 fill-violet-600",
  },
  {
    title: "Contractor",
    key: "contractor",
    icon: FaHelmetSafety,
    color: "text-orange-600 fill-orange-600",
  },
  {
    title: "Carpenter",
    key: "carpenter",
    icon: FaHammer,
    color: "text-amber-700 fill-amber-700",
  },
  {
    title: "Painter",
    key: "painter",
    icon: FaPaintRoller,
    color: "text-pink-600 fill-pink-600",
  },
  {
    title: "Mechanic",
    key: "mechanic",
    icon: FaGear,
    color: "text-gray-700 fill-gray-700",
  },
  {
    title: "Mobile Repair",
    key: "mobile_repair",
    icon: FaMobileScreen,
    color: "text-cyan-600 fill-cyan-600",
  },
  {
    title: "Computer Repair",
    key: "computer_repair",
    icon: FaLaptop,
    color: "text-indigo-600 fill-indigo-600",
  },
  {
    title: "AC Repair",
    key: "ac_repair",
    icon: FaFan,
    color: "text-sky-600 fill-sky-600",
  },
  {
    title: "Cleaner",
    key: "cleaner",
    icon: FaBroom,
    color: "text-green-600 fill-green-600",
  },
  {
    title: "Worker",
    key: "worker",
    icon: FaUsers,
    color: "text-stone-600 fill-stone-600",
  },
  {
    title: "Driver",
    key: "driver",
    icon: FaCar,
    color: "text-red-600 fill-red-600",
  },
  {
    title: "Photographer",
    key: "photographer",
    icon: FaCamera,
    color: "text-fuchsia-600 fill-fuchsia-600",
  },
  {
    title: "Tailor",
    key: "tailor",
    icon: FaScissors,
    color: "text-rose-600 fill-rose-600",
  },
  {
    title: "Gym Trainer",
    key: "gym_trainer",
    icon: FaDumbbell,
    color: "text-lime-600 fill-lime-600",
  },
  {
    title: "Tractor Service",
    key: "tractor_service",
    icon: FaTruck,
    color: "text-yellow-600 fill-yellow-600",
  },
  {
    title: "Restaurant",
    key: "restaurant",
    icon: MdRestaurant,
    color: "text-red-500 fill-red-500",
  },
  {
    title: "Medical Store",
    key: "medical_store",
    icon: MdLocalHospital,
    color: "text-rose-700 fill-rose-700",
  },
  {
    title: "Laundry",
    key: "laundry",
    icon: MdLocalLaundryService,
    color: "text-cyan-700 fill-cyan-700",
  },
  {
    title: "Water Supplier",
    key: "water_supplier",
    icon: GiWaterDrop,
    color: "text-sky-700 fill-sky-700",
  },
  {
    title: "Internet Service",
    key: "internet_service",
    icon: FaWifi,
    color: "text-indigo-700 fill-indigo-700",
  },
  {
    title: "Security Guard",
    key: "security_guard",
    icon: FaShieldHalved,
    color: "text-slate-700 fill-slate-700",
  },
  {
    title: "Grocery Shop",
    key: "grocery_shop",
    icon: BsShop,
    color: "text-green-700 fill-green-700",
  },
  {
    title: "Hotel",
    key: "hotel",
    icon: BsFillBuildingsFill,
    color: "text-teal-700 fill-teal-700",
  },
  {
    title: "Tailoring",
    key: "tailoring",
    icon: GiSewingMachine,
    color: "text-pink-700 fill-pink-700",
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
