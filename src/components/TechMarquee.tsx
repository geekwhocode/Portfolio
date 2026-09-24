import React from 'react';

const technologies = [
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "React", icon: "devicon-react-original" },
  { name: "TypeScript", icon: "devicon-typescript-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "Python", icon: "devicon-python-plain" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
  { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
  { name: "Docker", icon: "devicon-docker-plain" },
  { name: "Git", icon: "devicon-git-plain" },
];

export default function TechMarquee() {
  return (
    <div className="marquee-glass-wrapper">
      <div className="marquee-container">
        <div className="marquee-track">
          {/* First Set */}
          {technologies.map((tech, i) => (
            <div key={`tech-1-${i}`} className="marquee-item">
              <i className={`${tech.icon} marquee-icon`}></i> {tech.name}
            </div>
          ))}
          {/* Second Set for seamless infinite loop */}
          {technologies.map((tech, i) => (
            <div key={`tech-2-${i}`} className="marquee-item">
              <i className={`${tech.icon} marquee-icon`}></i> {tech.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
