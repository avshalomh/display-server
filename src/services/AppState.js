import { observable, computed, autorun } from 'mobx';

class AppState {
  @observable html = 'Hello';

  constructor() {

  }

}
var state = new AppState();
export default state;
