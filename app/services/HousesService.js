import { AppState } from "../AppState.js"
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";

class HousesService {
  constructor() {
    console.log('House Service Loaded');
  }

  async getHouses() {
    const response = await api.get('api/houses')
    // console.log('[SERVICE], response data:', response.data);
    AppState.houses = response.data.map(house => new House(house))
    // console.log('[SERVICE], houses in AppState', AppState.houses);
  }

  async createHouse(houseData) {
    console.log(houseData);
    // 'https://ih1.redbubble.net/image.1353244660.6354/st,small,507x507-pad,600x600,f8f8f8.jpg'

    const response = await api.post('api/houses', houseData)
    // console.log('[SERVICE], createHouse, response:', response.data);
    const house = new House(response.data)
    AppState.houses.push(house)
    AppState.emit('houses')
  }

  async removeHouse(houseId) {
    const response = await api.delete(`api/houses/${houseId}`)
    // console.log('[SERVICE], removeHouse, response:', response.data);
    const houseIndex = AppState.houses.findIndex(house => house.id == houseId)
    if (houseIndex == -1) {
      return
    }
    AppState.houses.splice(houseIndex, 1)
    AppState.emit('houses')
  }

}

export const housesService = new HousesService()