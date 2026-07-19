module.exports = ($) => {
  const books = [];
  $(".product_pod").each((i, elem) => {
    books.push({
      title: $(elem).find("h3 a").attr("title"),
      price: $(elem).find(".price_color").text(),
      availability: $(elem).find(".availability").text(),
      rating: $(elem)
        .find(".star-rating")
        .attr("class")
        .replace("star-rating ", ""),
    });
  });
  return [...books];
};
