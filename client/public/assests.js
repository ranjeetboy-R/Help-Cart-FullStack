import { Bot, ChartNoAxesCombined, CodeXml, Heart, House, LayoutDashboard, NotebookPen, Search, User2, UserRound } from "lucide-react";

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
    bgColor: "bg-emerald-600",
    services: "Checkup, Treatment, Consultation",
  },
  {
    title: "Electrician",
    key: "electrician",
    icon: FaBolt,
    color: "text-yellow-500 fill-yellow-500",
    bgColor: "bg-yellow-500",
    services: "Wiring, Repair, Installation",
  },
  {
    title: "Plumber",
    key: "plumber",
    icon: FaWrench,
    color: "text-blue-600 fill-blue-600",
    bgColor: "bg-blue-600",
    services: "Piping, Leakage, Fitting",
  },
  {
    title: "Teacher",
    key: "teacher",
    icon: FaPersonChalkboard,
    color: "text-violet-600 fill-violet-600",
    bgColor: "bg-violet-600",
    services: "Teaching, Coaching, Training",
  },
  {
    title: "Contractor",
    key: "contractor",
    icon: FaHelmetSafety,
    color: "text-orange-600 fill-orange-600",
    bgColor: "bg-orange-600",
    services: "Construction, Renovation, Planning",
  },
  {
    title: "Carpenter",
    key: "carpenter",
    icon: FaHammer,
    color: "text-amber-700 fill-amber-700",
    bgColor: "bg-amber-700",
    services: "Furniture, Woodwork, Repair",
  },
  {
    title: "Painter",
    key: "painter",
    icon: FaPaintRoller,
    color: "text-pink-600 fill-pink-600",
    bgColor: "bg-pink-600",
    services: "Painting, Polishing, Finishing",
  },
  {
    title: "Website Developer",
    key: "websiteDeveloper",
    icon: CodeXml,
    color: "text-green-600 fill-green-600",
    bgColor: "bg-green-600",
    services: "UI/UX Design, API Development, Deployment",
  },
  {
    title: "AI Agent & Automation",
    key: "aiAgentAutomation",
    icon: Bot,
    color: "text-cyan-600 fill-cyan-600",
    bgColor: "bg-cyan-600",
    services: "Whatsapp/Email Automation, Chatbot",
  },
  {
    title: "Mechanic",
    key: "mechanic",
    icon: FaGear,
    color: "text-gray-700 fill-gray-700",
    bgColor: "bg-gray-700",
    services: "Servicing, Repair, Maintenance",
  },
  {
    title: "Mobile Repair",
    key: "mobile_repair",
    icon: FaMobileScreen,
    color: "text-cyan-600 fill-cyan-600",
    bgColor: "bg-cyan-600",
    services: "Screen, Battery, Repair",
  },
  {
    title: "Computer Repair",
    key: "computer_repair",
    icon: FaLaptop,
    color: "text-indigo-600 fill-indigo-600",
    bgColor: "bg-indigo-600",
    services: "Laptop, Software, Hardware",
  },
  {
    title: "AC Repair",
    key: "ac_repair",
    icon: FaFan,
    color: "text-sky-600 fill-sky-600",
    bgColor: "bg-sky-600",
    services: "Cooling, Gas, Service",
  },
  {
    title: "Cleaner",
    key: "cleaner",
    icon: FaBroom,
    color: "text-green-600 fill-green-600",
    bgColor: "bg-green-600",
    services: "Cleaning, Sanitizing, Sweeping",
  },
  {
    title: "Worker",
    key: "worker",
    icon: FaUsers,
    color: "text-stone-600 fill-stone-600",
    bgColor: "bg-stone-600",
    services: "Loading, Shifting, Labor",
  },
  {
    title: "Driver",
    key: "driver",
    icon: FaCar,
    color: "text-red-600 fill-red-600",
    bgColor: "bg-red-600",
    services: "Taxi, Transport, Delivery",
  },
  {
    title: "Photographer",
    key: "photographer",
    icon: FaCamera,
    color: "text-fuchsia-600 fill-fuchsia-600",
    bgColor: "bg-fuchsia-600",
    services: "Photography, Videography, Editing",
  },
  {
    title: "Gym Trainer",
    key: "gym_trainer",
    icon: FaDumbbell,
    color: "text-lime-600 fill-lime-600",
    bgColor: "bg-lime-600",
    services: "Workout, Fitness, Training",
  },
  {
    title: "Tractor Service",
    key: "tractor_service",
    icon: FaTruck,
    color: "text-yellow-600 fill-yellow-600",
    bgColor: "bg-yellow-600",
    services: "Ploughing, Transport, Harvesting",
  },
  {
    title: "Restaurant",
    key: "restaurant",
    icon: MdRestaurant,
    color: "text-red-500 fill-red-500",
    bgColor: "bg-red-500",
    services: "Dining, Delivery, Catering",
  },
  {
    title: "Medical Store",
    key: "medical_store",
    icon: MdLocalHospital,
    color: "text-rose-700 fill-rose-700",
    bgColor: "bg-rose-700",
    services: "Medicine, Prescription, Supply",
  },
  {
    title: "Water Supplier",
    key: "water_supplier",
    icon: GiWaterDrop,
    color: "text-sky-700 fill-sky-700",
    bgColor: "bg-sky-700",
    services: "Drinking, Delivery, Supply",
  },
  {
    title: "Security Guard",
    key: "security_guard",
    icon: FaShieldHalved,
    color: "text-slate-700 fill-slate-700",
    bgColor: "bg-slate-700",
    services: "Guarding, Patrolling, Protection",
  },
  {
    title: "Grocery Shop",
    key: "grocery_shop",
    icon: BsShop,
    color: "text-green-700 fill-green-700",
    bgColor: "bg-green-700",
    services: "Groceries, Vegetables, Fruits",
  },
  {
    title: "Hotel",
    key: "hotel",
    icon: BsFillBuildingsFill,
    color: "text-teal-700 fill-teal-700",
    bgColor: "bg-teal-700",
    services: "Rooms, Booking, Accommodation",
  },
]

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

export const expertPageItems = [
    {
        title: "Dashboard",
        href: '/expert',
        icon: LayoutDashboard
    },
    {
        title: "Profile",
        href: '/expert/expertProfile',
        icon: User2
    },
    {
        title: "Recent Work",
        href: '/expert/workDetails',
        icon: NotebookPen
    },
    {
        title: "Analysis",
        href: '/expert/analysis',
        icon: ChartNoAxesCombined
    },
]
