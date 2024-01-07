'use client'
import { FormatTitle } from "@/helpers/title";
import { IconRocket } from "@tabler/icons-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
    return (
        <>
            <Head>
                <title>{FormatTitle("Sign Up")}</title>
            </Head>

            <main className="flex justify-center items-center min-h-screen">
                <div className="w-full p-4 sm:w-[400px] sm:p-3">
                    <div className="">
                        <img
                            className="mx-auto h-12 w-auto mb-8 bg-gray-800 rounded-full px-3 py-1"
                            src="/img/logo/logo_tag_white.png"
                            alt="receive.me"
                        />
                        <h2 className="text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign Up
                        </h2>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder="name@example.com"
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 py-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        placeholder="Password"
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 py-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="transition-all flex w-full justify-center items-center rounded-md bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-3 py-3"
                                >
                                    <IconRocket className="mr-1 h-5 w-5 text-white" />
                                    Let's Go!
                                </button>
                            </div>
                        </form>

                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div>
                            <button className="transition-all hover:bg-gray-200 flex w-full justify-center items-center rounded-md bg-gray-100 text-sm font-semibold leading-6 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/google.png"
                                    alt="Google"
                                    className="mr-2 h-4 w-4"
                                />
                                Sign Up With Google
                            </button>
                        </div>

                        <div>
                            <button className="transition-all hover:bg-gray-200 mt-3 flex w-full justify-center items-center rounded-md bg-gray-100 text-sm font-semibold leading-6 shadow-sm px-3 py-3">
                                <img
                                    src="/img/3p/apple.png"
                                    alt="Google"
                                    className="mr-1.5 h-5 w-5"
                                />
                                Sign Up With Apple
                            </button>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

Register.blank = true;
