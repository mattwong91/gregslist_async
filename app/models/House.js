import { AppState } from "../AppState.js"

export class House {
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  get houseCardTemplate() {
    return `
    <div class="col-12 mb-3">
      <div class="house-card">
        <img
          src="${this.imgUrl}"
          alt="House" class="house-img">

        <div class="p-3">
          <h2 class="mb-3">$${this.price}</h2>
          <p>${this.bedrooms} Bedrooms</p>
          <p>${this.bathrooms} Bathrooms</p>
          <p>${this.levels} Levels</p>
          <p>Year Built: ${this.year}</p>
          <p>${this.description}</p>
          <div class="d-flex align-items-center mt-4">
            <img
              src="${this.creator.picture}"
              alt="${this.creator.name}" class="img-fluid rounded-circle house-creator">
            <h4 class="ms-2">${this.creator.name}</h4>
          </div>
        </div>

        <div class="text-end py-3">
          ${this.checkDeleteButton}
        </div>
      </div>

    </div>
    `
  }

  get checkDeleteButton() {
    if (AppState.account?.id == this.creatorId) {
      return `
      <button onclick="app.HousesController.removeHouse('${this.id}')" class="btn btn-danger">Delete</button>`
    }
    return ''
  }


  static get houseFormTemplate() {
    return `
    <div class="col-6">
      <form onsubmit="app.HousesController.createHouse(event)">
        <input type="number" id="bedrooms" name="bedrooms" placeholder="# of bedrooms" required class="mb-2">
        <input type="number" id="bathrooms" name="bathrooms" placeholder="# of bathrooms" required class="mb-2">
        <input type="number" id="levels" name="levels" placeholder="# of floors" required class="mb-2">
        <input type="url" id="imgUrl" name="imgUrl" placeholder="URL of image" maxlength="500" class="mb-2">
        <input type="number" id="year" name="year" placeholder="Year built" min="1500" max="2023" required
          class="mb-2">
        <input type="number" id="price" name="price" placeholder="Price in ($)" required class="mb-2">
        <textarea name="description" id="description" rows="10" maxlength="5000" class="w-100"></textarea>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
    `
  }
}

const data = {
  "_id": "645d60f381faf24223ae886b",
  "bedrooms": 3,
  "bathrooms": 2,
  "levels": 2,
  "imgUrl": "https://floorcentral.com/wp-content/uploads/2014/07/sick-house-syndrome.jpg",
  "year": 2003,
  "price": 230000,
  "description": "Super sick house",
  "creatorId": "63f7d6202d1cf882287f12e2",
  "createdAt": "2023-05-11T21:41:07.979Z",
  "updatedAt": "2023-05-11T21:41:07.979Z",
  "__v": 0,
  "creator": {
    "_id": "63f7d6202d1cf882287f12e2",
    "name": "Charles Francis Xavier",
    "picture": "https://www.looper.com/img/gallery/professor-xs-entire-backstory-explained/intro-1587748942.jpg",
    "id": "63f7d6202d1cf882287f12e2"
  },
  "id": "645d60f381faf24223ae886b"
}