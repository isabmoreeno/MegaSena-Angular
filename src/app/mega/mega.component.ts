import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-mega', 
  standalone: false,
  templateUrl: './mega.component.html', 
  styleUrls: ['./mega.component.css'] 
})


export class MegaComponent {
  title = 'MegaSena-Angular'; 
  sorteio: number[] = []; 
  aposta = ''; 
  msg = ''; 
  img = 'img/mega-logo.png'; 
  mostrarSorteio = false; 

  
  gerarNumerosSorteados() {
    let numeros = new Set<number>();
    while (numeros.size < 6) {
      numeros.add(Math.floor(Math.random() * 60) + 1);
    }
    this.sorteio = Array.from(numeros).sort((a, b) => a - b);
  }

  verificarAposta() {
    if (!this.aposta.trim()) {
      this.msg = 'Por favor, insira seus números antes de verificar.';
      return;
    }

    const aposta = this.aposta.split(',')
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num) && num >= 1 && num <= 60);

    if (aposta.length < 6 || aposta.length > 10) {
      this.msg = 'A aposta deve conter entre 6 e 10 números válidos!';
      return;
    }

    this.gerarNumerosSorteados();
    this.mostrarSorteio = true;

    const acertos = aposta.filter(num => this.sorteio.includes(num)).length;

    this.msg = acertos >= 4
      ? `Parabéns! Você acertou ${acertos} números!`
      : `Você acertou ${acertos} números. Tente novamente!`;
  }
}