"use client";
import { BsGridFill } from "react-icons/bs";
import { FaFolderOpen } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import { IoPersonSharp, IoStorefrontSharp } from "react-icons/io5";
import { RiSettings3Fill, RiUser2Line } from "react-icons/ri";

export const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const menu = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: BsGridFill,
    },
    {
        name: "Users",
        link: "/dashboard/users",
        icon: IoPersonSharp,
    },
    {
        name: "Licence",
        link: "/dashboard/licence",
        icon: IoStorefrontSharp,
    },
    {
        name: "Services",
        link: "/dashboard/services",
        icon: BsGridFill,
    },
    {
        name: "Shop",
        link: "/dashboard/shop",
        icon: FaFolderOpen,
    },
    {
        name: "Wallet",
        link: "/dashboard/wallet",
        icon: IoMdWallet,
    },
    {
        name: "Role Management",
        link: "/dashboard/roles",
        icon: RiSettings3Fill,
    },
    {
        name: "Admin",
        link: "/dashboard/admin",
        icon: RiSettings3Fill,
    },
];

export const homeAnalytics = [
    {
        icon: RiUser2Line,
        label: "All Users",
        key: "totalUsers",
    },
    {
        icon: RiUser2Line,
        label: "All Businesses",
        key: "totalBusinesses",
    },
    {
        icon: RiUser2Line,
        label: "Inactive Users",
        key: "user",
    },
];

export const userAnalytics = [
    {
        icon: RiUser2Line,
        label: "All Users",
        key: "totalUsers",
    },
    {
        icon: RiUser2Line,
        label: "All Business",
        key: "totalBusinesses",
    },
    {
        icon: RiUser2Line,
        label: "Suspend User",
        key: "user",
    },
];

export const adminAnalytics = [
    {
        icon: RiUser2Line,
        label: "Role Created",
        key: "totalAdmin",
    },
    {
        icon: RiUser2Line,
        label: "Read Access",
        key: "read",
    },
    {
        icon: RiUser2Line,
        label: "Write Access",
        key: "write",
    },
];

export const serviceAnalytics = [
    {
        icon: RiUser2Line,
        label: "All Service",
        key: "totalServices",
    },
    {
        icon: RiUser2Line,
        label: "Service Booked",
        key: "user",
    },
    {
        icon: RiUser2Line,
        label: "Suspended Service",
        key: "user",
    },
];

export const productAnalytics = [
    {
        icon: RiUser2Line,
        label: "All Product",
        key: "totalProducts",
    },
    {
        icon: RiUser2Line,
        label: "Product Orderer",
        key: "user",
    },
    {
        icon: RiUser2Line,
        label: "Suspended Product",
        key: "user",
    },
];

export const paginationLimit = [
    {
        value: "10",
        label: "10",
    },
    {
        value: "20",
        label: "20",
    },
    {
        value: "30",
        label: "30",
    },
    {
        value: "40",
        label: "40",
    },
    {
        value: "50",
        label: "50",
    },
    {
        value: "60",
        label: "60",
    },
    {
        value: "70",
        label: "70",
    },
];

export const permission = [
    { label: "Dashboard", value: "DASHBOARD" },
    { label: "Wallet", value: "WALLET" },
    { label: "User", value: "USER" },
    { label: "Service", value: "SERVICE" },
    { label: "Shop", value: "SHOP" },
    { label: "Role Management", value: "ROLE_MANAGEMENT" },
    { label: "Admin", value: "ADMIN" },
];
