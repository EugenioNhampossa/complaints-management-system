"use client";

import { RegisterForm } from "@/components/form/user/register.form";
import {
  Text,
  Paper,
  Title,
  BackgroundImage,
  Image,
  Button,
  Anchor,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <div className="lg:grid grid-cols-2 w-[100vw] min-h-[100vh]">
      <div className="p-4 hidden lg:block">
        <BackgroundImage
          className="w-[100%] h-[100%]"
          radius="lg"
          src={
            "https://plus.unsplash.com/premium_photo-1678871480887-e71988d52031?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"
          }
        >
          <div className="w-[100%] h-[100%] bg-black/40 rounded-lg" />
        </BackgroundImage>
      </div>
      <div className="relative min-h-[100vh] w-[100%]">
        <div className="flex flex-col gap-6 items-center justify-center min-h-[100vh] py-8">
          <div className="absolute top-4 left-[10px] md:left-[70px]">
            <Link href="/">
              <Button variant="subtle" leftSection={<IconArrowLeft />}>
                Voltar para o site
              </Button>
            </Link>
          </div>
          <Link href="/">
            <Image
              src="/logo-full.svg"
              alt="Logo"
              className="h-[40px] w-fit object-contain mt-12 lg:mt-0"
            />
          </Link>
          <Paper
            px="md"
            shadow="none"
            className="bg-white w-[95%] md:w-[60%] lg:w-[80%]"
          >
            <Title ta="center" order={2}>
              Criar nova conta
            </Title>
            <Text ta="center" c="dimmed" size="sm" my="md">
              Preencha os dados abaixo para criar sua conta
            </Text>
            
            <RegisterForm />

            <Text ta="center" mt="md" size="sm">
              Já tem uma conta?{" "}
              <Anchor component={Link} href="/auth/login" weight={700}>
                Faça login
              </Anchor>
            </Text>
          </Paper>
        </div>
      </div>
    </div>
  );
}