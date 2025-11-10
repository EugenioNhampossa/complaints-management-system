"use client";

/* eslint-disable @next/next/no-img-element */
import { Box, Button, Image } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function NothingFoundBackground() {
  return (
    <section className="bg-white dark:bg-stone-900 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-1/2">
          <Box className="mb-[40px] xs:mb-[100px]">
            <Image
              src="/logo-full.svg"
              alt="Logo"
              className="h-[40px] w-fit object-contain"
            />
          </Box>
          <p className="text-sm font-medium">Erro 404</p>
          <h1 className="mt-3 text-2xl font-semibold text-stone-800 dark:text-white md:text-3xl">
            Página não encontrada
          </h1>
          <p className="mt-4 text-stone-500 dark:text-stone-400">
            Desculpe, a página que procura não existe. Aqui estão alguns links
            úteis:
          </p>
          <div className="flex items-center mt-6 gap-x-3">
            <Button variant="outline" onClick={() => window.history.back()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Voltar</span>
            </Button>
            <Button component={Link} href="/">
              Leve-me para a página inicial
            </Button>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <img
            alt="logo"
            className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-xs object-cover "
            src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          />
        </div>
      </div>
    </section>
  );
}
