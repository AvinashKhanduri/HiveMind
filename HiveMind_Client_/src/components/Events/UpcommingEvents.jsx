import { useState } from "react";
import EventCard from "./EventCard";
import RegisterModal from "./RegisterModal";
const UpcomingEvents = () => {
  const [open, setOpen] = useState(false);
  const events = [
    {
      title: "💻 CodeSprint 2025",
      date: "🗓️ June 22, 2025 | 📍 Hybrid",
      type: "Hackathon",
      summary: "Join India’s fastest growing college hackathon.",
      details: "Includes team-based problem solving, mentorship sessions, and prizes worth ₹1 Lakh.",
    },
    {
      title: "🎨 Design Fiesta",
      date: "🗓️ July 10, 2025 | 📍 Online",
      type: "Non-Coding",
      summary: "Creative design challenge for UI/UX enthusiasts.",
      details: "Submit mockups or prototypes. Top 10 designs get featured.",
    },
  ];const  posterUrl = "https://img.freepik.com/premium-psd/psd-artificial-intelligence-technology-poster-design-social-media-post_890887-14108.jpg?semt=ais_hybrid&w=740"

  

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {events.map((e, index) => (
        <EventCard key={index} {...e} setOpen={setOpen} />
      ))}

      <RegisterModal open={open} setOpen={setOpen} posterUrl={posterUrl}/>
    </div>
  );
};

export default UpcomingEvents;

