import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HTTP) {}

  mcxData() {
    return this.http.get(
      'https://api.datakick.in/REST/softRatesJSON.php?API_Key=12bb3d7a3db3ce6acd79ac08ad01a84b',
      {},
      {}
    );
  }

  nseData() {
    return this.http.get(
      'https://api.datakick.in/NFO/softRESTNFO.php?API_Key=355bc98e476f71eff2bc2d92ff95c037',
      {},
      {}
    );
  }

  comexData() {
    return this.http.get(
      'https://api.datakick.in/REST/softComex.php?API_Key=12bb3d7a3db3ce6acd79ac08ad01a84b',
      {},
      {}
    );
  }
}
