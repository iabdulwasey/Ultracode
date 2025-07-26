import React from 'react';
import { GraduationCap, Award, Users, Heart } from 'lucide-react';

const Faculty: React.FC = () => {
  const facultyMembers = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Principal',
      education: 'Ed.D. Educational Leadership',
      experience: '20+ years in education',
      specialization: 'Educational Leadership & School Administration',
      image: 'principal'
    },
    {
      name: 'Prof. Michael Chen',
      position: 'Mathematics Department Head',
      education: 'M.S. Mathematics, Stanford University',
      experience: '15 years teaching experience',
      specialization: 'Advanced Mathematics & AP Calculus',
      image: 'math'
    },
    {
      name: 'Dr. Emily Rodriguez',
      position: 'Science Department Head',
      education: 'Ph.D. Biology, MIT',
      experience: '12 years in education',
      specialization: 'Biology & Environmental Science',
      image: 'science'
    },
    {
      name: 'Ms. Jennifer Adams',
      position: 'English Department Head',
      education: 'M.A. English Literature',
      experience: '18 years teaching experience',
      specialization: 'Literature & Creative Writing',
      image: 'english'
    },
    {
      name: 'Mr. David Thompson',
      position: 'History Department Head',
      education: 'M.A. History, Yale University',
      experience: '14 years in education',
      specialization: 'World History & Social Studies',
      image: 'history'
    },
    {
      name: 'Ms. Lisa Park',
      position: 'Arts Department Head',
      education: 'M.F.A. Visual Arts',
      experience: '10 years teaching experience',
      specialization: 'Visual Arts & Digital Media',
      image: 'arts'
    }
  ];

  const stats = [
    {
      icon: GraduationCap,
      value: '95%',
      label: 'Hold Advanced Degrees',
      color: 'text-primary-600'
    },
    {
      icon: Award,
      value: '12',
      label: 'Average Years Experience',
      color: 'text-secondary-600'
    },
    {
      icon: Users,
      value: '15:1',
      label: 'Student-Teacher Ratio',
      color: 'text-purple-600'
    },
    {
      icon: Heart,
      value: '100%',
      label: 'Committed to Excellence',
      color: 'text-pink-600'
    }
  ];

  return (
    <section id="faculty" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Faculty
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our dedicated educators bring passion, expertise, and years of experience 
            to create an exceptional learning environment for every student.
          </p>
        </div>

        {/* Faculty Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Faculty Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facultyMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Profile Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-12 w-12 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Education:</span> {member.education}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span> {member.experience}
                  </div>
                  <div>
                    <span className="font-medium">Specialization:</span> {member.specialization}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Philosophy */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Teaching Philosophy</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Greenwood Academy, our faculty believes that every student has unique 
                potential waiting to be unlocked. We are committed to creating personalized 
                learning experiences that challenge, inspire, and support each student's 
                individual journey.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our educators stay current with the latest pedagogical research and 
                educational technology to ensure our teaching methods are both innovative 
                and effective.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 mb-1">40+</div>
                  <div className="text-sm text-gray-600">Hours of Professional Development</div>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Teacher of the Year Awards</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">What Makes Our Faculty Special</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Personalized Attention</div>
                    <div className="text-gray-600">Small class sizes allow for individual focus</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Innovative Methods</div>
                    <div className="text-gray-600">Modern teaching techniques and technology integration</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Continuous Learning</div>
                    <div className="text-gray-600">Regular professional development and training</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Collaborative Approach</div>
                    <div className="text-gray-600">Working together with students, parents, and colleagues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faculty;