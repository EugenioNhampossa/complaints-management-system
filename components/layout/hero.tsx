"use client";

import {
  Button,
  Container,
  Grid,
  Group,
  Image,
  List,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import classes from "@/styles/hero.module.css";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";

export function Hero() {
  return (
    <div className="container mx-auto px-4 mt-3">
      <SimpleGrid cols={{ md: 2, base: 1 }} spacing={50}>
        <div className="max-xs:text-center">
          <h5 className="text-4xl md:text-6xl/[76px] font-semibold max-w-xl bg-gradient-to-r from-slate-900 to-primary-300 text-transparent bg-clip-text">
            Build Skills That Get You Hired
          </h5>

          <p className="text-sm md:text-base max-w-lg mt-6 max-md:px-2 text-slate-600">
            Join a world-className, personalized learning journey built to turn
            you into a high-performing tech professional — and get hired by top
            product companies.
          </p>
          <div className="flex items-center gap-4 mt-6 justify-start max-xs:justify-center">
            <Button size="md">Submeta uma reclamação</Button>
          </div>
          <div className="mt-lg flex  flex-1 gap-10 lg:gap-0 flex-row lg:justify-between">
            <div>
              <div className="font-manrope font-bold text-2xl text-gray-900">
                260+
              </div>
              <span className="text-gray-500  block ">Expert Consultants</span>
            </div>
            <div>
              <div className="font-manrope font-bold text-2xl text-gray-900">
                975+
              </div>
              <span className="text-gray-500  block ">Active Clients</span>
            </div>
            <div>
              <div className="font-manrope font-bold text-2xl text-gray-900">
                724+
              </div>
              <span className="text-gray-500  block ">Projects Delivered</span>
            </div>
          </div>
        </div>
        <Grid>
          <Grid.Col span={6}>
            <Image
              className="bg-cover h-full rounded-md"
              src="https://www.wvi.org/sites/default/files/inline-images/WV_Mozambique_208.jpg"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              className="bg-cover h-full rounded-md"
              src="https://images.unsplash.com/flagged/photo-1572213426852-0e4ed8f41ff6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=874"
            />
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}>
            <Image
              className="bg-cover h-full rounded-md"
              src="https://images.unsplash.com/photo-1591486085897-f433f05e7aed?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </div>
  );
}
