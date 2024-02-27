"use client";

import { useAppState } from "@/src/hooks/useAppState";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default function DashboardSidebarNavigation({
    navigation,
    current,
    setCurrent,
}: any) {
    const [appState] = useAppState();

    return (
        <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item: any) => (
                <li key={item.name}>
                    <a
                        href={item.href}
                        onClick={() =>
                            item.profile
                                ? window.open(
                                      `/${appState.userData?.handle}`,
                                      "_blank",
                                  )
                                : !item.disabled
                                ? setCurrent(item.name)
                                : null
                        }
                        className={classNames(
                            current === item.name
                                ? "bg-gray-50 text-indigo-600"
                                : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition",
                            item.disabled
                                ? "!text-gray-400 !hover:text-gray-500"
                                : "",
                        )}
                    >
                        <item.icon
                            className={classNames(
                                current === item.name
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-indigo-600",
                                "h-6 w-6 shrink-0 transition",
                                item.disabled
                                    ? "!text-gray-300 !hover:text-gray-400 !group-hover:text-gray-400"
                                    : "",
                            )}
                            aria-hidden="true"
                        />
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}
