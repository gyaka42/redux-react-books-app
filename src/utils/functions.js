export const upperFirstLetter = (sample = "") => {
  /* parametre olarak gelen cümleyi boşluk ayracına göre
          kelimelere ayır
      */
  let words = sample.split(" ");
  let newWords = [];
  /* tek tek kelimeler gezilir */
  for (let i = 0; i < words.length; i++) {
    /* her bir kelimeyi karakter karakter dolaşalım */
    let tempWord = "";
    for (let j = 0; j < words[i].length; j++) {
      /* her bir kelimenin ilk harfini yakalayarak büyük harfe çeviriyoruz */
      if (j === 0) {
        tempWord += words[i][j].toLocaleUpperCase("tr-TR");
      } else {
        /* her bir kelimenin ilk harf dışındaki diğer harflerini
                      yakalayarak küçük harfe çeviriyoruz
                  */
        tempWord += words[i][j].toLocaleLowerCase("tr-TR");
      }
    }
    newWords.push(tempWord);
  }
  //console.log(newWords);
  /* en son baş harfi büyük, diğer harfleri küçültülmüş
          yeni kelimeler dizisinin elemanları arasına boşluk ekleyerek
          yeni bir cümle oluşturup onu return ediyoruz
      */
  const newSample = newWords.join(" ");

  return newSample;
};

/* Bu da Kisa TEK Satirlik olan UpperFirstLetter */
export const upperFirstLetter2 = (sample = "") => {
  return sample
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toLocaleUpperCase("nl-NL") +
        word.slice(1).toLocaleLowerCase("nl-NL")
    )
    .join(" ");
};
