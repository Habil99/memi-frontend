import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import type { Product, Category } from "@/services/api";

interface HomeProps {
  featuredProducts?: Product[];
  newArrivals?: Product[];
  categories?: Category[];
}

const Home = ({ featuredProducts, newArrivals, categories }: HomeProps) => {
  return (
    <main>
      <Hero />
      <Categories categories={categories} />
      <NewArrival products={newArrivals} />
      <PromoBanner />
      <BestSeller products={featuredProducts} />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
