import type { Project } from './project.type';

export const projects: Project[] = [
  {
    id: 'node-app',
    title: '"Узел" - приложение по контролю наличия оборудования',
    description:
      'Написано на C# c использованием Entity Framework и базой данных SQLite',
    seoDescription:
      'Приложение «Узел» разработчика Игоря: C#, Entity Framework и база данных SQLite — решение для контроля оборудования.',
    tech: ['C#', 'Entity Framework', 'SQLite', 'Windows Forms', 'Visual Studio 2022'],
    github: 'https://github.com/ingwar888/NODE_app_v.1.0',
    screenshots: [
      '/images/projects/node1.png',
      '/images/projects/node2.png',
      '/images/projects/node3.png',
    ],
  },
  {
    id: 'victorina-game',
    title: '"Викторина" - игра - приложение',
    description:
      'Моё первое консольное приложение, написанное на C++ с использованием различных инструментов (библиотек (Windows.h), функций, условных операторов и др.)',
    seoDescription:
      'Викторина — консольное приложение на C++: игра-викторина в перечне проектной работы разработчика Игоря.',
    tech: ['С++', 'Visual Studio 2022'],
    github: 'https://github.com/ingwar888/Victorina-Game',
    screenshots: [
      '/images/projects/victorina1.png',
      '/images/projects/victorina2.png',
      '/images/projects/victorina3.png',
    ],
  },
  {
    id: 'text-editor',
    title: 'Текстовый редактор',
    description:
      'Прикладное приложение для удобной работы с текстом, написанное на C# и использующее Windows Forms',
    seoDescription:
      'Текстовый редактор — прикладное приложение на C# и Windows Forms для работы с текстом и файлами.',
    tech: ['C#', 'Windows Forms', 'Visual Studio 2022'],
    github: 'https://github.com/ingwar888/Text-editor-v1',
    screenshots: [
      '/images/projects/editor1.png',
      '/images/projects/editor2.png',
      '/images/projects/editor3.png',
    ],
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((p) => p.id === slug);
}
