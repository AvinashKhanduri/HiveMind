import { useState } from "react";
import EventCard from "./EventCard";
import RegisterModal from "./RegisterModal";
const PreviewsEvents = () => {
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
  {
    title: "🤖 AI Battle 2024",
    date: "🗓️ Dec 3, 2024 | 📍 Bengaluru",
    type: "Hackathon",
    summary: "Machine learning competition for real-world challenges.",
    details: "Build AI models with a team. Winners get internships and certifications.",
  },
  {
    title: "🎭 CultureCon 2023",
    date: "🗓️ Nov 15, 2023 | 📍 Delhi",
    type: "Non-Coding",
    summary: "Celebration of creativity, drama, and campus talent.",
    details: "Skits, dance, music and poetry — open to all participants.",
  },
  {
    title: "🚀 Startup Sprint 2024",
    date: "🗓️ Jan 20, 2024 | 📍 Online",
    type: "Hackathon",
    summary: "Pitch your tech startup idea and build an MVP in 48 hours.",
    details: "Mentorship from real startup founders. Top 3 get seed funding opportunity.",
  },
];

  const [open, setOpen] = useState(false);

  const  posterUrl = "https://img.freepik.com/premium-psd/psd-artificial-intelligence-technology-poster-design-social-media-post_890887-14108.jpg?semt=ais_hybrid&w=740"
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {events.map((e, index) => (
        <EventCard key={index} {...e} setOpen={setOpen} />
      ))}

      <RegisterModal open={open} setOpen={setOpen} posterUrl={posterUrl}/>
    </div>

    
  );
};

export default PreviewsEvents;

