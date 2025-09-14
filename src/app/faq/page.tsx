"use client";

import '../globals.css';
import AnimatedContent from '../../../components/reactbits/AnimatedContent/AnimatedContent';
import { useEffect, useState } from "react";
import { ChevronDown } from 'lucide-react';

interface QAItemProps {
  question: string;
  answer: string;
}

const QAItem: React.FC<QAItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 hover:bg-gray-100 flex justify-between items-center text-left transition-colors duration-200"
        style={{backgroundColor: "#eeffcc"}}
      >
        <span className="font-medium" style={{fontFamily: "Mozilla"}}>{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 text-gray-700 border-t border-gray-200" style={{fontFamily: "Mozilla", backgroundColor: "#ffffff"}}>
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-b-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <AnimatedContent  
          distance={50}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0.0}
          animateOpacity
          scale={1.0}
          threshold={0.2}
          delay={0.0}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl text-gray-800 text-center mb-8 header-1">
            Frequently Asked Questions
          </h1>
          
          <div className="rounded-lg shadow-sm p-6" style={{background: "#fafffa"}}>

            <QAItem
              question="What services do you offer?"
              answer="We provide comprehensive web development services including custom website design, e-commerce solutions, mobile app development, and digital marketing strategies to help your business grow online."
            />
            
            <QAItem
              question="How long does a typical project take?"
              answer="Project timelines vary depending on complexity and scope. Simple websites typically take 2-4 weeks, while complex web applications can take 2-3 months. We'll provide a detailed timeline during our initial consultation."
            />
            
            <QAItem
              question="Do you provide ongoing support?"
              answer="Yes, we offer comprehensive maintenance and support packages. This includes regular updates, security monitoring, backup services, and technical support to ensure your website runs smoothly."
            />
            
            <QAItem
              question="What is your development process?"
              answer="Our process includes discovery and planning, design mockups, development and testing, client review and feedback, final revisions, and launch. We maintain clear communication throughout each phase."
            />
            
            <QAItem
              question="Can you work with existing websites?"
              answer="Absolutely! We can redesign existing websites, add new features, improve performance, fix bugs, or migrate to new platforms. We'll assess your current site and recommend the best approach."
            />
            
            <QAItem
              question="What technologies do you use?"
              answer="We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases. We choose the best technology stack based on your project requirements."
            />
          </div>
        </div>
      </AnimatedContent>
    </main>
  );
}