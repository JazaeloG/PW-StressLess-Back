import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

@Component({
  standalone: true,
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule] // Agrega FormsModule aquí
})
export class PreguntasComponent {
  questions = [
    { id: 1, text: '¿Con qué frecuencia has sentido que no puedes manejar todas las cosas que tienes que hacer?', options: ['Nunca', 'Ocasionalmente', 'Generalmente', 'Siempre'] },
    { id: 2, text: '¿Con qué frecuencia has sentido que tienes demasiado que hacer?', options: ['Rara vez', 'Algunas veces', 'A menudo', 'Siempre'] },
    { id: 3, text: '¿Con qué frecuencia has sentido que no puedes lidiar con todos los problemas y preocupaciones que tienes en tu vida?', options: ['Nunca', 'A veces', 'Frecuentemente', 'Constantemente'] },
    { id: 4, text: 'Pregunta 4', options: ['Nunca', 'Algunas veces', 'A menudo', 'Siempre'] },
    { id: 5, text: 'Pregunta 5', options: ['Nunca', 'Ocasionalmente', 'Generalmente', 'Siempre'] },
    { id: 6, text: 'Pregunta 6', options: ['Rara vez', 'A veces', 'Frecuentemente', 'Siempre'] },
    { id: 7, text: 'Pregunta 7', options: ['Nunca', 'Algunas veces', 'A menudo', 'Siempre'] },
    { id: 8, text: 'Pregunta 8', options: ['Nunca', 'Ocasionalmente', 'Generalmente', 'Siempre'] },
    { id: 9, text: 'Pregunta 9', options: ['Rara vez', 'Algunas veces', 'A menudo', 'Siempre'] },
    { id: 10, text: 'Pregunta 10', options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'] },
  ];

  answers: { [key: number]: string } = {};

  constructor(private router: Router) {}

  goToResults() {
    this.router.navigate(['/resultados']);
  }
}
