import React from 'react';
import { Bot, Brain, Code2, Zap, MessageSquareText, GitBranch } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Assistance',
    description: 'Get intelligent responses to your programming queries using advanced AI models.',
    icon: Brain,
  },
  {
    name: 'Real-time Collaboration',
    description: 'Work together with other developers to solve complex problems efficiently.',
    icon: MessageSquareText,
  },
  {
    name: 'Smart Code Analysis',
    description: 'Automatic code review and optimization suggestions for better performance.',
    icon: Code2,
  },
  {
    name: 'Multiple Tool Integration',
    description: 'Seamlessly integrate with popular development tools and frameworks.',
    icon: GitBranch,
  },
  {
    name: 'Instant Solutions',
    description: 'Quick answers to common programming challenges and debugging issues.',
    icon: Zap,
  },
  {
    name: 'Interactive Learning',
    description: 'Learn from personalized suggestions and improve your coding skills.',
    icon: Bot,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to accelerate development
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform combines powerful tools and AI to help you write better code faster.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}