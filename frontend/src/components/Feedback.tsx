
// import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function Feedback() {
  return (
    <div className=" w-screen pl-4 h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-10 text-gray-800 dark:text-white">
      Hear from Our Happy Customers🤗
    </h2>
    <InfiniteMovingCards
      items={testimonials}
      direction="right"
      speed="slow"
    />
  </div>
  
  );
}
const testimonials = [
    {
      quote:
        "Our stay at [Hotel Name] exceeded all expectations. The room was spacious and clean, the staff was incredibly friendly and helpful. We will definitely be coming back!",
      name: "John Doe",
      title: "Happy Customer",
    },
    {
      quote:
        "Booking with [Your App Name] made our vacation stress-free. From finding the perfect hotel to ordering room service, everything was seamless. Highly recommended!",
      name: "Jane Smith",
      title: "Satisfied User",
    },
    {
      quote:
        "The food at Snacking India was delicious and delivered promptly. It felt like dining at a five-star restaurant right in our room. Thank you for the excellent service!",
      name: "Michael Johnson",
      title: "Food Enthusiast",
    },
    {
      quote:
        "I've used many hotel booking platforms, but StayZy stands out for its user-friendly interface and comprehensive hotel reviews. It's now my go-to choice for travel.",
      name: "Emily Brown",
      title: "Frequent Traveler",
    },
    {
      quote:
        "The feedback system on [Your App Name] helped me choose the perfect hotel. I could see ratings and reviews from other guests, which gave me confidence in my booking.",
      name: "Sarah Davis",
      title: "Smart Planner",
    },
  ];
  
  export default testimonials;
  