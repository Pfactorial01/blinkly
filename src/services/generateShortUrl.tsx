function biject(n: number) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const base = alphabet.length;
  
    let shortcode = "";
    while (n > 0) {
      shortcode += alphabet[n % base];
      n = Math.floor(n / base);
    }
  
    return shortcode.split("").reverse().join("");
  }

export const generateShortUrl = () => {
    const id = Math.random().toString(36).substring(7);
    const shortcode = biject(parseInt(id, 36));
    return shortcode;
  }