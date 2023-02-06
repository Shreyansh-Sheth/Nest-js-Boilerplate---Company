import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getOtp(letters: number) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < letters; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateStrongPassword() {
    const upperCase = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnpqrstuvwxyz';
    const numbers = '0123456789';

    //generate random password
    let password = '';
    for (let i = 0; i < 3; i++) {
      password += upperCase.charAt(
        Math.floor(Math.random() * upperCase.length),
      );
      password += lowerCase.charAt(
        Math.floor(Math.random() * lowerCase.length),
      );
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return password;
  }
}
