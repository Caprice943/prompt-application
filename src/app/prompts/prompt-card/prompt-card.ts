import { Component, input } from '@angular/core'
import { Prompt } from '../prompt.model';
import { Button } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Card } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prompt-card',
  imports: [Button, TagModule, Card, RouterLink],
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.scss',
})
export class PromptCard {

  prompt = input.required<Prompt>();

  copyToClipboard() {
    void navigator.clipboard.writeText(this.prompt().content)
  }

}
