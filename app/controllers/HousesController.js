import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawHouses() {
  let content = ''
  AppState.houses.forEach(house => content += house.houseCardTemplate)
  setHTML('houseCards', content)
}

function _drawHouseForm() {
  if (!AppState.account) {
    return
  }
  setHTML('houseForm', House.houseFormTemplate)
}

export class HousesController {
  constructor() {
    console.log('House Controller loaded!');
    this.getHouses()

    AppState.on('houses', _drawHouses)
    AppState.on('account', _drawHouses)
    AppState.on('account', _drawHouseForm)
  }

  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      Pop.error(error)
      console.log(error);
    }
  }

  async createHouse(event) {
    try {
      event.preventDefault()
      const form = event.target
      const houseData = getFormData(form)
      await housesService.createHouse(houseData)
      Pop.success('Added a house!')
      form.reset()
    } catch (error) {
      Pop.error(error)
      console.log(error);
    }
  }

  async removeHouse(houseId) {
    try {
      const confirmDelete = await Pop.confirm('Are you sure you want to delete this house?')
      if (!confirmDelete) {
        return
      }

      await housesService.removeHouse(houseId)
      Pop.toast('House was deleted', 'info')
    } catch (error) {
      Pop.error(error)
      console.log(error);
    }
  }
}