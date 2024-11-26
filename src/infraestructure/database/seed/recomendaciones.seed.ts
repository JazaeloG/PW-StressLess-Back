import { DataSource } from 'typeorm';
import { RecomendacionEntity } from '../recomendacion.entity.schema';

export const seedRecomendaciones = async (dataSource: DataSource) => {
  const recomendacionRepository = dataSource.getRepository(RecomendacionEntity);

  const recomendaciones = [
    {
      recomendacion_Titulo: 'Ejercicio físico regular',
      recomendacion_Descripcion: 'Incorpora actividades físicas como caminar, trotar o yoga.',
      recomendacion_Detalles: 'Realiza al menos 30 minutos de ejercicio 3 veces por semana.',
      recomendacion_NivelRecomendacion: 5,
    },
    {
      recomendacion_Titulo: 'Meditación diaria',
      recomendacion_Descripcion: 'Practica mindfulness o meditación guiada.',
      recomendacion_Detalles: 'Dedica de 10 a 15 minutos diarios a la meditación.',
      recomendacion_NivelRecomendacion: 10,
    },
    {
      recomendacion_Titulo: 'Buena higiene del sueño',
      recomendacion_Descripcion: 'Asegúrate de dormir lo suficiente y establecer una rutina de sueño.',
      recomendacion_Detalles: 'Evita el uso de dispositivos electrónicos antes de dormir.',
      recomendacion_NivelRecomendacion: 15,
    },
    {
      recomendacion_Titulo: 'Conexiones sociales',
      recomendacion_Descripcion: 'Dedica tiempo a interactuar con amigos y familiares.',
      recomendacion_Detalles: 'Participa en actividades sociales o reuniones semanales.',
      recomendacion_NivelRecomendacion: 20,
    },
    {
      recomendacion_Titulo: 'Tiempo en la naturaleza',
      recomendacion_Descripcion: 'Pasa tiempo al aire libre, en parques o espacios verdes.',
      recomendacion_Detalles: 'Camina en el parque durante 20 minutos al menos 2 veces por semana.',
      recomendacion_NivelRecomendacion: 25,
    },
  ];

  for (const recomendacion of recomendaciones) {
    const exists = await recomendacionRepository.findOneBy({
      recomendacion_Titulo: recomendacion.recomendacion_Titulo,
    });

    if (!exists) {
      const nuevaRecomendacion = recomendacionRepository.create(recomendacion);
      await recomendacionRepository.save(nuevaRecomendacion);
      console.log(`Recomendación "${recomendacion.recomendacion_Titulo}" creada.`);
    } else {
      console.log(`Recomendación "${recomendacion.recomendacion_Titulo}" ya existe.`);
    }
  }
};