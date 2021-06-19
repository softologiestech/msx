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
      'https://api.datakick.in/NSE/ohlc?API_Key=f4f5f600e9f5610&m=FEDERALBNK/BAJAJELEC/ESSARSHPNG',
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
