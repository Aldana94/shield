'use client';

import React, { useState } from 'react';
import { ChevronDown, Clock, Users, Key, DollarSign } from 'lucide-react';

type ShieldSection = {
  title: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
};

export function Shield() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections: ShieldSection[] = [
    {
      title: 'Turnos',
      icon: Clock,
      content: (
        <div className="p-4">
          {/* Contenido de Turnos */}
          <h3 className="font-medium mb-4">Gestión de Turnos</h3>
          {/* Añade aquí el contenido específico */}
        </div>
      )
    },
    {
      title: 'Clientes recibidos',
      icon: Users,
      content: (
        <div className="p-4">
          {/* Contenido de Clientes recibidos */}
          <h3 className="font-medium mb-4">Registro de Clientes</h3>
          {/* Añade aquí el contenido específico */}
        </div>
      )
    },
    {
      title: 'Accesos',
      icon: Key,
      content: (
        <div className="p-4">
          {/* Contenido de Accesos */}
          <h3 className="font-medium mb-4">Control de Accesos</h3>
          {/* Añade aquí el contenido específico */}
        </div>
      )
    },
    {
      title: 'Recargos',
      icon: DollarSign,
      content: (
        <div className="p-4">
          {/* Contenido de Recargos */}
          <h3 className="font-medium mb-4">Gestión de Recargos</h3>
          {/* Añade aquí el contenido específico */}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-xl shadow-sm">
          <button
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedSection(
              expandedSection === section.title ? null : section.title
            )}
          >
            <div className="flex items-center space-x-3">
              <section.icon className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{section.title}</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedSection === section.title ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          {expandedSection === section.title && (
            <div className="border-t">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}