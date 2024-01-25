"use client";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
    IconArrowRight,
    IconBolt,
    IconChevronDown,
    IconGraph,
    IconShieldBolt,
    IconStack,
    IconUserBolt,
    IconUsers,
    IconWallet,
    IconQrcode,
} from "@tabler/icons-react";
import Link from "next/link";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full mb-4">
            <div>hello</div>
        </header>
    );
}
