import React from 'react';
import { BookOpen, Calculator, Beaker, Palette, Music, Globe, Users, Trophy } from 'lucide-react';

const Programs: React.FC = () => {
  const academicPrograms = [
    {
      icon: BookOpen,
      title: 'English & Literature',
      description: 'Comprehensive language arts program focusing on reading, writing, and critical analysis.',
      highlights: ['Creative Writing', 'Public Speaking', 'Literature Analysis']
    },
    {
      icon: Calculator,
      title: 'Mathematics',
      description: 'Advanced mathematics curriculum from algebra through calculus and statistics.',
      highlights: ['AP Calculus', 'Statistics', 'Mathematical Modeling']
    },
    {
      icon: Beaker,
      title: 'Science',
      description: 'Hands-on science education in biology, chemistry, physics, and environmental science.',
      highlights: ['Laboratory Research', 'Science Fair', 'Environmental Studies']
    },
    {
      icon: Globe,
      title: 'Social Studies',
      description: 'Comprehensive study of history, geography, civics, and global cultures.',
      highlights: ['Model UN', 'History Bowl', 'Cultural Exchange']
    }
  ];

  const specialPrograms = [
    {
      icon: Palette,
      title: 'Visual Arts',
      description: 'Comprehensive arts program including drawing, painting, sculpture, and digital media.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Music,
      title: 'Music & Performing Arts',
      description: 'Band, choir, orchestra, theater, and individual music instruction.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Leadership Development',
      description: 'Student government, peer mentoring, and community service programs.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Trophy,
      title: 'Athletics',
      description: 'Competitive sports teams and physical education programs for all skill levels.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Academic Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive curriculum is designed to challenge and inspire students 
            while preparing them for success in college and beyond.
          </p>
        </div>

        {/* Academic Programs */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Core Academic Programs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {academicPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <program.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                <div className="space-y-2">
                  {program.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Programs */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Special Programs & Activities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialPrograms.map((program, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${program.color} rounded-xl p-6 text-white transform group-hover:scale-105 transition-transform duration-300`}>
                  <program.icon className="h-8 w-8 mb-4" />
                  <h4 className="text-xl font-semibold mb-3">{program.title}</h4>
                  <p className="text-white/90 leading-relaxed">{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Features */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">AP Courses</div>
              <div className="text-gray-600">Advanced Placement classes available in all core subjects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">Dual Enrollment</div>
              <div className="text-gray-600">College credit opportunities through partner universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">STEM Focus</div>
              <div className="text-gray-600">Integrated science, technology, engineering, and math curriculum</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;