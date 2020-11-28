class Product {
  constructor(id, ownerId, createDate, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.createDate = createDate;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export default Product;
