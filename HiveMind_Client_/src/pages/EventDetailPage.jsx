// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EventDetailPage() {
//   const { slug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Replace with actual data fetch logic (or context/global state)
    const fetchedEvent = {
      title: "💻 CodeSprint 2025",
      type: "Hackathon",
      date: "🗓️ June 22, 2025",
      location: "📍 Hybrid (Online + In-person)",
      description:
        "Join India’s fastest growing college hackathon with students from across the country competing on real-world challenges.",
      highlights: [
        "💡 24-Hour Hackathon",
        "🎓 Mentorship from Industry Experts",
        "🏆 Prizes worth ₹1 Lakh",
        "🎁 Swags & Goodies for All Participants",
      ],
      eligibility: "Open to all college students in India. Team size: 2–5 members.",
      schedule: [
        { time: "09:00 AM", activity: "Opening Ceremony" },
        { time: "10:00 AM", activity: "Hackathon Begins" },
        { time: "02:00 PM", activity: "Mentorship Sessions" },
        { time: "08:00 PM", activity: "Pitch Checkpoint" },
        { time: "09:00 AM Next Day", activity: "Final Submissions" },
        { time: "11:00 AM", activity: "Judging & Results" },
      ],
      faq: [
        {
          question: "Do I need a team?",
          answer: "Yes. You can participate with 2–5 members. Solo registrations are not allowed.",
        },
        {
          question: "Is it free?",
          answer: "Yes, the event is absolutely free!",
        },
      ],
    };

    setEvent(fetchedEvent);
  }, []);

  if (!event) return <div className="text-white text-center py-10">Loading...</div>;

  return (
    <div className="w-full mx-auto p-6 text-white bg-[#101828]/90 rounded-lg shadow-xl shadow-purple-800/20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-sm text-gray-400">{event.date} | {event.location}</p>
        <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-600 rounded-full">{event.type}</span>
      </div>

      <p className="mb-6 text-gray-300 text-lg">{event.description}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🔍 Highlights</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          {event.highlights.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧾 Eligibility</h2>
        <p className="text-gray-300">{event.eligibility}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📅 Schedule</h2>
        <ul className="space-y-2">
          {event.schedule.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b border-white/10 py-1 text-gray-300">
              <span>{item.time}</span>
              <span>{item.activity}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">❓ FAQs</h2>
        <div className="space-y-3">
          {event.faq.map((qna, idx) => (
            <div key={idx}>
              <p className="font-medium text-gray-200">Q: {qna.question}</p>
              <p className="text-sm text-gray-400 ml-2">A: {qna.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center mt-10">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg">
          🚀 Register Now
        </button>
      </div>
    </div>
  );
}

export default EventDetailPage;
