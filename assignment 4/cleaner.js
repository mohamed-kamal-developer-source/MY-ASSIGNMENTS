module.exports = (books) => {
  books.forEach((element) => {
    const numbersMap = {
      One: 1,
      Two: 2,
      Three: 3,
      Four: 4,
      Five: 5,
    };

    element.price = element.price.replace("£", "");

    element.availability = element.availability.includes("In stock")
      ? true
      : false;

    element.rating = numbersMap[element.rating];
  });

  return books;
};
