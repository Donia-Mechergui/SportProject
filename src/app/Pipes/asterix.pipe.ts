import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {

transform(ch: string): string {
    let result = '';
    let voy: string[] = ['a', 'e', 'i', 'o', 'u', 'y', 'A', 'E', 'I', 'O', 'U', 'Y'];
    
    for (let i = 0; i < ch.length; i++) {
        if (voy.includes(ch[i])) {
            result += '*'; // Replace vowel with '*'
        } else {
            result += ch[i]; // Keep the original character
        }
    }
    
    return result;
}
transform1(ch: string): string {
  let result = '';
  let voy: string[] = ['a', 'e', 'i', 'o', 'u', 'y', 'A', 'E', 'I', 'O', 'U', 'Y'];
  
  for (let i = 0; i < ch.length; i++) {
      if (voy.includes(ch[i])) {
          result += '*'; // Replace vowel with '*'
      } else {
          result += ch[i]; // Keep the original character
      }
  }
  
  return result;
}

}
