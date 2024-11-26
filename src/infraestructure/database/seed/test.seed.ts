import { DataSource } from 'typeorm';
import { TestEntity } from 'src/infraestructure/database/test.entity.schema';
import { PreguntaEntity } from 'src/infraestructure/database/pregunta.entity.schema';

export const seedTests = async (dataSource: DataSource) => {
  // Preguntas relacionadas al estrés académico
  const preguntasData = [
    { pregunta_Texto: '¿Con qué frecuencia sientes que el tiempo no te alcanza para cumplir con tus responsabilidades académicas?' },
    { pregunta_Texto: '¿Te resulta difícil concentrarte durante las clases o al estudiar?' },
    { pregunta_Texto: '¿Sientes cansancio o agotamiento debido a tus actividades académicas?' },
    { pregunta_Texto: '¿Tienes dificultad para dormir por preocuparte por tareas o exámenes?' },
    { pregunta_Texto: '¿Sientes tensión física (dolor de cabeza, espalda, etc.) debido a la carga académica?' },
    { pregunta_Texto: '¿Pierdes interés en actividades que antes disfrutabas debido a tus estudios?' },
    { pregunta_Texto: '¿Sientes ansiedad antes de exámenes importantes?' },
    { pregunta_Texto: '¿Te encuentras posponiendo tareas importantes hasta el último momento?' },
    { pregunta_Texto: '¿Te has sentido abrumado/a por la cantidad de tareas y proyectos académicos?' },
    { pregunta_Texto: '¿Sientes que el entorno académico es competitivo de manera negativa?' },
    { pregunta_Texto: '¿Experimentas cambios en tu apetito relacionados con el estrés por tus estudios?' },
    { pregunta_Texto: '¿Tienes dificultad para balancear tus estudios con tu vida personal?' },
    { pregunta_Texto: '¿Sientes que no tienes apoyo suficiente de profesores o compañeros?' },
    { pregunta_Texto: '¿Evitas hablar de tus responsabilidades académicas por la ansiedad que te generan?' },
    { pregunta_Texto: '¿Sientes que tu rendimiento académico no refleja el esfuerzo que realizas?' },
  ];

  // Crear preguntas
  const preguntaRepository = dataSource.getRepository(PreguntaEntity);
  const preguntas = preguntasData.map((pregunta) => preguntaRepository.create(pregunta));
  await preguntaRepository.save(preguntas);

  // Crear el test
  const testRepository = dataSource.getRepository(TestEntity);
  const test = testRepository.create({
    test_Nombre: 'Test de Estrés Académico',
    test_Descripcion: 'Este test evalúa los niveles de estrés académico de los estudiantes.',
    preguntas,
  });

  // Guardar el test con las preguntas relacionadas
  await testRepository.save(test);
  console.log('Test de Estrés Académico creado exitosamente con sus preguntas.');
};
