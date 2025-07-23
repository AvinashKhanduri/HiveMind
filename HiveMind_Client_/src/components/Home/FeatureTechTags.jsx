import { useState } from 'react';

const techData = {
  Frontend: [
    { name: '⚛️ React', count: 12 },
    { name: '🟦 Tailwind', count: 8 },
    { name: '🅰️ Angular', count: 4 },
    { name: '🧩 Vue.js', count: 6 },
    { name: '📱 React Native', count: 3 },
  ],
  Backend: [
    { name: '🌐 Spring Boot', count: 9 },
    { name: '🔥 Firebase', count: 11 },
    { name: '🐍 Django', count: 5 },
    { name: '🚀 Node.js', count: 10 },
    { name: '🐘 PostgreSQL', count: 6 },
  ],
  Design: [
    { name: '🎨 Figma', count: 6 },
    { name: '🧪 Framer', count: 2 },
    { name: '🖼️ Adobe XD', count: 3 },
    { name: '📐 Sketch', count: 2 },
  ],
  ML: [
    { name: '🤖 TensorFlow', count: 7 },
    { name: '🧠 Scikit-learn', count: 3 },
    { name: '🐍 NumPy', count: 5 },
    { name: '📊 Pandas', count: 4 },
  ],
  DevOps: [
    { name: '🐳 Docker', count: 8 },
    { name: '☁️ AWS', count: 6 },
    { name: '🔧 Jenkins', count: 3 },
    { name: '📦 Kubernetes', count: 4 },
  ],
  Mobile: [
    { name: '📱 Flutter', count: 5 },
    { name: '🍎 Swift', count: 3 },
    { name: '🤖 Kotlin', count: 4 },
    { name: '🌐 Ionic', count: 2 },
  ],
  Programming: [
    { name: '🐍 Python', count: 14 },
    { name: '☕ Java', count: 10 },
    { name: '📘 C++', count: 7 },
    { name: '🟨 JavaScript', count: 13 },
  ],
  Tools: [
    { name: '🛠️ Git', count: 15 },
    { name: '🔍 Postman', count: 7 },
    { name: '📁 VS Code', count: 12 },
    { name: '📋 Notion', count: 4 },
  ]
};


const categories = Object.keys(techData);

const FeaturedTechTags = () => {

  const [selectedCategory, setSelectedCategory] = useState('Frontend');

  return (
    <section className="py-12 px-4 text-white bg-gradient-to-b from-blue-950 to-slate-900 rounded-xl mt-5 flex-1">
      <h2 className="text-2xl font-bold text-center mb-6">💡 Featured Tech Stacks</h2>

      {/* Filter Chips */}
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
            } transition duration-300`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {techData[selectedCategory].map((tech, idx) => (
         <div
  key={idx}
  className="bg-white/10 text-sm text-white px-5 py-4 rounded-lg backdrop-blur-lg border border-white/10 hover:bg-white/20 hover:scale-[1.02] transition-transform duration-300 cursor-pointer w-full sm:w-[200px] text-start shadow-md"
>
  <div className="font-semibold text-base mb-1">{tech.name}</div>
  <div className="text-xs text-gray-300">Projects: {tech.count}</div>
</div>

        ))}
      </div>
    </section>
  );
};

export default FeaturedTechTags;
