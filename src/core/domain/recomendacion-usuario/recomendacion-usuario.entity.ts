export class RecomendacionUsuario {
    id_RecomendacionUsuario: number; // Corregido para que coincida con la entidad
    usuarioId: number; // Refleja la relación con UsuarioEntity usando solo el ID
    recomendacionIds: number[]; // Refleja las recomendaciones relacionadas usando solo los IDs
  }
  